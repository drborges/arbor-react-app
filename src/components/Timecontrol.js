import React from "react"

const Timecontrol = ({ timeline, recorder }) => (
  <div className="time-control">
    <div>
      <button onClick={() => timeline.travel.step(-1)}>{'⬅️'}</button>
      <button onClick={() => recorder.toggle(timeline)}>{recorder.recording ? '⏹️' : '⏺️'}</button>
      <span>{`Time Cursor: ${timeline.cursor}`}</span>
      <button onClick={() => timeline.travel.step(1)}>{'➡️'}</button>
    </div>
    <input
      type="range"
      min={0}
      max={timeline.history.length - 1}
      value={timeline.cursor}
      onChange={(event) => timeline.travel.to(event.target.valueAsNumber)}
    />
  </div>
)

export default Timecontrol