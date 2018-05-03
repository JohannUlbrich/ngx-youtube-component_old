import { NgZone } from '@angular/core';
export declare class YoutubeApiService {
    private zone;
    private _window;
    private iframeApi;
    constructor(zone: NgZone);
    getIframeApi(): Promise<any>;
    private loadIframeApi();
}
