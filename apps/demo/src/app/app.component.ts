import { Component, OnInit } from '@angular/core';
import { YoutubeApiService } from 'ngx-youtube-component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private playerOptions;
  private movie;
  private buffered;

  constructor(private youtubeApiService: YoutubeApiService) {
    this.buffered = false;
    this.movie = {
      youtubeId: 'B65hW9YYY5A'
    };

    this.playerOptions = {
      width: '100%',
      height: '100%',
      playerVars: {
        autoplay: 1,
        autohide: 1,
        controls: 0,
        disablekb: 1,
        enablejsapi: 1,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        showinfo: 0,
        fs: 1,
        cc_load_policy: 0,
        iv_load_policy: 3
      },
      events: {
        onReady: this.onReady.bind(this),
        onStateChange: this.onStateChange.bind(this)
      }
    };
  }

  ngOnInit() {
    // Get API via Youtube API Service
    this.youtubeApiService.getIframeApi().then(success => {
      console.log(success);
    });
  }

  private onReady(event): void {
    //console.log(event);

    event.target.loadVideoById({
      videoId: this.movie.youtubeId,
      suggestedQuality: 'highres'
    });

    event.target.pauseVideo();
  }

  private onStateChange(event): void {
    //console.log(event);

    if (event.data === 3 && !this.buffered) {
      this.buffered = true;

      setTimeout(function() {
        event.target.playVideo();
      }, 5000);
    }
  }
}
