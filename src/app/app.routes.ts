import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MasteriesComponent} from "./masteries/masteries.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, //default route
  { path: 'home', component: HomeComponent },
  { path: 'player/:gameName/:tagLine', component: MasteriesComponent },
  { path: '**', component: HomeComponent }
];
