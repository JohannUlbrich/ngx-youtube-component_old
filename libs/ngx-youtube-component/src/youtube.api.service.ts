import { Injectable, NgZone } from '@angular/core';
import {} from '@types/youtube';

const getWindow = () => window;

@Injectable()
export class YoutubeApiService {
  private _window: any;

  private iframeApi: Promise<any>;

  constructor(private zone: NgZone) {
    this._window = getWindow();
  }

  public getIframeApi(): Promise<any> {
    if (!this.iframeApi) {
      this.loadIframeApi();
    }

    return this.iframeApi;
  }

  private loadIframeApi(): void {
    this.iframeApi = new Promise(resolve => {
      const scriptTag = this._window.document.createElement('script');
      scriptTag.src = 'https://www.youtube.com/iframe_api';
      this._window.document.body.appendChild(scriptTag);

      // The IFrame Player API will call this function when the page has finished downloading the JavaScript for the player API
      this._window['onYouTubeIframeAPIReady'] = () => {
        resolve(this._window['YT']);
      };
    });
  }
}
