import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AudioClipPlayerModule {

  beat = new Audio('assets/MetroBeat1.wav');
  bar = new Audio('assets/MetroBar1.wav');

  playBeat() {
    this.beat.currentTime = 0;
    this.beat.play();
  }

  playBar() {
    this.bar.currentTime = 0;
    this.bar.play();
  }

  setVolume(percentage: number) {
    this.beat.volume = 0.01 * percentage;
    this.bar.volume = 0.01 * percentage;
  }

  getVolume(): number {
    return 100 / this.beat.volume;
  }

}
