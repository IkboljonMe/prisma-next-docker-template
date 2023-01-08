import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Alegreya } from "@next/font/google";
import "../styles/globals.css";

// If loading a variable font, you don't need to specify the font weight
const alegreya = Alegreya({
  weight: "600",
  subsets: ["latin"],
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={alegreya.className}>
      <Component {...pageProps} />
    </main>
  );
}
