"use client";
import Link from "next/link";
import { useState, useEffect, JSX } from "react";
import styles from "@/styles/modules/service.module.scss";

interface Subsection {
  title: string;
  desc: string;
}

interface Section {
  title: string;
  value: string;
  container: Subsection[];
}

interface ServicePageProps {
  title: string;
  shortDesc: string;
  sections: Section[];
}

export const ServicePage = ({
  title,
  shortDesc,
  sections,
}: ServicePageProps) => {
  const [activeTab, setActiveTab] = useState(sections[0].value);
  const [particles, setParticles] = useState<JSX.Element[]>([]); // Массив частиц

  useEffect(() => {
    // Инициализируем с 30 частицами
    const initialParticles = Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={styles.particle}
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDuration: `${10 + Math.random() * 5}s`,
          animationDelay: `${Math.random() * 3}s`,
        }}
      />
    ));
    setParticles(initialParticles);

    // Добавляем по 5 частиц каждую секунду до 150
    const interval = setInterval(() => {
      setParticles((prev) => {
        if (prev.length < 1250) {
          const newParticles = Array.from({ length: 3 }, (_, index) => (
            <span
              key={prev.length + index} // Уникальный ключ для новых частиц
              className={styles.particle}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${5 + Math.random() * 5}s`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ));
          return [...prev, ...newParticles]; // Добавляем новые к существующим
        }
        return prev; // Останавливаем на 150
      });
    }, 1000); // Каждую секунду

    // Очистка интервала при размонтировании
    return () => clearInterval(interval);
  }, []); // Запускается один раз при монтировании

  return (
    <div className={styles.servicePage}>
      {/* Герой */}
      <section className={styles.hero}>
        <div className={styles.particles}>{particles}</div>
        <div className={styles.heroContent}>
          <h1>{title}</h1>
          <p>{shortDesc}</p>
          <Link href="/contacts" className={styles.cta}>
            Замовити оцінку
          </Link>
        </div>
      </section>

      {/* Табы и контент */}
      <div className={styles.container}>
        <div className={styles.tabs}>
          {sections.map((section) => (
            <button
              key={section.value}
              className={`${styles.tab} ${
                activeTab === section.value ? styles.active : ""
              }`}
              onClick={() => setActiveTab(section.value)}
            >
              {section.title}
            </button>
          ))}
        </div>

        <div className={styles.content}>
          {sections.map(
            (section) =>
              activeTab === section.value && (
                <table key={section.value} className={styles.table}>
                  <thead>
                    <tr>
                      <th>Назва</th>
                      <th>Опис</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.container.map((item) => (
                      <tr key={item.title}>
                        <td>{item.title}</td>
                        <td>{item.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
          )}
        </div>
      </div>

      {/* Призыв */}
      <section className={styles.call}>
        <h2>Готові оцінити?</h2>
        <p>Зв’яжіться з нами для швидкої та точної оцінки</p>
        <Link href="/contacts" className={styles.cta}>
          Зв’язатись зараз
        </Link>
      </section>
    </div>
  );
};
