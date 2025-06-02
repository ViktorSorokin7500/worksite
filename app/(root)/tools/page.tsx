import Link from "next/link";
import styles from "@/styles/modules/tools.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Інструменти оцінювача",
  description: "Професійні інструменти для оцінки майна та збитків",
};

const formulas = [
  { id: "variation-coefficient", title: "Коефіцієнт варіації" },
  { id: "linear-interpolation", title: "Лінійна інтерполяція" },
  { id: "linear-extrapolation", title: "Лінійна екстраполяція" },
  { id: "function-approximation", title: "Апроцимація функції однієї змінної" },
  {
    id: "function-approximation-two",
    title: "Апроцимація функції двох змінних",
  },
  {
    id: "function-approximation-three",
    title: "Апроцимація функції трьох змінних",
  },
];

export default function Formulas() {
  return (
    <div className={styles.formulas}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Інструменти для оцінювачів</h1>
          <p>Ознайомтесь з професійними інструментами для оцінки</p>
        </div>
      </section>

      <div className={styles.container}>
        <div className={styles.grid}>
          <Link href={`/tools/sort-photo`} className={styles.card}>
            <h3>Створення горизонтального фотозвіту</h3>
          </Link>
          <Link href={`/tools/sort-photo-vertical`} className={styles.card}>
            <h3>Створення вертикального фотозвіту</h3>
          </Link>
        </div>

        <h2>Доступні формули</h2>
        <div className={styles.grid}>
          {formulas.map((formula, index) => (
            <Link
              key={formula.id}
              href={`/tools/${formula.id}`}
              className={styles.card}
              style={
                index === formulas.length - 1
                  ? {
                      pointerEvents: "none",
                      opacity: 0.5,
                      cursor: "not-allowed",
                    }
                  : {}
              }
            >
              <h3>{formula.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
