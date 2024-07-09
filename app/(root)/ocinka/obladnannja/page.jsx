import MotionWrapper from "@/components/shared/motion/MotionWrapper";
import TabsSection from "@/components/shared/pages/TabsSection";
import { obladnannyaInfo } from "@/lib/data";

const Obladnanny = () => {
	return (
		<section className="container mx-auto w-screen">
			<MotionWrapper>
				<h1 className="h1 text-center mb-4 lg:mb-8">Оцінка Обладнання</h1>
				<TabsSection info={obladnannyaInfo} />
			</MotionWrapper>
		</section>
	);
};

export default Obladnanny;
