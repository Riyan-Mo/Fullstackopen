import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    grey: "#25292c",
    form: "#b9b9b9",
  },
  text: {
    black: "#25292c",
    white: "#f5f9fc",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 18,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
  image:{
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  error:{
    primary: "#d73a4a",
  },
};

export default theme;
