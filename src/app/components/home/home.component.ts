import { Component, OnInit, HostListener } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  playLists:any;
  thumbnails:any[]=[];
  offline:boolean=false;
  loading:boolean;

  constructor(private ytservice:YoutubeService) {
    /* console.log(this.offline);  */
    this.ytservice.getAllCollections().subscribe((playLists:any)=>{     
      this.playLists = playLists;
      console.log(playLists);

      if (this.playLists.length == 0){
        this.offline = true
        return;
      }else{
        this.offline = false
      }
      this.loading=true;
      for(let i=0; i<= playLists.length-1;i++){                
        this.ytservice.getVideosAsync(playLists[i].playList).subscribe(res=>{     
          if (res != undefined){
            this.thumbnails.push(res);
          }          
        },error=>console.log(error))        
      }
      setTimeout(()=>{
        this.loading=false;
      },3000)
    },error=>console.log(error));    
  }

  @HostListener('window:offline', [ '$event' ])
  onDisconect(event) {      // ...        
        this.offline=true;
        
  }
  @HostListener('window:offline', [ '$event' ])
  onConnect(event) {      // ...        
        this.offline=false;        
  }

  ngOnInit() {
  }

}
