/// <reference types="youtube" />
import { OnInit, OnDestroy, EventEmitter, ElementRef } from '@angular/core';
import { YoutubeApiService } from './youtube.api.service';
export declare class YoutubeComponent implements OnInit, OnDestroy {
    private youtubeApiService;
    private playerElement;
    width: number;
    height: number;
    videoId: string;
    playerVars: YT.PlayerVars;
    events: YT.Events;
    iframeAPIReady: EventEmitter<String>;
    private player;
    constructor(youtubeApiService: YoutubeApiService, playerElement: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
