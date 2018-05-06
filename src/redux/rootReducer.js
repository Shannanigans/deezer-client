import { combineReducers } from "redux"

import { reducer as album } from "./ducks/album"
import { reducer as ui } from "./ducks/ui"
import { reducer as track } from "./ducks/track"

const appReducers = combineReducers({ album, ui, track })

const rootReducer = (state, action) => {
  switch (action.type) {
    default:
      return appReducers(state, action)
  }
}
export default rootReducer
