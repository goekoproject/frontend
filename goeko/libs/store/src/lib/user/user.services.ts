import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, computed, effect, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { User } from "@auth0/auth0-angular";
import { BehaviorSubject, Observable, catchError, of, switchMap, throwError } from "rxjs";
import { UserFactory } from "./user.factory";

import { ROLES, UserModal, UserType } from "./public-api";
import { SmeBuilder } from "./user.builder";
export const SS_COMPANY_DETAIL = "SS_COMPANY";

@Injectable()
export class UserService {
  private _companyDetail = new BehaviorSubject<unknown | null>(null);
  public userAuthData = signal<User>({});
  public userProfile = signal<UserModal>(new SmeBuilder().empty());

  private actorsEndpoint = computed(() => this.userAuthData()["userType"] + "s");
  public externalId = computed(() => this.userAuthData()["externalId"]);
  public userType = computed(() => this.userAuthData()["userType"]);
  public userRoles = computed(() => this.userAuthData()["roles"] || [ROLES.PUBLIC]);

  public userType$ = toObservable<UserType>(this.userAuthData()["userType"]);

  constructor(public _http: HttpClient) {
    effect(() => {
      if (this.userAuthData().sub) {
        this._getDataProfile();
      }
    });
  }

  private _getDataProfile() {
    this._getByIdExternal()
      .pipe(
        switchMap((dataAuth0) => (dataAuth0 ? this.getById(dataAuth0?.id) : throwError(() => "User not data profile"))),
        catchError(() => of(null))
      )
      .subscribe((data) => {
        const user = UserFactory.createUserProfileBuilder(this.userAuthData()["userType"]).init(data).build();
        this.userProfile.set(user);
      });
  }
  private _getByIdExternal(): Observable<any> {
    const _id = this.externalId();
    const params = new HttpParams().set("id", _id);
    return this._http.get<any>(`/v1/actor/${this.actorsEndpoint()}/external`, {
      params,
    });
  }

  getById(id: string): Observable<any> {
    return this._http.get<any>(`/v1/actor/${this.actorsEndpoint()}/` + id);
  }
  createUserProfile(body: any) {
    return this._http.post<any>(`/v1/actor/${this.actorsEndpoint()}`, body);
  }

  updateUserProfile(id: any, body: any) {
    return this._http.put<any>(`/v1/actor/${this.actorsEndpoint()}/${id}`, body);
  }

  private _transformbBody(body: any) {
    return {
      ...body,
      country: body?.country?.code,
    };
  }
}
