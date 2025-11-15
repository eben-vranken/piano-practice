// Audio context for beeps and metronome
let audioContext = null;

export function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

// Play a beep sound
export function playBeep(frequency = 440, duration = 200, type = 'sine') {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  
  gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);
  
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration / 1000);
}

// Metronome class
export class Metronome {
  constructor(bpm = 80) {
    this.bpm = bpm;
    this.isPlaying = false;
    this.intervalId = null;
    this.audioContext = getAudioContext();
    this.nextNoteTime = 0.0;
    this.currentBeat = 0;
    this.beatsPerBar = 4;
  }
  
  start() {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    this.currentBeat = 0;
    this.nextNoteTime = this.audioContext.currentTime + 0.1;
    this.schedule();
  }
  
  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  
  setBPM(bpm) {
    this.bpm = Math.max(40, Math.min(200, bpm));
  }
  
  schedule() {
    while (this.nextNoteTime < this.audioContext.currentTime + 0.1) {
      this.scheduleNote(this.currentBeat);
      this.nextNote();
    }
    this.intervalId = setTimeout(() => this.schedule(), 25);
  }
  
  scheduleNote(beatNumber) {
    const ctx = this.audioContext;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // First beat is higher pitch
    osc.frequency.value = beatNumber === 0 ? 800 : 600;
    osc.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    
    osc.start(this.nextNoteTime);
    osc.stop(this.nextNoteTime + 0.05);
  }
  
  nextNote() {
    const secondsPerBeat = 60.0 / this.bpm;
    this.nextNoteTime += secondsPerBeat;
    this.currentBeat++;
    if (this.currentBeat === this.beatsPerBar) {
      this.currentBeat = 0;
    }
  }
}

