import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeApiService } from './youtube.api.service';
import { YoutubeComponent } from './youtube.component';

@NgModule({
  imports: [CommonModule],
  providers: [YoutubeApiService],
  declarations: [YoutubeComponent],
  exports: [YoutubeComponent]
})
export class YoutubeModule {}
