import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ECOSOLUTIONS_CONFIGURATION } from './ecosolutions.module';
import { EcosolutionsOptions } from './ecosolutions-options';
import { NewEcosolutions } from './new-ecosolution.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EcosolutionsService {
  constructor(
    private _http: HttpClient,

    @Inject(ECOSOLUTIONS_CONFIGURATION)
    public configuration: EcosolutionsOptions
  ) {}

  getAll() {
    return this._http.get(`/v1/ecosolutions`);
  }

  deleteEcosolution(id: string) {
    return this._http.delete(`/v1/ecosolutions/${id}`);
  }

  updateEcosolution(id: string, body: NewEcosolutions) {
    return this._http.put(`/v1/ecosolutions/${id}`, body);
  }

  uploadImage(idEcosolution: string, file: any) {
    const formData = new FormData();
    formData.append('file', file);
    return this._http.post(`/v1/ecosolutions/${idEcosolution}/picture`,formData);
  }

  getEcosolutionById(id: string): Observable<NewEcosolutions> {
    return this._http.get<NewEcosolutions>(`/v1/ecosolutions/${id}`);
  }

  getEcosolutionsByCleantechId(id: string) {
    return this._http.get<NewEcosolutions[]>(
      `/v1/ecosolutions/cleantech/${id}`
    );
  }

  createEcosolutions(body: NewEcosolutions): Observable<any> {
    return this._http.post<Observable<any>>(`/v1/ecosolutions`, body);
  }
}
