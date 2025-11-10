import type { Metadata } from "next";
import { Inter, Raleway, Dancing_Script } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "./components/ToastProvider";

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

export const metadata: Metadata = {
  title: "Оптовые поставки товаров из Китая под ключ | Доставка по России",
  description: "Выкуп, производство, брендирование, логистика и растаможка товаров из Китая. Опт от 100 000 ₽, совместные закупки от 5 000 ₽. Официальная доставка по всей России.",
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
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
