export const colors = {
  darkGrey: "#1C1C1C",
  mediumGrey: "#232323",
  lightGrey: "#2A2A2A",
  textGrey: "#888888",
  white: "#fff",
  aqua: "#00e6e6"
}

export const baseStyle = {
  fullHeight: { minHeight: "100vh" },
  flexContainer: { display: "flex" },
  flexItem: { flex: "1" },
  flexColumn: { flexDirection: "column" },
  flexRow: { flexDirection: "row" },
  darkGreyBackground: {
    background: colors.darkGrey
  },
  small: "(min-width: 599px)"
}

export const botton = {
  backgroundColor: colors.aqua,
  padding: "10px 20px 10px 20px",
  margin: "0 0 0 10px",
  borderRadius: 2,
  border: 0,
  fontWeight: "bold",
  color: colors.darkGrey
}

export default baseStyle
