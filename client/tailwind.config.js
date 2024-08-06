import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors:{
        'primary': {
          base: '#64558E',
          content: '#FFFFFF',
        },
        'secondary':{
          base: '#21005D',
          content:'#EBDDFF',
        },
      }
    },
  },
  
}

