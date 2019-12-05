import { Component } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { ActivatedRoute } from '@angular/router';
import { fromEvent } from 'rxjs';
import { map, debounceTime, tap } from 'rxjs/operators';

declare var $:any;

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent {
  id:String;
  videos:any[] = [];
  videoSel:any;

  totalVideos:number;
  numberOfShowed:number=10;
  public titulo:string;

  scroll:boolean;

  constructor(public _yts:YoutubeService, private ar:ActivatedRoute) {

    this.ar.params.subscribe(params=>{      
      this.id = params["id"];
      this._yts.getVideos(params["id"])
          .subscribe( (videos:any) =>{                              
                  this.videos = videos;
                  this.titulo = this.videos[0].channelTitle;
          });

      this._yts.getChannelData(this.id)
          .subscribe(channelData=>{            
            this.totalVideos =    channelData.totalResults;            
          })
    })

    fromEvent(window, "scroll").pipe(
      tap(() => {this.scroll = true,console.log(this.scroll);}),
      debounceTime(2000)
    ).subscribe(() => {
        this.scroll = false;
        console.log(this.scroll);
    });



  }

  scrollToTop(){
    window.scrollTo(0, 0);
  }
  

  cargarMas(){
    this._yts.getVideos(this.id)
        .subscribe( videos =>  {          
          this.videos.push.apply( this.videos, videos )
        });
        if (this.numberOfShowed + 10 > this.totalVideos){
          this.numberOfShowed = this.totalVideos
        }else{
          this.numberOfShowed = this.numberOfShowed + 10;
        }
  }

  verVideo( video:any ){
    this.videoSel = video;
    $('#myModal').modal();
  }
  cerrarModal(){
    this.videoSel = null;
    $('#myModal').modal('hide');
  }  
  
  
  
  
  

}
