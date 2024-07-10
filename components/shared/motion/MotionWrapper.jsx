"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const MotionWrapper = ({ children, className }) => {
	const [isTransitioning, setIsTransitioning] = useState(false);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: {
					delay: 1.6,
					duration: 0.6,
					ease: "easeIn",
					onStart: () => setIsTransitioning(true),
					onComplete: () => setIsTransitioning(false),
				},
			}}
			className={className}>
			{!isTransitioning && children}
		</motion.div>
	);
};

export default MotionWrapper;
