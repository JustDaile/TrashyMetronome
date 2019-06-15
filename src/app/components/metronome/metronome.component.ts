import { Component, OnInit, Input, Output } from '@angular/core';
import { log } from 'util';
import { AudioPulseGeneratorModule } from 'src/app/modules/audio-pulse-generator/audio-pulse-generator.module';

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.css']
})

export class MetronomeComponent implements OnInit {

  @Input() tempo: number;
  @Input() beats: number;

  volume = 10;
  audioGen: AudioPulseGeneratorModule;
  intervalTicker;


  isStarted = false;
  isPulsing = false;


  ngOnInit() {
    console.log('constructing metronome: ' + this.tempo);
    this.audioGen = new AudioPulseGeneratorModule();
  }

  start() {
    const $this = this;
    let beat = 0;
    const wholeBeatTime = 1000 * 60 / this.tempo;

    this.intervalTicker = setInterval(() => {
      if (!$this.isStarted) {
        return;
      }
      $this.isPulsing = true;
      if (beat === 0) {
        $this.audioGen.playPulse(560, 0.01 * $this.volume);
        beat = this.beats;
      } else {
        $this.audioGen.playPulse(540, 0.01 * $this.volume);
      }
      beat--;

      setTimeout(() => {
        $this.audioGen.stopPulse();
        $this.isPulsing = false;
      }, wholeBeatTime / 2); // half the time of the whole beat
    }, wholeBeatTime);

    this.isStarted = true;
  }

  stop() {
    clearInterval(this.intervalTicker);
    this.isStarted = false;
  }

  changeVolume(percent) {
    this.volume = percent;
  }

  getVolume(): number {
    return this.volume;
  }

  setTempo(tempo) {
    this.tempo = tempo;
    if (this.isStarted) {
      this.stop();
      this.start();
    }
  }

}
