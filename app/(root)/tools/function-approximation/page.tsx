import { ApproCalculator } from "@/components/shared";
import styles from "@/styles/modules/tools.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Апроцимація функції однієї змінної",
  description:
    "Цей калькулятор за введеними даними будує кілька моделей регресії: лінійну, квадратичну, кубічну, степеневу, логарифмічну, гіперболічну, показникову, експоненціальну",
};

export default function FunctionAppRoximation() {
  return (
    <div className={styles.formula}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Апроцимація функції однієї змінної</h1>
          <p>
            Калькулятор використовує методи регресії для апроксимації функції
            однієї змінної.
          </p>
        </div>
      </section>
      <div className={styles.container}>
        <h2>Розрахунок</h2>
        <ApproCalculator />
      </div>
    </div>
  );
}
