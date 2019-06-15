import { Component, OnInit, Input, Output } from '@angular/core';
import { log } from 'util';
import { AudioPulseGeneratorModule } from 'src/app/modules/audio-pulse-generator/audio-pulse-generator.module';
import { AudioClipPlayerModule } from 'src/app/modules/audio-clip-player/audio-clip-player.module';

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.css']
})

export class MetronomeComponent implements OnInit {

  @Input() tempo: number;
  @Input() beats: number;

  @Output() beatObj: Array<{index: number, active: boolean}>;
  @Output() audioClip: AudioClipPlayerModule;

  intervalTicker;
  isStarted = false;

  ngOnInit() {
    console.log('constructing metronome: ' + this.tempo);
    this.audioClip = new AudioClipPlayerModule();
  }

  start() {
    this.beatObj = new Array();
    for (let i = 0; i < this.beats; i++) {
      this.beatObj.push({
        index: i,
        active: false
      });
    }

    const $this = this;
    let beat = 0;
    const wholeBeatTime = 1000 * 60 / this.tempo;
    this.intervalTicker = setInterval(() => {
      if (!$this.isStarted) {
        return;
      }
      if (beat >= this.beats) {
        $this.audioClip.playBar();
        beat = 0;
      } else {
        $this.audioClip.playBeat();
      }
      this.beatObj[beat].active = true;
      setTimeout(() => {
        this.beatObj[beat-1].active = false;
      }, wholeBeatTime / 2); // half the time of the whole beat
      beat++;
    }, wholeBeatTime);
    this.isStarted = true;
  }

  stop() {
    clearInterval(this.intervalTicker);
    this.isStarted = false;
  }

  setTempo(tempo: number) {
    this.tempo = tempo;
    if (this.isStarted) {
      this.stop();
      this.start();
    }
  }

  setBeatsPerBar(beatsPerBar: number){
    this.beats = beatsPerBar;
  }

}
