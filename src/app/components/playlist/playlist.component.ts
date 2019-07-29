import { Component } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { ActivatedRoute } from '@angular/router';

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

  totalVideos:string;
  numberOfShowed:number=10;


  constructor(public _yts:YoutubeService, private ar:ActivatedRoute) {

    this.ar.params.subscribe(params=>{      
      this.id = params["id"];
      this._yts.getVideos(params["id"])
          .subscribe( (videos:any) =>{                              
                  this.videos = videos;  
                  console.log(videos)                                                         
          });

      this._yts.getChannelData(this.id)
          .subscribe(channelData=>{            
            this.totalVideos =    channelData.totalResults;            
          })
    })



  }

  

  cargarMas(){
    this._yts.getVideos(this.id)
        .subscribe( videos =>  {          
          this.videos.push.apply( this.videos, videos )
        });
        this.numberOfShowed = this.numberOfShowed + 10;
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
