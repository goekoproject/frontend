import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable, computed, effect, inject, signal } from '@angular/core'
import { toObservable } from '@angular/core/rxjs-interop'
import { BehaviorSubject, Observable, Subject, of, shareReplay, switchMap } from 'rxjs'
import { UserFactory } from './user.factory'

import { ActivatedRoute, Router } from '@angular/router'
import { CacheProperty } from '@goeko/coretools'
import { Picture } from '../model/pictures.interface'
import { SessionStorageService } from '../session-storage.service'
import { CleantechsUser, ROLES, SmeUser, UserType } from './public-api'
import { UserData } from './user-data.interface'
import { BankUser } from './user-type/bank-user.model'
export const SS_COMPANY_DETAIL = 'SS_COMPANY'
export const SS_LOAD_USER = 'SS_LOAD_USER'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  sessionStorage = inject(SessionStorageService)
  private _http = inject(HttpClient)
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  public userAuthData = signal<any>({})

  @CacheProperty('_rawUser')
  private _rawUser!: SmeUser | CleantechsUser | BankUser
  public userProfile = signal<SmeUser | CleantechsUser | BankUser>(this._rawUser)

  public fechAuthUser = new Subject()
  private actorsEndpoint = computed(() => this.userAuthData()['userType'] + 's')
  public externalId = computed(() => this.userAuthData()['externalId'])
  public userType = computed(() => this.userAuthData()['userType'])
  public userRoles = computed(() => this.userAuthData()['roles'] || [ROLES.PUBLIC])
  public username = computed(() => this.userAuthData()['email'])

  public userType$ = toObservable<UserType>(this.userAuthData()['userType'])

  public completeLoadUser = new BehaviorSubject<boolean>(false)

  get isLoadUser() {
    return this.sessionStorage.getItem(SS_LOAD_USER)
  }
  public setUserData(user: any) {
    this.userAuthData.set(user)
  }
  constructor() {
    effect(() => {
      if (this.userAuthData().sub) {
        this._getDataProfile()
      }
    })
  }

  private _getDataProfile() {
    this._getByIdExternal()
      .pipe(
        switchMap((dataAuth0) => {
          if (dataAuth0) {
            return this.getById(dataAuth0?.id)
          }
          return of(null)
        }),
        shareReplay(1),
      )
      .subscribe((data) => {
        if (data) {
          this.propagateDataUser(data)
          if (!this.isLoadUser) {
            this._redirectDashboard()
          }
        } else {
          this.userProfile.set({} as SmeUser | CleantechsUser | BankUser)
          this._rawUser = {} as SmeUser | CleantechsUser | BankUser
          this._redirectProfile()
        }
      })
  }
  private _getByIdExternal(): Observable<UserData> {
    const _id = this.externalId()
    const params = new HttpParams().set('id', _id)
    return this._http.get<UserData>(`/v1/actor/${this.actorsEndpoint()}/external`, {
      params,
    })
  }

  private _redirectDashboard() {
    this.sessionStorage.setItem(SS_LOAD_USER, true)
    this._router.navigate([`platform/dashboard/${this.userType()}/${this.userProfile().id}`], { relativeTo: this._route })
  }
  private _redirectProfile() {
    this._router.navigate([`platformprofile/${this.externalId()}`], { relativeTo: this._route.parent })
  }

  getById(id: string): Observable<UserData> {
    return this._http.get<UserData>(`/v1/actor/${this.actorsEndpoint()}/` + id)
  }
  fetchUser() {
    this.getById(this.userProfile().id).subscribe((data) => this.propagateDataUser(data))
  }
  createUserProfile(body: any) {
    return this._http.post<SmeUser | CleantechsUser | BankUser>(`/v1/actor/${this.actorsEndpoint()}`, body)
  }

  updateUserProfile(id: string, body: any) {
    return this._http.put<SmeUser | CleantechsUser | BankUser>(`/v1/actor/${this.actorsEndpoint()}/${id}`, body)
  }

  uploadImgProfile(id: string, files: File[]): Observable<Picture[] | null> {
    if (files) {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append('file', file)
      })
      return this._http.post<Picture[]>(`/v1/actor/${this.actorsEndpoint()}/${id}/logo`, formData)
    }
    return of(null)
  }

  private propagateDataUser(data: UserData) {
    const user = UserFactory.createUserProfileBuilder(this.userAuthData()['userType']).init(data).build()
    this._rawUser = user

    this.userProfile.set(this._rawUser)
    /** @deprecated */
    this.completeLoadUser.next(true)
    this.completeLoadUser.complete()
  }
}
