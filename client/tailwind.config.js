import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#64558E",
          "primary-content": "#FFFFFF",
          "secondary": "#EBDDFF",
          "secondary-content": "#21005D",
          "base-100": "#FFFFFF",
          "base-200": "#FDE4FE",
          "base-300": "#EFE0C2",
          "base-content": "#4C4C54",
          success: "#00ff00",
          "success-content": "#001600",
          warning: "#F4A258",
          "warning-content": "#140a03",
          error: "#ff0000",
          "error-content": "#160000",
        },
      },
    ],
  }
}

