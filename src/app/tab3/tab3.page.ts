import { Component } from '@angular/core';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { CaptureImageOptions, MediaCapture } from '@awesome-cordova-plugins/media-capture/ngx';
import { CapacitorVideoPlayer } from 'capacitor-video-player';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  video: any;

  constructor(
    private mediaCapture: MediaCapture,
    private file: File
  ) {}

  async startRecording() {
    try {
      let options: CaptureImageOptions = { limit: 1 }
      const data: any = await this.mediaCapture.captureVideo(options);
      this.video = data[0];
      console.log(this.video);
      let dir = this.video.localURL.split('/');
      dir.pop();
      let fromDir = dir.join('/');
      let toDir = this.file.dataDirectory;
      const response = await this.file.copyFile(fromDir, this.video.name, toDir, this.video.name);
      console.log(response);
    } catch(e) {
      console.log(e);
    }
  }

  async playRecording() {
    let path = this.file.dataDirectory + this.video.name;
    await CapacitorVideoPlayer.initPlayer({
      mode: 'fullscreen',
      url: path,
      playerId: 'fullscreen',
      componentTag: 'app-tab3'
    });   
  }

}
