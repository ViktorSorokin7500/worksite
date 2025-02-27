"use client";
import { useState } from "react";
import styles from "@/styles/modules/formulas.module.scss";

export default function VariationCoefficientCalculator() {
  const [inputs, setInputs] = useState<number[]>([0, 0]);
  const [results, setResults] = useState<{
    mean: number;
    stdDev: number;
    cv: number;
    steps: {
      sum: number;
      meanCalc: string;
      deviations: { value: number; squared: number }[];
      varianceSum: number;
      variance: number;
      stdDevCalc: string;
      cvCalc: string;
    };
  } | null>(null);

  // Добавление нового инпута
  const addInput = () => {
    setInputs((prev) => [...prev, 0]);
  };

  // Удаление последнего инпута
  const removeInput = () => {
    if (inputs.length > 2) {
      setInputs((prev) => prev.slice(0, -1));
      setResults(null);
    }
  };

  // Обновление значения инпута
  const updateInput = (index: number, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs((prev) => {
      const newInputs = [...prev];
      newInputs[index] = numValue;
      return newInputs;
    });
    setResults(null);
  };

  // Расчёт коэффициента вариации с шагами
  const calculate = () => {
    // 1. Среднее значение (μ) с округлением до 2 знаков
    const sum = inputs.reduce((acc, val) => acc + val, 0);
    const meanRaw = sum / inputs.length; // Неокруглённое значение
    const mean = parseFloat(meanRaw.toFixed(2)); // Округляем до 2 знаков
    const meanCalc = `μ = (${inputs.join(" + ")}) / ${
      inputs.length
    } = ${sum.toFixed(2)} / ${inputs.length} ≈ ${mean.toFixed(2)}`;

    // 2. Выборочная дисперсия и стандартное отклонение (σ) с округлённым mean
    const deviations = inputs.map((val) => {
      const diff = val - mean; // Используем округлённое mean
      return { value: diff, squared: diff * diff };
    });
    const varianceSum = deviations.reduce((acc, dev) => acc + dev.squared, 0);
    const variance = varianceSum / (inputs.length - 1); // Выборочная дисперсия (n-1)
    const stdDev = Math.sqrt(variance);
    const stdDevCalc = `σ = √${varianceSum.toFixed(2)} / ${
      inputs.length - 1
    } ≈ ${stdDev.toFixed(2)}`;

    // 3. Коефіцієнт варіації (CV) с округлённым mean и stdDev
    const cv = (stdDev / mean) * 100;
    const cvCalc = `CV = (${stdDev.toFixed(2)} / ${mean.toFixed(
      2
    )}) × 100 ≈ ${cv.toFixed(2)}%`;

    setResults({
      mean,
      stdDev,
      cv,
      steps: {
        sum,
        meanCalc,
        deviations,
        varianceSum,
        variance,
        stdDevCalc,
        cvCalc,
      },
    });
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.formulaDisplay}>
        <p>Формула: CV = (σ / μ) × 100%</p>
        <p>де σ — стандартне відхилення, μ — середнє значення</p>
      </div>

      <div className={styles.inputs}>
        {inputs.map((value, index) => (
          <input
            key={index}
            type="number"
            value={value === 0 ? "" : value}
            onChange={(e) => updateInput(index, e.target.value)}
            className={styles.input}
            placeholder={`Елемент ${index + 1}`}
          />
        ))}
      </div>

      <div className={styles.controls}>
        <button onClick={addInput} className={styles.controlBtn}>
          Додати значення
        </button>
        <button
          onClick={removeInput}
          className={styles.controlBtn}
          disabled={inputs.length <= 2}
        >
          Прибрати значення
        </button>
        <button onClick={calculate} className={styles.calculateBtn}>
          Розрахувати
        </button>
      </div>

      {results && (
        <div className={styles.results}>
          <h3>Результати:</h3>
          <p>
            1) Середнє значення (μ): <strong>{results.mean.toFixed(2)}</strong>
          </p>
          <div className={styles.step}>
            <p>
              Сума чисел: {inputs.join(" + ")} = {results.steps.sum.toFixed(2)}
            </p>
            <p>Кількість чисел: {inputs.length}</p>
            <p>{results.steps.meanCalc}</p>
          </div>

          <p>
            2) Стандартне відхилення (σ):{" "}
            <strong>{results.stdDev.toFixed(2)}</strong>
          </p>
          <div className={styles.step}>
            <p>Відхилення від середнього та їх квадрати:</p>
            {results.steps.deviations.map((dev, idx) => (
              <p key={idx}>
                {inputs[idx]} - {results.mean.toFixed(2)} ={" "}
                {dev.value.toFixed(2)}, ({dev.value.toFixed(2)})² ={" "}
                {dev.squared.toFixed(2)}
              </p>
            ))}
            <p>
              Сума квадратів відхилень:{" "}
              {results.steps.deviations
                .map((d) => d.squared.toFixed(2))
                .join(" + ")}{" "}
              = {results.steps.varianceSum.toFixed(2)}
            </p>
            <p>
              Дисперсія = {results.steps.varianceSum.toFixed(2)} /{" "}
              {inputs.length - 1} = {results.steps.variance.toFixed(2)}
            </p>
            <p>{results.steps.stdDevCalc}</p>
          </div>

          <p>
            3) Коефіцієнт варіації (CV):{" "}
            <strong>{results.cv.toFixed(2)}%</strong>
          </p>
          <p className={styles.step}>{results.steps.cvCalc}</p>
        </div>
      )}
    </div>
  );
}
