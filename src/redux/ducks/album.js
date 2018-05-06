import { take, fork, put, call } from "redux-saga/effects"
import { omit, isEmpty, reduce, map } from "lodash"

import api from "./api"
import { SET_SEARCH_SELECTED_ARTIST } from "./ui"

//
// URLS

export const ARTIST_ALBUMS_PATHNAMES = {
  primaryPath: "artist",
  secondaryPath: "albums"
}

//
// ACTION DEFINITIONS

export const ARTIST_ALBUMS_LIST_REQUESTED =
  "@ album / ARTIST_ALBUMS_LIST_REQUESTED"
export const ARTIST_ALBUMS_LIST_SUCCEEDED =
  "@ album / ARTIST_ALBUMS_LIST_SUCCEEDED"
export const ARTIST_ALBUMS_LIST_FAILED = "@ album / ARTIST_ALBUMS_LIST_FAILED"

//
//  REDUCER

export function reducer(state = {}, action = {}) {
  switch (action.type) {
    case ARTIST_ALBUMS_LIST_SUCCEEDED: {
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

function* watchSearchSelect() {
  while (true) {
    const action = yield take(SET_SEARCH_SELECTED_ARTIST)
    yield fork(requestArtistAlbums, action)
  }
}

function* requestArtistAlbums(action) {
  try {
    const artistId =
      action &&
      action.payload &&
      action.payload.selectedOption &&
      action.payload.selectedOption.value

    const { payload } = action
    yield put({ type: ARTIST_ALBUMS_LIST_REQUESTED, payload })

    const url = api.corsAnywhere(
      api.getUrl(
        ARTIST_ALBUMS_PATHNAMES.primaryPath,
        { id: artistId },
        ARTIST_ALBUMS_PATHNAMES.secondaryPath
      )
    )
    const response = yield call(api.requestProvider, { url })

    let items = response && response.data && response.data.data
    items = map(items, item => {
      return { ...item, artistId }
    })

    yield put({
      type: ARTIST_ALBUMS_LIST_SUCCEEDED,
      payload: { items }
    })
  } catch (error) {
    if (error && error.message) {
      yield put({ type: ARTIST_ALBUMS_LIST_FAILED, payload: error })
    } else throw error
  }
}

export function* saga() {
  yield fork(watchSearchSelect)
}
