import React, { Component } from "react"
import Avatar from "react-avatar"
import { map } from "lodash"

import Track from "../components/Track"
import AlbumTrackListTitle from "../components/AlbumTrackListTitle"
import TrackHeadings from "../components/TrackHeadings"

import { baseStyle, colors } from "../styles/baseStyle"
import defaultAlbumImage from "../assets/deezer-music_icon.png"

const albumWidth = 100
const albumMargin = 10
const titleRowHeight = 40

class AlbumTrackList extends Component {
  render() {
    const { tracks, album } = this.props
    return (
      <div style={style.AlbumTrackListWrapper}>
        <div style={style.albumWrapper}>
          <Avatar
            size={albumWidth}
            style={style.album}
            src={tracks ? album.cover : defaultAlbumImage}
          />
        </div>
        <div>
          <div style={style.trackList}>
            <div
              style={{
                ...baseStyle.flexRow,
                ...baseStyle.flexContainer,
                ...style.trackListWrapper
              }}
            >
              <div style={{ ...baseStyle.flexItem, ...style.ghostAlbum }}>
                <div style={style.filler} />
                <div style={style.filler} />
              </div>

              <div style={baseStyle.flexItem}>
                <AlbumTrackListTitle
                  album={album}
                  titleRowHeight={titleRowHeight}
                />
                <TrackHeadings titleRowHeight={titleRowHeight} />
                {map(this.props.tracks, track => (
                  <Track track={track} releaseDate={album.release_date} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const style = {
  AlbumTrackListWrapper: {
    paddingTop: 40
  },
  trackListWrapper: {
    color: colors.white
  },
  trackList: {
    color: colors.white,
    backgroundColor: colors.lightGrey
  },
  filler: {
    minWidth: "100%",
    minHeight: titleRowHeight,
    backgroundColor: colors.darkGrey
  },
  album: {
    position: "absolute",
    top: -10,
    padding: 10
  },
  ghostAlbum: {
    width: albumWidth + 2 * albumMargin,
    maxWidth: albumWidth + 2 * albumMargin
  },
  albumWrapper: {
    position: "relative"
  }
}

export default AlbumTrackList
