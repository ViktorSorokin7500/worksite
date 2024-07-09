import MotionWrapper from "@/components/shared/motion/MotionWrapper";
import TabsSection from "@/components/shared/pages/TabsSection";
import { ktzInfo } from "@/lib/data";

const KTZ = () => {
	return (
		<section className="container mx-auto w-screen">
			<MotionWrapper>
				<h1 className="h1 text-center mb-4 lg:mb-8">
					Оцінка Колісно-Транспортних засобів
				</h1>
				<TabsSection info={ktzInfo} />
			</MotionWrapper>
		</section>
	);
};

export default KTZ;
