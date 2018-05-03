import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { YoutubeModule } from 'ngx-youtube-component';

@NgModule({
  imports: [BrowserModule, YoutubeModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
