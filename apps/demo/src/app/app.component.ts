import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private playerOptions;
  private movie;
  private buffered;

  constructor() {
    this.buffered = false;
    this.movie = {
      youtubeId: 'B65hW9YYY5A'
    };

    this.playerOptions = {
      width: '100%',
      height: '100%',
      playerVars: {
        controls: 0,
        enablejsapi: 1,
        autoplay: 1
      },
      events: {
        onReady: this.onReady.bind(this),
        onStateChange: this.onStateChange.bind(this)
      }
    };
  }

  ngOnInit() {}

  private onYouTubeIframeAPIReady(event): void {
    console.log(event);
  }

  private onReady(event): void {
    //console.log(event);

    event.target.loadVideoById({
      videoId: this.movie.youtubeId,
      suggestedQuality: 'highres'
    });
  }

  private onStateChange(event): void {
    //console.log(event);

    if (event.data === 3 && !this.buffered) {
      this.buffered = true;
      event.target.pauseVideo();

      setTimeout(function() {
        event.target.playVideo();
      }, 5000);
    }
  }
}
