import { Component, inject, signal } from '@angular/core';
import { Pokemon, PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly _pokemonService = inject(PokemonService)
  pokemons: Pokemon[] = [];
  loading = false;
  error = '';
  limit = 20;
  offset = 0;

  ngOnInit(): void {
    this.loadPokemons()
  }

  loadPokemons(): void {
    this.loading = (true);
    this.error = ('');
    this._pokemonService
      .getPokemons(this.limit, this.offset)
      .pipe(
        tap(() => {}),
        catchError(() => {
          this.error = ('Erro ao carregar pokemons');
          this.loading = (false);
          return of([] as Pokemon[]);
        })
      )
      .subscribe((data) => {
        this.pokemons = (data);
        this.loading = (false);
      });
  }
}
