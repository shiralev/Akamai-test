import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PREFIX, IApiRespons, IPokemon } from '../models';

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

  public getPokemonById(id: string): Observable<IPokemon> {
    return this.http.get(`${API_PREFIX}/pokemon/${id}`) as Observable<IPokemon>;
  }
}
