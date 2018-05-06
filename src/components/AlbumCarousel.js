import React, { Component } from "react"
import { map } from "lodash"
import sizeMe from "react-sizeme"

import Album from "../components/Album"

import { colors } from "../styles/baseStyle"

class AlbumCarousel extends Component {
  render() {
    const { albums, selectedAlbum, selectedOption } = this.props
    const { width } = this.props.size
    return (
      <div style={style.albumWrapper}>
        <div style={style.searchTitle}>
          {selectedOption ? (
            `Search results for "` + selectedOption.label + `"`
          ) : null}
        </div>
        <div style={style.albumsTitle}>{"ALBUMS"}</div>
        <div style={{ ...style.scrollWrapper, maxWidth: width }}>
          <div style={style.innerWrapper}>
            {map(albums, album => (
              <Album
                key={album.id}
                onClick={this.props.setSearchSelectedAlbum}
                src={album.cover}
                albumId={album.id}
                albumTitle={album.title}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const style = {
  albumWrapper: {
    paddingBottom: 10
  },
  scrollWrapper: {
    display: "flex",
    alignItems: "center",
    minHeight: 157
  },
  innerWrapper: {
    overflowX: "auto",
    display: "flex"
  },
  albumsTitle: {
    color: colors.aqua,
    padding: "10px 0 0 10px",
    borderTop: "1px solid" + colors.lightGrey
  },
  searchTitle: {
    color: colors.white,
    padding: "0 0 10px 10px",
    minHeight: 18
  }
}

export default sizeMe()(AlbumCarousel)
