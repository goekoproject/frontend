import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { EcosolutionsOptions } from './ecosolutions-options';
import { ECOSOLUTIONS_CONFIGURATION } from './ecosolutions.module';
import { Ecosolutions } from './new-ecosolution.model';

@Injectable({
  providedIn: 'root',
})
export class EcosolutionsService {
  constructor(
    private _http: HttpClient,

    @Inject(ECOSOLUTIONS_CONFIGURATION)
    public configuration: EcosolutionsOptions,
  ) {}

  getAll() {
    return this._http.get(`/v1/ecosolutions`);
  }

  deleteEcosolution(id: string) {
    return this._http.delete(`/v1/ecosolutions/${id}`);
  }

  updateEcosolution(id: string, body: Ecosolutions) {
    return this._http.put(`/v1/ecosolutions/${id}`, body);
  }

  uploadImage(idEcosolution: string, files: File[]) {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('file', file);
    });
    return this._http
      .post(`/v1/ecosolutions/${idEcosolution}/picture`, formData)
      .pipe(
        catchError((error) => {
          console.error('Error uploading image', error);
          return of(null);
        }),
      );
  }

  getEcosolutionById(id: string): Observable<Ecosolutions> {
    return this._http.get<Ecosolutions>(`/v1/ecosolutions/${id}`);
  }

  getEcosolutionsByCleantechId(id: string) {
    return this._http.get<Ecosolutions[]>(`/v1/ecosolutions/cleantech/${id}`);
  }

  createEcosolutions(body: Ecosolutions): Observable<any> {
    return this._http.post<Observable<any>>(`/v1/ecosolutions`, body);
  }
}
