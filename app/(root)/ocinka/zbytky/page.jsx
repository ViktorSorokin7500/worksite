import MotionWrapper from "@/components/shared/motion/MotionWrapper";
import TabsSection from "@/components/shared/pages/TabsSection";
import { zbytkyInfo } from "@/lib/data";

const Zbytky = () => {
	return (
		<section className="container mx-auto w-screen">
			<MotionWrapper>
				<h1 className="h1 text-center mb-4 lg:mb-8">Оцінка збитків</h1>
				<TabsSection info={zbytkyInfo} />
			</MotionWrapper>
		</section>
	);
};

export default Zbytky;
