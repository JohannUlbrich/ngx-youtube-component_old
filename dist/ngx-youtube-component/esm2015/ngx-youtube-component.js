import { Injectable, NgZone, Component, Input, ElementRef, NgModule } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const getWindow = () => window;
class YoutubeApiService {
    /**
     * @param {?} zone
     */
    constructor(zone) {
        this.zone = zone;
        this._window = getWindow();
    }
    /**
     * @return {?}
     */
    getIframeApi() {
        if (!this.iframeApi) {
            this.loadIframeApi();
        }
        return this.iframeApi;
    }
    /**
     * @return {?}
     */
    loadIframeApi() {
        this.iframeApi = new Promise(resolve => {
            const /** @type {?} */ scriptTag = this._window.document.createElement('script');
            scriptTag.src = 'https://www.youtube.com/iframe_api';
            this._window.document.body.appendChild(scriptTag);
            // The IFrame Player API will call this function when the page has finished downloading the JavaScript for the player API
            this._window['onYouTubeIframeAPIReady'] = () => {
                resolve(this._window['YT']);
            };
        });
    }
}
YoutubeApiService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
YoutubeApiService.ctorParameters = () => [
    { type: NgZone, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class YoutubeComponent {
    /**
     * @param {?} youtubeApiService
     * @param {?} playerElement
     */
    constructor(youtubeApiService, playerElement) {
        this.youtubeApiService = youtubeApiService;
        this.playerElement = playerElement;
        this.subscriptions = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ playerOptions = {};
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
                    const /** @type {?} */ eventListener = this.events[eventListenerName];
                    const /** @type {?} */ subject = new Subject();
                    const /** @type {?} */ handler = event => subject.next(event);
                    playerOptions.events[eventListenerName] = handler;
                    this.subscriptions.push(subject.subscribe(eventListener));
                }
            });
        }
        this.youtubeApiService.getIframeApi().then(success => {
            this.player = new success.Player(this.playerElement.nativeElement, playerOptions);
            return this.player;
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        for (const /** @type {?} */ subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }
}
YoutubeComponent.decorators = [
    { type: Component, args: [{
                selector: 'youtube',
                template: ''
            },] },
];
/** @nocollapse */
YoutubeComponent.ctorParameters = () => [
    { type: YoutubeApiService, },
    { type: ElementRef, },
];
YoutubeComponent.propDecorators = {
    "width": [{ type: Input },],
    "height": [{ type: Input },],
    "videoId": [{ type: Input },],
    "playerVars": [{ type: Input },],
    "events": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class YoutubeModule {
}
YoutubeModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                providers: [YoutubeApiService],
                declarations: [YoutubeComponent],
                exports: [YoutubeComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { YoutubeModule, YoutubeApiService, YoutubeComponent };
//# sourceMappingURL=ngx-youtube-component.js.map
