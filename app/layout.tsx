import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "../styles/global.scss";
import Script from "next/script";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["700"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: {
    default: "Оцінка Майна | Sorokin",
    template: "%s | Sorokin",
  },
  description:
    "Незалежна оцінка нерухомості, авто, обладнання та збитків від агресії РФ",
  keywords:
    "оцінка, оцінка майна, оцінка збитків, оцінювач, оцінка пошкоджень, оцінка зруйнованого майна, оценка, оценка имущества, оценка убытков, оценщик, оценка повреждений, оценка разрушенного имущества",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.sorokinsv.com",
  },
  openGraph: {
    title: "Оцінка | Сорокін",
    description:
      "Професійні послуги з оцінки майна та збитків в Україні. Консультації &#9742; +380505392048 щоденно",
    url: "sorokinsv.com",
    type: "website",
    images: [
      {
        url: "https://cdn.pixabay.com/photo/2022/06/29/11/26/ukraine-7291492_1280.png",
        width: 800,
        height: 600,
        alt: "Image Alt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Контакти | Сорокін",
    description:
      "Зв'яжіться з нами для професійної оцінки майна та збитків. Ми надаємо експертні послуги з оцінки пошкоджень та зруйнованого майна.",
  },
};

export function generateViewport() {
  return "width=device-width, initial-scale=1";
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        <meta name="google-adsense-account" content="ca-pub-9487098491268165" />
        <meta name="revisit-after" content="1 days" />

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-8P9PC1S6YX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
			
			// Google Analytics ID
			gtag('config', 'G-8P9PC1S6YX');
			
			// Google Ads Conversion ID
			gtag('config', 'AW-16650489971');
		  `}
        </Script>

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9487098491268165"
          crossOrigin="anonymous"
        />

        <Script id="google-ads-conversion" strategy="afterInteractive">
          {`gtag('event', 'conversion', {'send_to': 'AW-16650489971/KlCFCJWIm8YZEPOgyYM-'});`}
        </Script>
      </head>
      <body className={`${montserrat.className} ${roboto.className}`}>
        {children}
      </body>
    </html>
  );
}
