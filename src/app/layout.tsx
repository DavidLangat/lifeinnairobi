import type { Metadata } from "next";
import Script from "next/script";
import { El_Messiri, Karla } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const elMessiri = El_Messiri({
  variable: "--font-el-messiri",
  subsets: ["latin"],
  display: "swap",
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  display: "swap",
});

const soligant = localFont({
  src: "./fonts/Soligant.ttf",
  variable: "--font-soligant",
  display: "swap",
});

const openSans = localFont({
  src: "./fonts/Open Sans Light.ttf",
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nairobi.life"),
  title: {
    default: "Discover Things to do in Nairobi",
    template: "%s",
  },
  description: "Explore Nairobi like a local",
  applicationName: "Visit Nairobi",
  authors: [{ name: "Visit Nairobi Team" }],
  keywords: ["Nairobi", "Kenya", "Tea Farms", "Limuru", "Things to do", "Travel Guide", "E-bike Tours", "Tea Farm Tours", "Hiking Tours", "Nairobi Activities"],
  referrer: "origin-when-cross-origin",
  appleWebApp: {
    title: "Things to do in Nairobi",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "Discover Things to do in Nairobi",
    description: "Explore Nairobi like a local. ",
    url: "https://nairobi.life",
    siteName: "Things to do in Nairobi",
    locale: "en_KE",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={`${elMessiri.variable} ${karla.variable} ${soligant.variable} ${openSans.variable}`}>

      <body className="antialiased font-sans">
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17909065824"
        />
        <Script id="google-ads-tag">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-17909065824');
            gtag('config', 'G-S2HYP1T4BL');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
