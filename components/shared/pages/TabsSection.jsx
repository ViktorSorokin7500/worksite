import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MotionWrapper from "../motion/MotionWrapper";

const TabsSection = ({ info }) => {
	return (
		<Tabs
			defaultValue="first"
			className="flex flex-col lg:flex-row gap-4 lg:gap-8">
			<TabsList className="flex flex-row flex-wrap lg:flex-col justify-center lg:justify-start mx-auto lg:mx-0 gap-4 lg:gap-8">
				{info.map((item, i) => (
					<TabsTrigger className="w-full lg:w-72" key={i} value={item.value}>
						{item.title}
					</TabsTrigger>
				))}
			</TabsList>

			{info.map((item, i) => (
				<TabsContent value={item.value} key={i}>
					<ScrollArea className="h-[768px]">
						<ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{item.container.map((text, i) => (
								<li
									className="bg-[#232329] h-72 xl:h-60 p-3 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1 group"
									key={i}>
									<h3 className="h3 flex mx-auto text-center text-accent-hover group-hover:text-accent">
										{text.title}
									</h3>
									<p className="mx-auto text-justify text-white/60 group-hover:text-white/80">
										{text.desc}
									</p>
								</li>
							))}
						</ul>
					</ScrollArea>
				</TabsContent>
			))}
		</Tabs>
	);
};

export default TabsSection;
