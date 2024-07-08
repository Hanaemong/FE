/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx}"],
  safelist: ["bg-[#EBEBEB]", "bg-[#9E9E9E]", "bg-[#A0A0A0]"],
  theme: {
    fontFamily: {
      hanaHeavy: ["Hana-Heavy"],
      hanaBold: ["Hana-Bold"],
      hanaCM: ["Hana-CM"],
      hanaMedium: ["Hana-Medium"],
      hanaRegular: ["Hana-Regular"],
      hanaLight: ["Hana-Light"],
    },
    extend: {
      colors: {
        hanaPurple: "#8665EF",
        hanaMint: "#47DCC1",
        hanaLightMint: "#C3EBEA",
        hanaBlue: "#3F99CB",
        hanaGray: "#F5F6FA",
        hanaPink: "#DE3BBA",
        hanaSilver: "#DED6E0",
        hanaGray2: "#EBEBEB",
        hanaSilver2: "#9E9E9E",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to bottom right, #3bbfb2 5%, #5cbbd9 33%, #884cc5 70%, #de3bba 99%)",
        "custom-light-gradient":
          "linear-gradient(to bottom right,rgba(59, 191, 178, 0.4) 5%,rgba(92, 187, 217, 0.4) 33%, rgba(136, 76, 197, 0.4) 70%,rgba(222, 59, 186, 0.4) 99%)",
        "custom-straight-gradient":
          "linear-gradient(to right,rgba(59, 191, 178, 0.4) 5%,rgba(92, 187, 217, 0.4) 33%, rgba(136, 76, 197, 0.4) 66%,rgba(222, 59, 186, 0.4) 99%)",
      },
      keyframes: {
        flash: {
          "0%, 100%": { backgroundColor: "transparent" },
          "50%": { backgroundColor: "#F5F6FA" },
        },
        "fade-in-bounce-right": {
          "0%": {
            opacity: 0,
            transform: "translate3d(100%, 0%, 0)",
          },
          "33%": {
            opacity: 0.5,
            transform: "translate3d(0%, 0%, 0)",
          },
          "66%": {
            opacity: 0.7,
            transform: "translate3d(20%, 0%, 0)",
          },
          "100%": {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
          },
        },
        "fade-in-bounce-left": {
          "0%": {
            opacity: 0,
            transform: "translate3d(-100%, 0%, 0)",
          },
          "33%": {
            opacity: 0.5,
            transform: "translate3d(0%, 0%, 0)",
          },
          "66%": {
            opacity: 0.7,
            transform: "translate3d(-20%, 0%, 0)",
          },
          "100%": {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
          },
        },
        "slide-in-down": {
          "0%": {
            opacity: 0.5,
            transform: "translate3d(0, -100%, 0)",
          },
          "100%": {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
          },
        },
        "slide-out-up": {
          "0%": {
            transform: "translate3d(0, 0, 0)",
          },
          "100%": {
            visibility: "hidden",
            transform: "translate3d(0, -100%, 0)",
          },
        },
      },
      animation: {
        flash: "flash 0.5s",
        fadeinbounceright: "fade-in-bounce-right 1s ease-in-out 0.25s 1",
        fadeinbounceleft: "fade-in-bounce-left 1s ease-in-out 0.25s 1",
        slideindown: "1.0s ease-in-out slide-in-down",
        slideoutup: "slide-out-up 1s ease-in-out 0.25s 1",
      },
    },
    minHeight: {
      "real-screen": "calc(100vh - 75px)",
      "real-screen2": "calc(100vh - 50px)",
      "real-screen3": "calc(100vh - 125px)",
      "real-screen4": "calc(100vh - 83.5px)",
    },
    transitionProperty: {
      chats: "all 0.3s ease",
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
