import { Injectable, NgZone, Component, Input, ElementRef, NgModule } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CommonModule } from '@angular/common';

var getWindow = function () { return window; };
var YoutubeApiService = /** @class */ (function () {
    function YoutubeApiService(zone) {
        this.zone = zone;
        this._window = getWindow();
    }
    YoutubeApiService.prototype.getIframeApi = function () {
        if (!this.iframeApi) {
            this.loadIframeApi();
        }
        return this.iframeApi;
    };
    YoutubeApiService.prototype.loadIframeApi = function () {
        var _this = this;
        this.iframeApi = new Promise(function (resolve) {
            var scriptTag = _this._window.document.createElement('script');
            scriptTag.src = 'https://www.youtube.com/iframe_api';
            _this._window.document.body.appendChild(scriptTag);
            _this._window['onYouTubeIframeAPIReady'] = function () {
                resolve(_this._window['YT']);
            };
        });
    };
    return YoutubeApiService;
}());
YoutubeApiService.decorators = [
    { type: Injectable },
];
YoutubeApiService.ctorParameters = function () { return [
    { type: NgZone, },
]; };
var YoutubeComponent = /** @class */ (function () {
    function YoutubeComponent(youtubeApiService, playerElement) {
        this.youtubeApiService = youtubeApiService;
        this.playerElement = playerElement;
    }
    YoutubeComponent.prototype.ngOnInit = function () {
        var _this = this;
        var playerOptions = {};
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
            Object.keys(this.events).forEach(function (eventListenerName) {
                if (_this.events.hasOwnProperty(eventListenerName)) {
                    var eventListener = _this.events[eventListenerName];
                    var subject_1 = new Subject();
                    var handler = function (event) { return subject_1.next(event); };
                    playerOptions.events[eventListenerName] = handler;
                    subject_1.subscribe(eventListener);
                }
            });
        }
        this.youtubeApiService.getIframeApi().then(function (success) {
            _this.player = new success.Player(_this.playerElement.nativeElement, playerOptions);
            return _this.player;
        });
    };
    YoutubeComponent.prototype.ngOnDestroy = function () {
    };
    return YoutubeComponent;
}());
YoutubeComponent.decorators = [
    { type: Component, args: [{
                selector: 'youtube',
                template: ''
            },] },
];
YoutubeComponent.ctorParameters = function () { return [
    { type: YoutubeApiService, },
    { type: ElementRef, },
]; };
YoutubeComponent.propDecorators = {
    "width": [{ type: Input },],
    "height": [{ type: Input },],
    "videoId": [{ type: Input },],
    "playerVars": [{ type: Input },],
    "events": [{ type: Input },],
};
var YoutubeModule = /** @class */ (function () {
    function YoutubeModule() {
    }
    return YoutubeModule;
}());
YoutubeModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                providers: [YoutubeApiService],
                declarations: [YoutubeComponent],
                exports: [YoutubeComponent]
            },] },
];

export { YoutubeModule, YoutubeApiService, YoutubeComponent };
//# sourceMappingURL=ngx-youtube-component.js.map
