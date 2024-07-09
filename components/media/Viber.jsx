import Link from "next/link";
import { FaViber } from "react-icons/fa";

export default function Viber() {
	return (
		<Link
			href="viber://chat?number=%2B380505392048"
			target="_blank"
			title="Viber">
			<div className="size-10 bg-purple-700 hover:bg-purple-600 rounded flex justify-center items-center">
				<FaViber className="size-9 fill-white" aria-label="Viber" />
			</div>
		</Link>
	);
}
