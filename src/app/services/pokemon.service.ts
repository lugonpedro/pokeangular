import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

interface GetPokemonsResp {
  count: number;
  next: null | string;
  previous: null | string;
  results: {
    name: string;
    url: string;
  }[];
}

export interface Pokemon {
  id: number;
  name: string;
  url: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly _httpClient = inject(HttpClient);
  private readonly api = 'https://pokeapi.co/api/v2/pokemon';

  getPokemons(limit = 20, offset = 0): Observable<Pokemon[]> {
    return this._httpClient
      .get<GetPokemonsResp>(`${this.api}?limit=${limit}&offset=${offset}`)
      .pipe(
        map((res) =>
          res.results.map((pokemon) => {
            const urlArr = pokemon.url.split('/').filter((str) => str !== '');
            const id = urlArr[urlArr.length - 1];
            const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
            return { id: +id, name: pokemon.name, url: pokemon.url, image };
          })
        )
      );
  }
}
