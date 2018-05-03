(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/Subject'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define('ngx-youtube-component', ['exports', '@angular/core', 'rxjs/Subject', '@angular/common'], factory) :
	(factory((global['ngx-youtube-component'] = {}),global.ng.core,global.Rx,global.ng.common));
}(this, (function (exports,core,Subject,common) { 'use strict';

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
    { type: core.Injectable },
];
YoutubeApiService.ctorParameters = function () { return [
    { type: core.NgZone, },
]; };
var YoutubeComponent = /** @class */ (function () {
    function YoutubeComponent(youtubeApiService, playerElement) {
        this.youtubeApiService = youtubeApiService;
        this.playerElement = playerElement;
        this.iframeAPIReady = new core.EventEmitter();
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
                    var subject_1 = new Subject.Subject();
                    playerOptions.events[eventListenerName] = function (event) { return subject_1.next(event); };
                    subject_1.subscribe(eventListener);
                }
            });
        }
        this.youtubeApiService.getIframeApi().then(function (success) {
            _this.iframeAPIReady.emit(success);
            _this.player = new success.Player(_this.playerElement.nativeElement, playerOptions);
            return _this.player;
        });
    };
    YoutubeComponent.prototype.ngOnDestroy = function () {
    };
    return YoutubeComponent;
}());
YoutubeComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'youtube',
                template: ''
            },] },
];
YoutubeComponent.ctorParameters = function () { return [
    { type: YoutubeApiService, },
    { type: core.ElementRef, },
]; };
YoutubeComponent.propDecorators = {
    "width": [{ type: core.Input },],
    "height": [{ type: core.Input },],
    "videoId": [{ type: core.Input },],
    "playerVars": [{ type: core.Input },],
    "events": [{ type: core.Input },],
    "iframeAPIReady": [{ type: core.Output },],
};
var YoutubeModule = /** @class */ (function () {
    function YoutubeModule() {
    }
    return YoutubeModule;
}());
YoutubeModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule],
                providers: [YoutubeApiService],
                declarations: [YoutubeComponent],
                exports: [YoutubeComponent]
            },] },
];

exports.YoutubeModule = YoutubeModule;
exports.YoutubeApiService = YoutubeApiService;
exports.YoutubeComponent = YoutubeComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-youtube-component.umd.js.map
