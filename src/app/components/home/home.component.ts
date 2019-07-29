import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  playLists:any;
  thumbnails:any[]=[];

  constructor(private ytservice:YoutubeService) { 
    this.ytservice.getAllCollections().subscribe((playLists:any)=>{      
      this.playLists = playLists;

      for(let i=0; i<= playLists.length-1;i++){        
        this.ytservice.getVideos(playLists[i].playList).subscribe((play:any)=>{          
          //console.log(play)
          this.thumbnails.push(play[0].thumbnails.high.url);
        })
      }
      
      
      //playLists.forEach(pl => {
      //  //console.log(pl.Titulo+" "+pl.playList)
      //  this.ytservice.getVideos(pl.playList).subscribe((play:any)=>{               
        //  //  console.log(play[0])
        //    this.thumbnails.push(play[0].thumbnails.high.url);
      //  })
      //});

      //console.log(this.thumbnails)      
    });    
  }

  ngOnInit() {
  }

}
