import urlLib from "url"
import axios from "axios"
import { omit } from "lodash"

import { default as appConfig } from "../../utility/config"

//
// SERVICES

export const baseURL = urlLib.parse(appConfig.api.deezerURL)

export const requestProvider = axios.create({
  baseURL: corsAnywhere(appConfig.api.deezerURL)
})

// EXPORT

export default {
  requestProvider,
  corsAnywhere,
  getUrl
}

//
// HELPER FUNCTIONS

export function corsAnywhere(url) {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return appConfig.api.corsAnywhereUrl + url
  }
}

export function getUrl(url, params = {}, pathName = null) {
  const urlObj = urlLib.parse(url, true)

  const segments = [urlObj.pathname, params.id, pathName, "/"]

  urlObj.pathname = segments.join("/").replace(/\/\/+/g, "/")

  const query = {
    ...urlObj.query,
    ...omit(params, "id")
  }

  const fullURL = urlLib.parse(urlLib.resolve(baseURL, urlObj.pathname))
  fullURL.query = query

  return urlLib.format(fullURL)
}
