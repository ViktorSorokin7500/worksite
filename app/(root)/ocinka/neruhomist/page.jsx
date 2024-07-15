import MotionWrapper from "@/components/shared/motion/MotionWrapper";
import TabsSection from "@/components/shared/pages/TabsSection";
import { neruhomistInfo } from "@/lib/data";

export const metadata = {
	title: "Оцінка Житлової Нерухомості",
	description:
		"Оцінка нерухомості допомагає визначити ринкову вартість перед продажем, покупкою або для отримання іпотеки. Це також важливо для юридичних процедур, таких як спадщина або розподіл майна, а також для судових справ.",
	keywords:
		"оцінка, оцінка житлової нерухомості, оцінка нерухомості, ринкова вартість нерухомості, оцінка квартир, оцінка будинків, оцінювач нерухомості",
	alternates: {
		canonical: "https://sorokinsv.com/ocinka/neruhomist",
	},
	openGraph: {
		title: "Оцінка Житлової Нерухомості | Сорокін",
		description:
			"Оцінка нерухомості допомагає визначити ринкову вартість перед продажем, покупкою або для отримання іпотеки. Це також важливо для юридичних процедур, таких як спадщина або розподіл майна, а також для судових справ.",
		url: "https://sorokinsv.com/ocinka/neruhomist",
		type: "website",
		images: [
			{
				url: "https://cdn.pixabay.com/photo/2022/06/29/11/26/ukraine-7291492_1280.png",
				width: 800,
				height: 600,
				alt: "Зображення України",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Оцінка Житлової Нерухомості | Сорокін",
		description:
			"Оцінка нерухомості допомагає визначити ринкову вартість перед продажем, покупкою або для отримання іпотеки. Це також важливо для юридичних процедур, таких як спадщина або розподіл майна, а також для судових справ.",
		image:
			"https://cdn.pixabay.com/photo/2022/06/29/11/26/ukraine-7291492_1280.png",
	},
	lang: "uk-UA",
};

const Neruhomist = () => {
	return (
		<section className="container mx-auto w-screen">
			<MotionWrapper>
				<h1 className="h1 text-center mb-4 lg:mb-8">
					Оцінка Житлової Нерухомості
				</h1>
				<TabsSection info={neruhomistInfo} />
			</MotionWrapper>
		</section>
	);
};

export default Neruhomist;
