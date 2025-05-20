import { LinearExtrapolationCalculator } from "@/components/shared";
import styles from "@/styles/modules/tools.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Лінійна екстраполяція",
  description: "Розрахунок лінійної екстраполяції для оцінки",
};

export default function VariationCoefficientExtrapolation() {
  return (
    <div className={styles.formula}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Лінійна екстраполяція</h1>
          <p>
            Метод прогнозування значень функції за межами відомих даних,
            використовуючи припущення, що ця функція продовжує змінюватися
            лінійно.
          </p>
        </div>
      </section>
      <div className={styles.container}>
        <h2>Розрахунок</h2>
        <LinearExtrapolationCalculator />
      </div>
    </div>
  );
}
