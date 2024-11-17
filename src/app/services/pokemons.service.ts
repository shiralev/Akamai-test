import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PREFIX, IApiRespons } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  public http = inject(HttpClient);

  constructor() { }

  public getPokemons(offset: number, limit: number): Observable<IApiRespons> {
    return this.http.get(`${API_PREFIX}/pokemon`, {
      params: {
        limit,
        offset
      }
    }) as Observable<IApiRespons>;
  }
}
