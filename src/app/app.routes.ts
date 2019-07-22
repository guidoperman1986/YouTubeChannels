import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlaylistComponent } from './components/playlist/playlist.component';

const app_routes: Routes = [
    { path: 'home',component:HomeComponent },
    { path: 'playlist/:id', component:PlaylistComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
]

export const app_routing = RouterModule.forRoot(app_routes, {useHash:false});