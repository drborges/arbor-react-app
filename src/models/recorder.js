export default class Recorder {
  toggle(timeline) {
    this.recording = !this.recording

    if (timeline.isOn) {
      timeline.off()
    } else {
      timeline.on()
    }
  }
}