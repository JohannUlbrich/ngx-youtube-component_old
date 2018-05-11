/// <reference types="youtube" />
import { OnInit, OnDestroy, ElementRef } from '@angular/core';
import { YoutubeApiService } from './youtube.api.service';
export declare class YoutubeComponent implements OnInit, OnDestroy {
    private youtubeApiService;
    private playerElement;
    width: number;
    height: number;
    videoId: string;
    playerVars: YT.PlayerVars;
    events: YT.Events;
    private player;
    private subscriptions;
    constructor(youtubeApiService: YoutubeApiService, playerElement: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
