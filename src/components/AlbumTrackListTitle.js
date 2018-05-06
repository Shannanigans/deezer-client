import React, { Component } from "react"

import { baseStyle, colors } from "../styles/baseStyle"
import style from "../styles/trackStyle"

class AlbumTrackListTitle extends Component {
  render() {
    const albumTitle = this.props && this.props.album && this.props.album.title
    const titleRowHeight = this.props.titleRowHeight
    return (
      <div
        style={{
          ...baseStyle.flexContainer,
          ...baseStyle.flexRow,
          ...trackHeadingStyle.titleWrapper,
          ...trackHeadingStyle.headingBackgroundColor,
          height: titleRowHeight
        }}
      >
        <div
          style={{
            ...baseStyle.flexColumn,
            ...baseStyle.flexItem,
            ...style.trackCol,
            ...style.flexStart
          }}
        >
          {albumTitle}
        </div>
      </div>
    )
  }
}

const trackHeadingStyle = {
  headingBackgroundColor: {
    backgroundColor: colors.darkGrey
  },
  titleWrapper: {
    color: colors.aqua,
    fontSize: 18
  }
}

export default AlbumTrackListTitle
