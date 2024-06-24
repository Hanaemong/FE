/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx}"],
  safelist: ["bg-[#EBEBEB]", "bg-[#9E9E9E]"],
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
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to bottom right, #3bbfb2 5%, #5cbbd9 33%, #884cc5 70%, #de3bba 99%)",
        "custom-light-gradient":
          "linear-gradient(to bottom right,rgba(59, 191, 178, 0.4) 5%,rgba(92, 187, 217, 0.4) 33%, rgba(136, 76, 197, 0.4) 70%,rgba(222, 59, 186, 0.4) 99%)",
      },
    },
    minHeight: {
      "real-screen": "calc(100vh - 75px)",
      "real-screen2": "calc(100vh - 50px)",
      "real-screen3": "calc(100vh - 125px)",
    },
  },
  plugins: [],
};
