import "../styles/globals.css";
import localFont from "next/font/local";

const basierCircle = localFont({
  src: [
    {
      path: "./../../public/fonts/BasierCircle-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./../../public/fonts/BasierCircle-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./../../public/fonts/BasierCircle-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./../../public/fonts/BasierCircle-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./../../public/fonts/BasierCircle-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./../../public/fonts/BasierCircle-SemiBoldItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./../../public/fonts/BasierCircle-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./../../public/fonts/BasierCircle-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-basier-circle",
});

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <main className={`${basierCircle.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}
