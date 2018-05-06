import React, { Component } from "react"

import { baseStyle, colors } from "../styles/baseStyle"
import style from "../styles/trackStyle"

class TrackHeadings extends Component {
  render() {
    const titleRowHeight = this.props.titleRowHeight
    return (
      <div
        style={{
          ...baseStyle.flexContainer,
          ...baseStyle.flexRow,
          ...trackHeadingStyle.headingBackgroundColor,
          height: titleRowHeight
        }}
      >
        <div
          style={{
            ...baseStyle.flexColumn,
            ...style.trackCol,
            ...style.flexStart
          }}
        >
          {"#"}
        </div>
        <div
          style={{
            ...baseStyle.flexColumn,
            ...baseStyle.flexItem,
            ...style.trackCol,
            ...style.flexStart
          }}
        >
          {"Title"}
        </div>
        <div
          style={{
            ...baseStyle.flexColumn,
            ...baseStyle.flexItem,
            ...style.trackCol,
            ...style.flexEnd
          }}
        >
          {"Artist"}
        </div>
        <div
          style={{
            ...baseStyle.flexColumn,
            ...style.trackCol,
            ...style.flexEnd
          }}
        >
          {"Time"}
        </div>
        <div
          style={{
            ...baseStyle.flexColumn,
            ...style.trackCol,
            ...style.flexEnd
          }}
        >
          {"Release"}
        </div>
      </div>
    )
  }
}

const trackHeadingStyle = {
  headingBackgroundColor: {
    backgroundColor: colors.darkGrey
  }
}

export default TrackHeadings
