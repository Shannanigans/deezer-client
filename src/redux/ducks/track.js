import { take, fork, put, call } from "redux-saga/effects"
import { omit, isEmpty, reduce, map } from "lodash"

import api from "./api"
import { SET_SEARCH_SELECTED_ALBUM } from "./ui"

//
// URLS

export const ALBUM_TRACKS_PATHNAMES = {
  primaryPath: "album",
  secondaryPath: "tracks"
}

//
// ACTION DEFINITIONS

export const ALBUM_TRACKS_LIST_REQUESTED =
  "@ album / ALBUM_TRACKS_LIST_REQUESTED"
export const ALBUM_TRACKS_LIST_SUCCEEDED =
  "@ album / ALBUM_TRACKS_LIST_SUCCEEDED"
export const ALBUM_TRACKS_LIST_FAILED = "@ album / ALBUM_TRACKS_LIST_FAILED"

//
//  REDUCER

export function reducer(state = {}, action = {}) {
  switch (action.type) {
    case ALBUM_TRACKS_LIST_SUCCEEDED: {
      let { items } = action.payload
      return {
        ...omit(state, ["data"]),
        data: !isEmpty(items)
          ? reduce(
              items,
              (accList, item) => {
                accList = (accList && accList.data) || accList
                return {
                  ...accList,
                  [item.id]: {
                    ...accList[item.id],
                    ...item
                  }
                }
              },
              state
            )
          : { ...state.data }
      }
    }
    default:
      return state
  }
}

//
//  SAGA

function* watchAlbumSelect() {
  while (true) {
    const action = yield take(SET_SEARCH_SELECTED_ALBUM)
    yield fork(requestAlbumsTracks, action)
  }
}

function* requestAlbumsTracks(action) {
  try {
    const albumId = action && action.payload && action.payload.albumId
    const { payload } = action

    yield put({ type: ALBUM_TRACKS_LIST_REQUESTED, payload })

    const url = api.corsAnywhere(
      api.getUrl(
        ALBUM_TRACKS_PATHNAMES.primaryPath,
        { id: albumId },
        ALBUM_TRACKS_PATHNAMES.secondaryPath
      )
    )
    const response = yield call(api.requestProvider, { url })

    let items = response && response.data && response.data.data
    items = map(items, item => {
      return { ...item, albumId }
    })

    yield put({
      type: ALBUM_TRACKS_LIST_SUCCEEDED,
      payload: { items }
    })
  } catch (error) {
    if (error && error.message) {
      yield put({ type: ALBUM_TRACKS_LIST_FAILED, payload: error })
    } else throw error
  }
}

export function* saga() {
  yield fork(watchAlbumSelect)
}
