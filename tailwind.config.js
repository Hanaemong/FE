/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx}"],
  //   safelist: [
  //     "bg-[#28B2A5]",
  //     "bg-[#E90061]",
  //     "bg-[#FFC700]",
  //     "bg-[#AD9A5F]",
  //     "bg-[#B5B5B5]",
  //     "bg-[#9BDEDF]",
  //     "bg-[#5CB6B7]",
  //     "bg-[#FFB2B7]",
  //     "bg-[#F2777E]",
  //     "bg-[#9CDAB8]",
  //     "bg-[#74BE96]",
  //   ],
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
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to bottom right, #3bbfb2 5%, #5cbbd9 33%, #884cc5 70%, #de3bba 99%)",
      },
    },
    minHeight: {
      "real-screen": "calc(100vh - 100px)",
      //     'real-screen2': 'calc(100vh - 50px)',
      //     'real-screen3': 'calc(100vh - 150px)',
    },
  },
  plugins: [],
};
