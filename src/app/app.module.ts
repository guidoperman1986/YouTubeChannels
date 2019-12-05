import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


//components
import { HomeComponent } from './components/home/home.component';

//firebase
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';

//services
import { YoutubeService } from './services/youtube.service';

//routes
import { app_routing } from './app.routes';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { VideoYoutubePipe } from './pipes/video-youtube.pipe';
import { MuyLargoPipe } from './pipes/muy-largo.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlaylistComponent,
    VideoYoutubePipe,
    MuyLargoPipe
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpModule,
    app_routing
  ],
  providers: [YoutubeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
