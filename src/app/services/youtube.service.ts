import { Http, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class YoutubeService {

  private youtubeUrl: string = 'https://www.googleapis.com/youtube/v3';
  private apiKey: string = 'AIzaSyCRioThP2RmRznRfkWuoi1Sg3uOP6REmjM';
  private playList: string = 'PLB4FAC0FB45DFBE8F';
  private nexPageToken: string = 'CAoQAA';

  constructor(private http: Http) { }

  getVideos() {

    let url = `${this.youtubeUrl}/playlistItems`;

    let params = new URLSearchParams();

    params.set('part', 'snippet');
    params.set('maxResults', '10');
    params.set('playlistId', this.playList);
    params.set('key', this.apiKey );

    if (this.nexPageToken) {
      params.set( 'pageToken', this.nexPageToken );
    }


    return this.http.get( url, { search: params } )
      .map( res => {
        console.log(res.json());
        this.nexPageToken = res.json().nextPageToken;

        let videos: any[] = [];

        for (let video of res.json().items ){
          let snippet = video.snippet;
          videos.push ( snippet );
        }

        return videos;
      });

  }

}
