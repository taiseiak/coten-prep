/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "slide-out-fwd-center":
          "slide-out-fwd-center 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both",
        "slide-out-top":
          "slide-out-top 200ms cubic-bezier(0.550, 0.085, 0.680, 0.530) 1s both",
      },
      keyframes: {
        "slide-out-fwd-center": {
          "0%": {
            transform: "translateZ(1)",
            opacity: 1,
          },
          "100%": {
            transform: "translateZ(600px)",
            opacity: 0,
          },
        },
        "slide-out-top": {
          "0%": {
            transform: "translateY(0)",
            opacity: 1,
          },
          "100%": {
            transform: "translateY(100%)",
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [],
};
