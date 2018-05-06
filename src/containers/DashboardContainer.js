import React, { Component } from "react"
import { connect } from "react-redux"
import { filter, isEmpty } from "lodash"
import Media from "react-media"
import "../styles/hideScroll.css"

import {
  setSearchSelectedArtist,
  setSearchSelectedAlbum,
  requestArtistSearch
} from "../redux/ducks/ui"

import SearchInput from "../components/SearchInput"
import AlbumCarousel from "../components/AlbumCarousel"
import AlbumTrackList from "../components/AlbumTrackList"

import baseStyle from "../styles/baseStyle"

class DashboardContainer extends Component {
  handleInputChange = newValue => {
    this.props.requestArtistSearch(newValue)
  }

  handleChange = selectedOption => {
    this.props.setSearchSelectedArtist(selectedOption)
  }

  render() {
    const {
      albums,
      tracks,
      setSearchSelectedAlbum,
      selectedOption,
      selectedAlbum,
      searchArtistOptions
    } = this.props
    return (
      <div
        style={{
          ...baseStyle.flexContainer,
          ...baseStyle.flexColumn,
          ...baseStyle.fullHeight,
          ...baseStyle.darkGreyBackground
        }}
      >
        <div style={{ ...baseStyle.flexContainer, ...baseStyle.flexItem }}>
          <Media
            query={baseStyle.small}
            render={() => <aside style={{ ...style.sidebar }} />}
          />

          <main style={baseStyle.flexItem}>
            <SearchInput
              handleChange={this.handleChange}
              onInputChange={this.handleInputChange}
              selectedOption={selectedOption}
              options={searchArtistOptions}
            />
            {!isEmpty(albums) ? (
              <AlbumCarousel
                albums={albums}
                setSearchSelectedAlbum={setSearchSelectedAlbum}
                selectedAlbum={selectedAlbum}
                selectedOption={selectedOption}
              />
            ) : null}
            {!isEmpty(tracks) && !isEmpty(albums) ? (
              <AlbumTrackList tracks={tracks} album={selectedAlbum} />
            ) : null}
          </main>

          <Media
            query={baseStyle.small}
            render={() => <aside style={{ ...style.sidebar }} />}
          />
        </div>
      </div>
    )
  }
}

const style = {
  sidebar: { width: "20%" }
}

const mapStateToProps = state => {
  const selectedOption =
    state &&
    state.ui &&
    state.ui.searchSelectedArtist &&
    state.ui.searchSelectedArtist.selectedOption

  const selectedArtistId = selectedOption && selectedOption.value

  const albums =
    state &&
    state.album &&
    state.album.data &&
    filter(state.album.data, { artistId: selectedArtistId })

  const selectedAlbumId =
    state &&
    state.ui &&
    state.ui.searchSelectedAlbum &&
    state.ui.searchSelectedAlbum.albumId

  const tracks =
    state &&
    state.track &&
    state.track.data &&
    filter(state.track.data, { albumId: selectedAlbumId })

  const selectedAlbum =
    state &&
    state.album &&
    state.album.data &&
    filter(state.album.data, { id: selectedAlbumId }) &&
    filter(state.album.data, { id: selectedAlbumId })[0] &&
    filter(state.album.data, { id: selectedAlbumId })[0]

  const searchArtistOptions = state && state.ui && state.ui.searchArtists

  return {
    selectedOption,
    albums,
    tracks,
    searchArtistOptions,
    selectedAlbum
  }
}

const mapDispatchToProps = {
  setSearchSelectedArtist,
  setSearchSelectedAlbum,
  requestArtistSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
