import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable, computed, inject, signal } from '@angular/core'
import { toObservable } from '@angular/core/rxjs-interop'
import { AuthService } from '@goeko/core'
import { BehaviorSubject, Observable, Subject, of, shareReplay, switchMap } from 'rxjs'
import { UserFactory } from './user.factory'

import { DOCUMENT } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import { CacheProperty } from '@goeko/coretools'
import { Picture } from '../model/pictures.interface'
import { SessionStorageService } from '../session-storage.service'
import { CleantechsUser, ROLES, SmeUser, UserType } from './public-api'
import { UserData } from './user-data.interface'
import { BankUser } from './user-type/bank-user.model'
export const SS_COMPANY_DETAIL = 'SS_COMPANY'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  sessionStorage = inject(SessionStorageService)
  private _http = inject(HttpClient)
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  private _authService = inject(AuthService)
  private _doc = inject(DOCUMENT)
  public auth0UserProfile = signal<any>({})

  @CacheProperty('_rawUser')
  private _rawUser!: SmeUser | CleantechsUser | BankUser
  public userProfile = signal<SmeUser | CleantechsUser | BankUser>(this._rawUser)

  public fechAuthUser = new Subject()
  private actorsEndpoint = computed(() => this.auth0UserProfile()['userType'] + 's')
  public externalId = computed(() => this.auth0UserProfile()['externalId'])
  public userType = computed(() => this.auth0UserProfile()['userType'])
  public userRoles = computed(() => this.auth0UserProfile()['roles'] || [ROLES.PUBLIC])
  public username = computed(() => this.auth0UserProfile()['email'])
  public isUserProfileLoaded = computed(() => this.externalId() === this._rawUser.externalId)
  public userType$ = toObservable<UserType>(this.auth0UserProfile()['userType'])
  public isEmailVerified = computed(() => this.auth0UserProfile().email_verified)
  public completeLoadUser = new BehaviorSubject<boolean>(false)

  getDataProfile() {
    return this._getByIdExternal().pipe(
      switchMap((dataAuth0) => {
        if (dataAuth0) {
          return this.getById(dataAuth0?.id)
        }
        return of(null)
      }),
      shareReplay(1),
    )
  }
  private _getByIdExternal(): Observable<UserData> {
    const _id = this.externalId()
    const params = new HttpParams().set('id', _id)
    return this._http.get<UserData>(`/v1/actor/${this.actorsEndpoint()}/external`, {
      params,
    })
  }

  checkEmailVerified() {
    if (!this.auth0UserProfile().email_verified) {
      const urlPageEmailVerify = `${this._doc.location.origin}/verify-email`
      this._authService.logout(urlPageEmailVerify)
    }
  }

  redirectDashboard() {
    setTimeout(() => {
      this._router.navigate([`platform/dashboard/${this.userType()}/${this.userProfile()?.id}`], { relativeTo: this._route })
    }, 500)
    return of(true)
  }
  redirectProfile() {
    this._router.navigate([`platform/profile/${this.externalId()}`], { relativeTo: this._route.parent })
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

  uploadImgProfileBank(id: string, files: File[]): Observable<Picture[] | null> {
    if (files) {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append('file', file)
      })
      return this._http.put<Picture[]>(`/v1/actor/${this.actorsEndpoint()}/${id}/logo`, formData)
    }
    return of(null)
  }

  propagateDataUser(data: UserData) {
    const user = UserFactory.createUserProfileBuilder(this.auth0UserProfile()['userType']).init(data).build()
    this._rawUser = user

    this.userProfile.set(this._rawUser)
    /** @deprecated */
    this.completeLoadUser.next(true)
    this.completeLoadUser.complete()
  }
}
