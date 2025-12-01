import { Component, inject } from '@angular/core';
import {
  GetPokemonsRequest,
  PokemonService,
} from '../../services/pokemon.service';
import { catchError, of, tap } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly _pokemonService = inject(PokemonService);
  loading = false;
  error = '';
  offset = 0;
  currentPage = 0;
  lastPage = 0;

  request: GetPokemonsRequest = {
    count: 0,
    next: null,
    previous: null,
    pokemons: [],
  };

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.loading = true;
    this.error = '';
    this._pokemonService
      .getPokemons(this.offset)
      .pipe(
        tap(() => {}),
        catchError(() => {
          this.error = 'Erro ao carregar pokemons';
          this.loading = false;
          return of({
            count: 0,
            next: null,
            previous: null,
            pokemons: [],
          } as GetPokemonsRequest);
        })
      )
      .subscribe((data) => {
        this.request = data;
        this.currentPage = Math.max(1, Math.floor(this.offset / 20) + 1);
        this.lastPage = Math.ceil(this.request.count / 20);
        this.loading = false;
      });
  }

  prevPage(): void {
    this.offset -= 20;
    this.loadPokemons();
  }

  nextPage(): void {
    this.offset += 20;
    this.loadPokemons();
  }
}
