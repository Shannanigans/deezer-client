import { colors } from "./baseStyle"

export default {
  trackCol: {
    padding: 10,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  flexEnd: {
    alignSelf: "flex-end",
    minWidth: 75,
    maxWidth: 75
  },
  flexStart: {
    alignSelf: "flex-start"
  },
  borderBottom: {
    borderBottom: "1px solid " + colors.darkGrey
  }
}
