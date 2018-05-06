import React, { Component } from "react"
import Avatar from "react-avatar"

import { baseStyle, colors } from "../styles/baseStyle"

class Album extends Component {
  render() {
    return (
      <div
        style={{
          ...style.albumWrapper,
          ...baseStyle.flexColumn,
          ...baseStyle.flexContainer
        }}
      >
        <div style={{ ...baseStyle.flexItem }}>
          <Avatar
            onClick={() => this.props.onClick(this.props.albumId)}
            src={this.props.src}
          />
        </div>
        <div style={{ ...baseStyle.flexItem, ...style.albumTitle }}>
          {this.props.albumTitle}
        </div>
      </div>
    )
  }
}

const style = {
  albumWrapper: {
    padding: 10
  },
  albumTitle: {
    color: colors.aqua,
    paddingTop: 5,
    paddingBottom: 10,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: 100,
    textAlign: "center"
  }
}

export default Album
