import { ServicePage } from "@/components/shared";
import { obladnannyaInfo } from "@/lib/data.js";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Обладнання",
  description: "Професійна оцінка обладнання для бізнесу та промисловості",
};

export default function Obladnannja() {
  return (
    <ServicePage
      title="Оцінка обладнання"
      shortDesc="Вартість для угод, кредитів чи ліквідації"
      sections={obladnannyaInfo}
    />
  );
}
