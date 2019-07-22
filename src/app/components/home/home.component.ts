import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  playLists:any;
  thumnails:any[]=[];

  constructor(private ytservice:YoutubeService) { 
    this.ytservice.getAllCollections().subscribe((playLists:any)=>{
      console.log(playLists)
      this.playLists = playLists;

      //for (let i=0;i<playLists.length;i++){
      //  this.ytservice.getVideos(playLists[i].playList).subscribe(videos);
//
//}
        //this.ytservice.getVideoThumnails();
    });

    
  }

  ngOnInit() {
  }

}
