"use client";
import { useSwiper } from "swiper/react";
import { Button } from "../ui/button";

import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

const ItemSliderBtn = () => {
	const swiper = useSwiper();
	return (
		<div className="flex absolute right--2px] left-0 bottom-[calc(50%_-_22px)] z-20 w-full justify-between">
			<Button
				className="bg-accent hover:bg-accent-hover text-primary"
				onClick={() => swiper.slidePrev()}>
				<PiCaretLeftBold />
			</Button>
			<Button
				className="bg-accent hover:bg-accent-hover text-primary"
				onClick={() => swiper.slideNext()}>
				<PiCaretRightBold />
			</Button>
		</div>
	);
};

export default ItemSliderBtn;
