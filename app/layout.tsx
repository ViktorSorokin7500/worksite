import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "../styles/global.scss";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["700"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: {
    default: "Оцінка Майна | Sorokin",
    template: "%s | Sorokin",
  },
  description:
    "Незалежна оцінка нерухомості, авто, обладнання та збитків від агресії РФ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${montserrat.className} ${roboto.className}`}>
        {children}
      </body>
    </html>
  );
}
