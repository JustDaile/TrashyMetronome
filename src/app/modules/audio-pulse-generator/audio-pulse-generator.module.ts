import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { timeout } from 'q';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AudioPulseGeneratorModule {

  audioContext: AudioContext;
  gainNode: GainNode;
  oscillator: OscillatorNode;
  isStarted = false;

  constructor() {
    this.audioContext = new AudioContext();
    this.audioContext.suspend(); // suspend until we are ready

    this.gainNode = this.audioContext.createGain();
    this.oscillator = this.audioContext.createOscillator();
    this.oscillator.type = 'sine'; // sine, square, sawtooth, triangle
    this.oscillator.connect(this.gainNode).connect(this.audioContext.destination);
    this.oscillator.start(0);
  }

  playPulse(hz: number, gain: number) {
    this.stopPulse(); // ensure pulse has ended
    this.oscillator.frequency.value = hz;
    this.gainNode.gain.value = gain;
    this.audioContext.resume();
  }

  stopPulse() {
    if (this.oscillator){
      this.gainNode.gain.value = 0.01;
      // this.oscillator.disconnect();
      // this.oscillator.stop();
      // this.gainNode.disconnect();
      this.audioContext.suspend();
    }
  }

 }
