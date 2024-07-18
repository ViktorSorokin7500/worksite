import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import PageTransition from "@/components/shared/PageTransition";
import StairTransition from "@/components/shared/StairTransition";
import Footer from "@/components/shared/Footer";
import Script from "next/script";

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	weidth: ["100", "200", "300", "400", "500", "600", "700", "800"],
	variable: "--font-jetbrainsMono",
});

export const metadata = {
	title: {
		template: "%s | Сорокін",
		default: "Оцінка | Сорокін",
	},
	description:
		"Професійні послуги з оцінки майна та збитків в Україні. Визначення ринкової вартості нерухомості, транспорту та обладнання з високою точністю і об'єктивністю.",
	keywords:
		"оцінка, оцінка майна, оцінка збитків, оцінювач, оцінка пошкоджень, оцінка зруйнованого майна, оценка, оценка имущества, оценка убытков, оценщик, оценка повреждений, оценка разрушенного имущества",
	robots: "index, follow",
	alternates: {
		canonical: "https://www.sorokinsv.com",
	},
	openGraph: {
		title: "Оцінка | Сорокін",
		description:
			"Професійні послуги з оцінки майна та збитків в Україні. Визначення ринкової вартості нерухомості, транспорту та обладнання з високою точністю і об'єктивністю.",
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
		image:
			"https://cdn.pixabay.com/photo/2022/06/29/11/26/ukraine-7291492_1280.png",
	},
	lang: "uk-UA",
};

export function generateViewport() {
	return "width=device-width, initial-scale=1";
}

export default function RootLayout({ children }) {
	return (
		<html lang="uk">
			<head>
				<meta
					name="google-adsense-account"
					content="ca-pub-9487098491268165"></meta>
				<Script
					async
					src="https://www.googletagmanager.com/gtag/js?id=G-8P9PC1S6YX"
					strategy="afterInteractive"
				/>
				<Script id="google-analytics" strategy="afterInteractive">
					{`window.dataLayer = window.dataLayer || [];
					  function gtag(){dataLayer.push(arguments);}
					  gtag('js', new Date());
					
					  gtag('config', 'G-8P9PC1S6YX');`}
				</Script>
				<Script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9487098491268165"
					crossOrigin="anonymous"
				/>
			</head>
			<body className={`${jetbrainsMono.variable} flex flex-col min-h-screen`}>
				<Header />
				<div className="flex-1 flex justify-center items-center">
					<StairTransition />
					<PageTransition>{children}</PageTransition>
				</div>
				<Footer />
			</body>
		</html>
	);
}
