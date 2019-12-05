import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, throwError, of } from 'rxjs';
import { Http, URLSearchParams }  from "@angular/http";
//import 'rxjs/Rx';
import { map, take, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private youtubeUrl:string = "https://www.googleapis.com/youtube/v3";
  private apikey:string = "AIzaSyBdtLdVgQv5VV0k7MWA4MAHHLX5gWFvVrI";
  private playlist:string = "UUuaPTYj15JSkETGnEseaFFg";  

  private nextPageToken:string = "";

  params = new URLSearchParams();

  videos:any;

  constructor(private firestore: AngularFirestore, private http:Http) { 

  }

  getAllCollections(){//traigo las colecciones de firebase de playlists
    return this.firestore.collection('PlayLists').valueChanges();
  }

  setParams(id){//seteo los parametros para la busqueda de playlist en youtube
    this.params.set( 'part', 'snippet' );
    this.params.set( 'maxResults', '10' );
    this.params.set( 'playlistId', id );
    this.params.set( 'key', this.apikey );

    if( this.nextPageToken ){
      this.params.set( 'pageToken', this.nextPageToken );
    }
  }

  /* async getResult(): Promise<MyCustomObject> {
    if (typeof this.result === 'undefined') 
    {
        // save result
        this.result = await this.service.call()
        .toPromise()
        .then(resp =>resp as MyCustomObject);//Do you own cast here

    }
    return this.result;
  } */

  getVideosAsync(id){    
    let url = `${ this.youtubeUrl }/playlistItems`;
      this.setParams(id);
      
      return this.http.get( url, { search: this.params } )
              .pipe(map( res =>{                  
                  let snippet;
                  for( let video of res.json().items ){
                  
                    snippet = video.snippet;
                    break
                    
                  }                
                  return snippet;
              
              },error=>{
                catchError(error=>(throwError(error)))
              })
      );    
    
    
    
  }

  getVideos(id){
    //console.log("YoutubeService "+id)
    let url = `${ this.youtubeUrl }/playlistItems`;
    //let params = new URLSearchParams();

    this.setParams(id);

    return this.http.get( url, { search: this.params } )
            .pipe(map( res =>{                                  
                this.nextPageToken = res.json().nextPageToken;

                let videos:any[]=[];
                for( let video of res.json().items ){
                  let snippet = video.snippet;
                  videos.push( snippet );
                }
                console.log(videos)
                return videos;
            
            },error=>{
              console.log(error)
            })
    );
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

  addNewPlaylist(){

  }

  deletePlayList(id){

  }

  updatePlayList(id){

  }
}
