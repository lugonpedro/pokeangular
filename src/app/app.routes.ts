import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pokemon/:id', component: PokemonDetailsComponent },
  { path: '**', component: PageNotFoundComponent }
];
