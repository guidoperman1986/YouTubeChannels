import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Http, URLSearchParams }  from "@angular/http";
//import 'rxjs/Rx';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private youtubeUrl:string = "https://www.googleapis.com/youtube/v3";
  private apikey:string = "AIzaSyBdtLdVgQv5VV0k7MWA4MAHHLX5gWFvVrI";
  private playlist:string = "UUuaPTYj15JSkETGnEseaFFg";

  private nextPageToken:string = "";

  constructor(private firestore: AngularFirestore, private http:Http) { 

  }

  getAllCollections(){
    return this.firestore.collection('PlayLists').valueChanges();
  }

  getVideos(id){

    let url = `${ this.youtubeUrl }/playlistItems`;
    let params = new URLSearchParams();

    params.set( 'part', 'snippet' );
    params.set( 'maxResults', '10' );
    params.set( 'playlistId', id );
    params.set( 'key', this.apikey );

    if( this.nextPageToken ){
      params.set( 'pageToken', this.nextPageToken );
    }


    return this.http.get( url, { search: params } )
            .pipe(map( res =>{                                  
                this.nextPageToken = res.json().nextPageToken;

                let videos:any[]=[];
                for( let video of res.json().items ){
                  let snippet = video.snippet;
                  videos.push( snippet );
                }

                return videos;
            
            },error=>{
              console.log(error)
            }));

  }

  getChannelData(id){
    let url = `${ this.youtubeUrl }/playlistItems`;
    let params = new URLSearchParams();

    params.set( 'part', 'snippet' );
    params.set( 'maxResults', '10' );
    params.set( 'playlistId', id );
    params.set( 'key', this.apikey );

    return this.http.get( url, { search: params } )
            .pipe(map( res =>{      
                return res.json().pageInfo;
            }));
  }

  getVideoThumnails(id){
    this.getVideos(id).subscribe(videos=>{
      let thumbnails:any[]=[];

      for(let i=0;i<videos.length;i++){
        thumbnails.push(videos[i].thumbnails.default);
      }
      console.log(thumbnails);
    })
  }
}
