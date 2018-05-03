import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ElementRef
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { YoutubeApiService } from './youtube.api.service';
import {} from '@types/youtube';

@Component({
  selector: 'youtube',
  template: ''
})
export class YoutubeComponent implements OnInit, OnDestroy {
  @Input() width: number;
  @Input() height: number;
  @Input() videoId: string;
  @Input() playerVars: YT.PlayerVars;
  @Input() events: YT.Events;
  @Output() iframeAPIReady: EventEmitter<String> = new EventEmitter<String>();

  private player: YT.Player;

  constructor(
    private youtubeApiService: YoutubeApiService,
    private playerElement: ElementRef
  ) {}

  ngOnInit() {
    const playerOptions: YT.PlayerOptions = {};

    if (this.width !== undefined) {
      playerOptions.width = this.width;
    }

    if (this.height !== undefined) {
      playerOptions.height = this.height;
    }

    if (this.videoId !== undefined) {
      playerOptions.videoId = this.videoId;
    }

    if (this.playerVars !== undefined) {
      playerOptions.playerVars = this.playerVars;
    }

    if (this.events !== undefined) {
      playerOptions.events = {};

      Object.keys(this.events).forEach(eventListenerName => {
        if (this.events.hasOwnProperty(eventListenerName)) {
          const eventListener = this.events[eventListenerName];
          const subject = new Subject<any>();

          playerOptions.events[eventListenerName] = event =>
            subject.next(event);
          subject.subscribe(eventListener);
        }
      });
    }

    this.youtubeApiService.getIframeApi().then(success => {
      this.iframeAPIReady.emit(success);
      this.player = new success.Player(
        this.playerElement.nativeElement,
        playerOptions
      );

      return this.player;
    });
  }

  ngOnDestroy() {
    // TODO: unsubscribe
  }
}
