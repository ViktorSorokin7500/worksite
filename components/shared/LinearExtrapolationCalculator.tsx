"use client";
import { useState } from "react";
import styles from "@/styles/modules/tools.module.scss";

export function LinearExtrapolationCalculator() {
  const [inputs, setInputs] = useState({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    x: 0,
  });
  const [results, setResults] = useState<{
    y: number;
    steps: {
      deltaX: number;
      deltaY: number;
      fraction: number;
      deltaYFraction: number;
    };
  } | null>(null);

  // Оновлення значень полів введення
  const updateInput = (field: keyof typeof inputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs((prev) => ({
      ...prev,
      [field]: numValue,
    }));
    setResults(null);
  };

  // Розрахунок лінійної екстраполяції з покроковим поясненням
  const calculate = () => {
    const { x1, y1, x2, y2, x } = inputs;

    // Перевірка умови: x1 ≠ x2
    if (x1 === x2) {
      alert("X₁ не може дорівнювати X₂");
      return;
    }

    // Крок 1: Обчислення різниць між координатами
    const deltaX = x2 - x1; // Різниця між X₂ та X₁
    const deltaY = y2 - y1; // Різниця між Y₂ та Y₁

    // Крок 2: Обчислення частки (X - X₁) / (X₂ - X₁)
    const fraction = (x - x1) / deltaX; // Визначаємо, яку частину відрізка становить (X - X₁)

    // Крок 3: Обчислення приросту Y
    const deltaYFraction = fraction * deltaY; // Множимо частку на різницю Y₂ - Y₁

    // Крок 4: Обчислення кінцевого значення Y
    const y = y1 + deltaYFraction; // Додаємо приріст до Y₁, щоб отримати шукане Y

    setResults({
      y,
      steps: {
        deltaX,
        deltaY,
        fraction,
        deltaYFraction,
      },
    });
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.formulaDisplay}>
        <p>Формула: Y = Y₁ + ((X - X₁) × (Y₂ - Y₁)) / (X₂ - X₁)</p>
        <p>
          де (X₁, Y₁), (X₂, Y₂) — відомі точки, X — задана точка, Y — шукана
          точка
        </p>
      </div>

      <div className={styles.inputs}>
        <div className={styles.inputGroup}>
          <label htmlFor="x1">X₁:</label>
          <input
            type="number"
            id="x1"
            value={inputs.x1 === 0 ? "" : inputs.x1}
            onChange={(e) => updateInput("x1", e.target.value)}
            className={styles.input}
            placeholder="X₁"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="y1">Y₁:</label>
          <input
            type="number"
            id="y1"
            value={inputs.y1 === 0 ? "" : inputs.y1}
            onChange={(e) => updateInput("y1", e.target.value)}
            className={styles.input}
            placeholder="Y₁"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="x2">X₂:</label>
          <input
            type="number"
            id="x2"
            value={inputs.x2 === 0 ? "" : inputs.x2}
            onChange={(e) => updateInput("x2", e.target.value)}
            className={styles.input}
            placeholder="X₂"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="y2">Y₂:</label>
          <input
            type="number"
            id="y2"
            value={inputs.y2 === 0 ? "" : inputs.y2}
            onChange={(e) => updateInput("y2", e.target.value)}
            className={styles.input}
            placeholder="Y₂"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="x">X:</label>
          <input
            type="number"
            id="x"
            value={inputs.x === 0 ? "" : inputs.x}
            onChange={(e) => updateInput("x", e.target.value)}
            className={styles.input}
            placeholder="X"
          />
        </div>
      </div>

      <div className={styles.controls}>
        <button onClick={calculate} className={styles.calculateBtn}>
          Розрахувати
        </button>
      </div>

      {results && (
        <div className={styles.results}>
          <h3>Результати:</h3>
          <p>
            Шукане значення Y: <strong>{results.y.toFixed(2)}</strong>
          </p>
          <div className={styles.step}>
            <p>
              <strong>Крок 1:</strong> Різниця між X₂ та X₁ (ΔX = X₂ - X₁) ={" "}
              {results.steps.deltaX.toFixed(2)}.
              <br />
              Це показує, наскільки X₂ віддалений від X₁ по осі X.
            </p>
            <p>
              <strong>Крок 2:</strong> Різниця між Y₂ та Y₁ (ΔY = Y₂ - Y₁) ={" "}
              {results.steps.deltaY.toFixed(2)}.
              <br />
              Це показує зміну значення Y між двома відомими точками.
            </p>
            <p>
              <strong>Крок 3:</strong> Обчислення частки (X - X₁) / (X₂ - X₁) ={" "}
              {results.steps.fraction.toFixed(2)}.
              <br />
              Ця частка показує, яку частину відрізка між X₁ та X₂ становить
              відстань від X₁ до заданого X.
            </p>
            <p>
              <strong>Крок 4:</strong> Обчислення приросту Y:{" "}
              {results.steps.deltaY.toFixed(2)} ×{" "}
              {results.steps.fraction.toFixed(2)} ={" "}
              {results.steps.deltaYFraction.toFixed(2)}.
              <br />
              Частка множиться на різницю Y₂ - Y₁, щоб визначити, наскільки Y
              змінюється пропорційно.
            </p>
            <p>
              <strong>Крок 5:</strong> Обчислення шуканого Y:{" "}
              {inputs.y1.toFixed(2)} + {results.steps.deltaYFraction.toFixed(2)}{" "}
              = {results.y.toFixed(2)}
              <br />
              Приріст додається до Y₁, щоб отримати кінцеве значення Y.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
