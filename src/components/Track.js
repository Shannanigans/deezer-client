import React, { Component } from "react"
import moment from "moment"

import { baseStyle, colors } from "../styles/baseStyle"
import style from "../styles/trackStyle"

class Track extends Component {
  render() {
    const { track, releaseDate } = this.props
    const durationTimeStamp = moment()
      .startOf("day")
      .seconds(track.duration)
      .format("mm:ss")
    const formatedReleaseDate = moment()
      .date(releaseDate)
      .format("YYYY")
    return (
      <div
        style={{
          ...baseStyle.flexContainer,
          ...baseStyle.flexRow
        }}
      >
        <div style={{ ...baseStyle.flexColumn, ...style.trackCol }}>
          {track.track_position}
        </div>
        <div
          style={{
            ...baseStyle.flexColumn,
            ...baseStyle.flexItem,
            ...style.trackCol,
            ...style.borderBottom
          }}
        >
          {track.title}
        </div>
        <div
          style={{
            ...baseStyle.flexColumn,
            ...baseStyle.flexItem,
            ...style.trackCol,
            ...style.flexEnd,
            ...style.borderBottom
          }}
        >
          {track.artist.name}
        </div>
        <div
          style={{
            ...baseStyle.flexColumn,
            ...style.trackCol,
            ...style.flexEnd,
            ...style.borderBottom
          }}
        >
          {durationTimeStamp}
        </div>
        <div
          style={{
            ...baseStyle.flexColumn,
            ...style.trackCol,
            ...style.flexEnd,
            ...style.borderBottom
          }}
        >
          {formatedReleaseDate}
        </div>
      </div>
    )
  }
}

export default Track
