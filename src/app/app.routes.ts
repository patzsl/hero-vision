import { Routes } from '@angular/router';
import { CharacterListComponent } from './features/character-list/components/character-list/character-list.component';
import { PreLoaderComponent } from './features/character-list/components/pre-loader/pre-loader.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'characters', component: CharacterListComponent },
  { path: 'home', component: PreLoaderComponent },
];
