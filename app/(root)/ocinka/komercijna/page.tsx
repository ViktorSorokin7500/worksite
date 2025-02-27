import { ServicePage } from "@/components/shared";
import { komercInfo } from "@/lib/data.js";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Комерційне майно",
  description: "Оцінка комерційного майна для бізнесу та інвестицій",
};

export default function Komercija() {
  return (
    <ServicePage
      title="Оцінка комерційної нерухомості"
      shortDesc="Вартість для бізнесу, обліку чи податків"
      sections={komercInfo}
    />
  );
}
