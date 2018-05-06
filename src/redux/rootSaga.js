import { fork, call } from "redux-saga/effects"
import { saga as album } from "./ducks/album"
import { saga as track } from "./ducks/track"
import { saga as ui } from "./ducks/ui"

function autoRestart(generator) {
  return function* autoRestarting(...args) {
    while (true) {
      try {
        yield call(generator, ...args)
      } catch (e) {
        console.error(`Unhandled error in '${generator.name}'`, e)
      }
    }
  }
}

const rootSaga = autoRestart(function* rootSaga() {
  yield fork(album)
  yield fork(track)
  yield fork(ui)
})

export default rootSaga
