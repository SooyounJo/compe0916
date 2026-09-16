import { Doto, Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "300"],
  variable: "--font-haas",
});

const doto = Doto({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-doto",
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${inter.variable} ${doto.variable} font-haas antialiased`}>
      <Component {...pageProps} />
    </div>
  );
}
