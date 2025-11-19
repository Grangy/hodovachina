import type { Metadata } from "next";
import { Inter, Raleway, Dancing_Script } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "./components/ToastProvider";
import { ModalProvider } from "./components/ModalProvider";
import RequestModal from "./components/RequestModal";

const inter = Inter({
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Оптовые поставки товаров из Китая под ключ | Доставка по России",
  description: "Выкуп, производство, брендирование, логистика и растаможка товаров из Китая. Опт от 100 000 ₽, совместные закупки от 5 000 ₽. Официальная доставка по всей России.",
  keywords: [
    "оптовые поставки из Китая",
    "товары из Китая",
    "доставка из Китая",
    "растаможка товаров",
    "выкуп товаров",
    "производство в Китае",
    "брендирование товаров",
    "логистика из Китая",
    "совместные закупки",
    "оптовая торговля",
  ],
  authors: [{ name: "Hodova China" }],
  publisher: "Hodova China",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
  themeColor: "#0f172a",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-384x384.png", sizes: "384x384", type: "image/png" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/favicon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/favicon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/favicon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/favicon-76x76.png", sizes: "76x76", type: "image/png" },
      { url: "/favicon-114x114.png", sizes: "114x114", type: "image/png" },
      { url: "/favicon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/favicon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/favicon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/favicon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  other: {
    "msapplication-TileColor": "#0f172a",
    "msapplication-config": "/browserconfig.xml",
  },
  verification: {
    google: "ABu6buNsU68Cz_B8YSLmG6TxKS6V1699Y1xoNaKkx9I",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="overflow-x-hidden" data-theme="monochrome">
      <body
        className={`${inter.variable} ${raleway.variable} ${dancingScript.variable} antialiased overflow-x-hidden`}
      >
        <ToastProvider>
          <ModalProvider>
            {children}
            <RequestModal />
          </ModalProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
