import { ServicePage } from "@/components/shared";
import { ktzInfo } from "@/lib/data.js";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "КТЗ",
  description: "Оцінка колісних транспортних засобів (КТЗ) для різних потреб",
};

export default function KTZ() {
  return (
    <ServicePage
      title="Оцінка КТЗ"
      shortDesc="Ринкова вартість транспорту для угод чи податків"
      sections={ktzInfo}
    />
  );
}
