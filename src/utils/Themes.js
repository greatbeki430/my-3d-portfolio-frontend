// export const darkTheme = {
//   bg: "#090917",
//   bgLight: "#1C1E27",
//   primary: "#854CE6",
//   text_primary: "#F2F3F4",
//   text_secondary: "#b1b2b3",
//   card: "#171721",
//   card_light: "#191924",
//   button: "#854CE6",
//   white: "#FFFFFF",
//   black: "#000000",
// };

export const darkTheme = {
  bg: "#090917",
  bgLight: "#1C1E27", // already exists
  bg_light: "#1C1E27", // ✅ add alias to match styled-components
  primary: "#854CE6",
  primary_dark: "#6931c7", // ✅ add missing key
  text_primary: "#F2F3F4",
  text_secondary: "#b1b2b3",
  card: "#171721",
  card_light: "#191924",
  button: "#854CE6",
  red: "#ff4d4f", // ✅ add for error message
  white: "#FFFFFF",
  black: "#000000",
};

export const lightTheme = {
  bg: "#FFFFFF",
  bgLight: "#f0f0f0",
  primary: "#be1adb",
  text_primary: "#111111",
  text_secondary: "#48494a",
  card: "#FFFFFF",
  button: "#5c5b5b",
};
