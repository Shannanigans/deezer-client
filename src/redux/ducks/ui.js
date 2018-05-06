import { fork, put, call, takeLatest } from "redux-saga/effects"
import { delay } from "redux-saga"
import { map, isEmpty } from "lodash"

import api from "./api"

//
// URLS

export const SEARCH_ARTIST_PATHNAMES = {
  primaryPath: "search",
  secondaryPath: "artist",
  limit: 10
}

//
//  ACTION DEFINITIONS

export const SET_SEARCH_SELECTED_ARTIST = "@ ui / SET_SEARCH_SELECTED_ARTIST"
export const SET_SEARCH_SELECTED_ALBUM = "@ ui / SET_SEARCH_SELECTED_ALBUM"

export const SEARCH_ARTIST_UPDATE = "@ album / SEARCH_ARTIST_UPDATE"
export const SEARCH_ARTIST_LIST_REQUESTED =
  "@ album / SEARCH_ARTIST_LIST_REQUESTED"
export const SEARCH_ARTIST_LIST_SUCCEEDED =
  "@ album / SEARCH_ARTIST_LIST_SUCCEEDED"
export const SEARCH_ARTIST_LIST_FAILED = "@ album / SEARCH_ARTIST_LIST_FAILED"

//
// ACTION CREATORS

export const setSearchSelectedArtist = selectedOption => ({
  type: SET_SEARCH_SELECTED_ARTIST,
  payload: { selectedOption }
})

export const setSearchSelectedAlbum = albumId => ({
  type: SET_SEARCH_SELECTED_ALBUM,
  payload: { albumId }
})

export const requestArtistSearch = inputValue => ({
  type: SEARCH_ARTIST_UPDATE,
  payload: { inputValue }
})

//
//  REDUCER

export function reducer(state = {}, action = {}) {
  switch (action.type) {
    case SET_SEARCH_SELECTED_ARTIST:
      return {
        ...state,
        searchSelectedArtist: {
          selectedOption:
            action && action.payload && action.payload.selectedOption
        }
      }

    case SET_SEARCH_SELECTED_ALBUM:
      return {
        ...state,
        searchSelectedAlbum: {
          albumId: action && action.payload && action.payload.albumId
        }
      }

    case SEARCH_ARTIST_LIST_SUCCEEDED:
      let { items } = action.payload
      return {
        ...state,
        searchArtists: items
      }

    default:
      return state
  }
}

//
//  SAGA

function* watchSearchRequest() {
  yield takeLatest(SEARCH_ARTIST_UPDATE, requestSearchArtists)
}

function* requestSearchArtists(action) {
  try {
    yield delay(300)

    const inputValue = action && action.payload && action.payload.inputValue

    const { payload } = action
    yield put({ type: SEARCH_ARTIST_LIST_REQUESTED, payload })

    if (!isEmpty(inputValue)) {
      const url = api.corsAnywhere(
        api.getUrl(
          SEARCH_ARTIST_PATHNAMES.primaryPath,
          { q: inputValue, limit: SEARCH_ARTIST_PATHNAMES.limit },
          SEARCH_ARTIST_PATHNAMES.secondaryPath
        )
      )

      const response = yield call(api.requestProvider, { url })

      let items = response && response.data && response.data.data
      items = map(items, item => {
        return { label: item.name, value: item.id }
      })

      yield put({
        type: SEARCH_ARTIST_LIST_SUCCEEDED,
        payload: { items }
      })
    }
  } catch (error) {
    if (error && error.message) {
      yield put({ type: SEARCH_ARTIST_LIST_FAILED, payload: error })
    } else throw error
  }
}

export function* saga() {
  yield fork(watchSearchRequest)
}
