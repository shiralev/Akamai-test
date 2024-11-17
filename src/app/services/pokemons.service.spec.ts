import { TestBed } from '@angular/core/testing';
import { PokemonsService } from './pokemons.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { API_PREFIX, IApiRespons, IPokemon } from '../models';
import { provideHttpClient } from '@angular/common/http';

describe('PokemonsService', () => {
  let service: PokemonsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PokemonsService,
        provideHttpClient(),
        provideHttpClientTesting() 
      ]
    });
    service = TestBed.inject(PokemonsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch pokemons with given offset and limit', () => {
    const mockResponse: IApiRespons = {
      results: [
        { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/1/', id: '1' },
        { name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/2/', id: '2' }
      ]
    } as IApiRespons;
  
    const offset = 0;
    const limit = 2;
  
    service.getPokemons(offset, limit).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne(`${API_PREFIX}/pokemon?limit=${limit}&offset=${offset}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); 
  });

  it('should fetch a single pokemon by ID', () => {
    const mockPokemon: IPokemon = {
      id: '1',
      name: 'Pikachu',
      url: '',
      height: 0.4,
      weight: 6
    };

    const pokemonId = '1';

    service.getPokemonById(pokemonId).subscribe((response) => {
      expect(response).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne(`${API_PREFIX}/pokemon/${pokemonId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);
  });
});
