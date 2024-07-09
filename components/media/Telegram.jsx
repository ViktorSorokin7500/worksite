import Link from "next/link";
import { SiTelegram } from "react-icons/si";

export default function Telegram() {
	return (
		<Link href="https://telegram.me/mfvict" target="_blank" title="Telegram">
			<div className="size-10 bg-white rounded flex justify-center items-center">
				<SiTelegram
					className="size-9 fill-blue-500 hover:fill-blue-400"
					aria-label="Telegram"
				/>
			</div>
		</Link>
	);
}
