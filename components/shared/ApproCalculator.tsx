"use client";
import { useState } from "react";
import styles from "@/styles/modules/tools.module.scss";

export function ApproCalculator() {
  const [points, setPoints] = useState<{ x: number; y: number }[]>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [results, setResults] = useState<{
    [key: string]: {
      equation: string;
      coefficients: { [key: string]: number };
      correlation: number;
      determination: number;
      approximationError: number;
      mse: number;
      predicted: number[];
    };
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Додавання нової точки
  const addPoint = () => {
    setPoints((prev) => [...prev, { x: 0, y: 0 }]);
    setResults(null);
    setError(null);
  };

  // Видалення останньої точки
  const removePoint = () => {
    if (points.length > 2) {
      setPoints((prev) => prev.slice(0, -1));
      setResults(null);
      setError(null);
    }
  };

  // Оновлення значення точки
  const updatePoint = (index: number, field: "x" | "y", value: string) => {
    const numValue = parseFloat(value) || 0;
    setPoints((prev) => {
      const newPoints = [...prev];
      newPoints[index] = { ...newPoints[index], [field]: numValue };
      return newPoints;
    });
    setResults(null);
    setError(null);
  };

  // Метод найменших квадратів
  const leastSquares = (
    x: number[],
    y: number[],
    degree: number
  ): { coeffs: number[]; mse: number; predicted: number[] } => {
    const n = x.length;
    const A: number[][] = [];
    const b: number[] = [];

    for (let i = 0; i <= degree; i++) {
      A[i] = [];
      for (let j = 0; j <= degree; j++) {
        A[i][j] = 0;
        for (let k = 0; k < n; k++) {
          A[i][j] += Math.pow(x[k], i + j);
        }
      }
      b[i] = 0;
      for (let k = 0; k < n; k++) {
        b[i] += y[k] * Math.pow(x[k], i);
      }
    }

    const coeffs = gaussianElimination(A, b);

    // Прогнозовані значення
    const predicted = x.map((xi) => {
      let yPred = 0;
      for (let j = 0; j <= degree; j++) {
        yPred += coeffs[j] * Math.pow(xi, j);
      }
      return yPred;
    });

    // MSE
    let mse = 0;
    for (let i = 0; i < n; i++) {
      mse += Math.pow(y[i] - predicted[i], 2);
    }
    mse /= n;

    return { coeffs, mse, predicted };
  };

  // Метод Гаусса
  const gaussianElimination = (A: number[][], b: number[]): number[] => {
    const n = b.length;
    const augmented = A.map((row, i) => [...row, b[i]]);

    for (let i = 0; i < n; i++) {
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
          maxRow = k;
        }
      }
      [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];

      for (let k = i + 1; k < n; k++) {
        const c = -augmented[k][i] / augmented[i][i];
        for (let j = i; j <= n; j++) {
          augmented[k][j] += c * augmented[i][j];
        }
      }
    }

    const coeffs = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      coeffs[i] = augmented[i][n] / augmented[i][i];
      for (let k = i - 1; k >= 0; k--) {
        augmented[k][n] -= augmented[k][i] * coeffs[i];
      }
    }
    return coeffs;
  };

  // Обчислення метрик
  const calculateMetrics = (
    y: number[],
    predicted: number[]
  ): {
    correlation: number;
    determination: number;
    approximationError: number;
  } => {
    const n = y.length;
    const yMean = y.reduce((sum, val) => sum + val, 0) / n;

    // Коефіцієнт кореляції (Пірсона)
    let numerator = 0;
    let denom1 = 0;
    let denom2 = 0;
    for (let i = 0; i < n; i++) {
      numerator += (y[i] - yMean) * (predicted[i] - yMean);
      denom1 += Math.pow(y[i] - yMean, 2);
      denom2 += Math.pow(predicted[i] - yMean, 2);
    }
    const correlation = numerator / Math.sqrt(denom1 * denom2) || 0;

    // Коефіцієнт детермінації (R²)
    let ssr = 0;
    let sst = 0;
    for (let i = 0; i < n; i++) {
      ssr += Math.pow(y[i] - predicted[i], 2);
      sst += Math.pow(y[i] - yMean, 2);
    }
    const determination = sst > 0 ? 1 - ssr / sst : 0;

    // Середня помилка апроксимації (%)
    let approximationError = 0;
    for (let i = 0; i < n; i++) {
      if (Math.abs(y[i]) > 0) {
        approximationError +=
          (Math.abs(y[i] - predicted[i]) / Math.abs(y[i])) * 100;
      }
    }
    approximationError /= n;

    return {
      correlation: parseFloat(correlation.toFixed(2)),
      determination: parseFloat(determination.toFixed(2)),
      approximationError: parseFloat(approximationError.toFixed(2)),
    };
  };

  // Розрахунок апроксимацій
  const calculate = () => {
    const x = points.map((p) => p.x);
    const y = points.map((p) => p.y);

    // Валідація
    if (
      x.some((val) => isNaN(val) || val <= 0) ||
      y.some((val) => isNaN(val) || val <= 0)
    ) {
      setError(
        "Усі значення x та y повинні бути більше 0 і не бути порожніми!"
      );
      setResults(null);
      return;
    }
    setError(null);

    const result: typeof results = {};

    // 1. Лінійна регресія
    const linear = leastSquares(x, y, 1);
    const linearMetrics = calculateMetrics(y, linear.predicted);
    result.linear = {
      equation: `y = ${linear.coeffs[1].toFixed(
        2
      )}x + ${linear.coeffs[0].toFixed(2)}`,
      coefficients: { a: linear.coeffs[1], b: linear.coeffs[0] },
      ...linearMetrics,
      mse: linear.mse,
      predicted: linear.predicted,
    };

    // 2. Квадратична регресія
    const quadratic = leastSquares(x, y, 2);
    const quadraticMetrics = calculateMetrics(y, quadratic.predicted);
    result.quadratic = {
      equation: `y = ${quadratic.coeffs[2].toFixed(
        2
      )}x² + ${quadratic.coeffs[1].toFixed(2)}x + ${quadratic.coeffs[0].toFixed(
        2
      )}`,
      coefficients: {
        a: quadratic.coeffs[2],
        b: quadratic.coeffs[1],
        c: quadratic.coeffs[0],
      },
      ...quadraticMetrics,
      mse: quadratic.mse,
      predicted: quadratic.predicted,
    };

    // 3. Кубічна регресія
    const cubic = leastSquares(x, y, 3);
    const cubicMetrics = calculateMetrics(y, cubic.predicted);
    result.cubic = {
      equation: `y = ${cubic.coeffs[3].toFixed(
        2
      )}x³ + ${cubic.coeffs[2].toFixed(2)}x² + ${cubic.coeffs[1].toFixed(
        2
      )}x + ${cubic.coeffs[0].toFixed(2)}`,
      coefficients: {
        a: cubic.coeffs[3],
        b: cubic.coeffs[2],
        c: cubic.coeffs[1],
        d: cubic.coeffs[0],
      },
      ...cubicMetrics,
      mse: cubic.mse,
      predicted: cubic.predicted,
    };

    // 4. Степенева регресія
    const powerX = x.map((val) => Math.log(val));
    const powerY = y.map((val) => Math.log(val));
    const power = leastSquares(powerX, powerY, 1);
    const powerA = Math.exp(power.coeffs[0]);
    const powerPredicted = x.map(
      (xi) => powerA * Math.pow(xi, power.coeffs[1])
    );
    const powerMetrics = calculateMetrics(y, powerPredicted);
    result.power = {
      equation: `y = ${powerA.toFixed(2)} * x^${power.coeffs[1].toFixed(2)}`,
      coefficients: { a: powerA, b: power.coeffs[1] },
      ...powerMetrics,
      mse: power.mse,
      predicted: powerPredicted,
    };

    // 5. Показникова регресія
    const showY = y.map((val) => Math.log(val));
    const show = leastSquares(x, showY, 1);
    const showA = Math.exp(show.coeffs[0]);
    const showB = Math.exp(show.coeffs[1]);
    const showPredicted = x.map((xi) => showA * Math.pow(showB, xi));
    const showMetrics = calculateMetrics(y, showPredicted);
    result.show = {
      equation: `y = ${showA.toFixed(2)} * ${showB.toFixed(2)}^x`,
      coefficients: { a: showA, b: showB },
      ...showMetrics,
      mse: show.mse,
      predicted: showPredicted,
    };

    // 6. Логарифмічна регресія
    const logX = x.map((val) => Math.log(val));
    const log = leastSquares(logX, y, 1);
    const logPredicted = x.map(
      (xi) => log.coeffs[0] + log.coeffs[1] * Math.log(xi)
    );
    const logMetrics = calculateMetrics(y, logPredicted);
    result.logarithmic = {
      equation: `y = ${log.coeffs[0].toFixed(2)} + ${log.coeffs[1].toFixed(
        2
      )} * ln(x)`,
      coefficients: { a: log.coeffs[0], b: log.coeffs[1] },
      ...logMetrics,
      mse: log.mse,
      predicted: logPredicted,
    };

    // 7. Гіперболічна регресія
    const hyperX = x.map((val) => 1 / val);
    const hyper = leastSquares(hyperX, y, 1);
    const hyperPredicted = x.map(
      (xi) => hyper.coeffs[0] + hyper.coeffs[1] / xi
    );
    const hyperMetrics = calculateMetrics(y, hyperPredicted);
    result.hyperbolic = {
      equation: `y = ${hyper.coeffs[0].toFixed(2)} + ${hyper.coeffs[1].toFixed(
        2
      )}/x`,
      coefficients: { a: hyper.coeffs[0], b: hyper.coeffs[1] },
      ...hyperMetrics,
      mse: hyper.mse,
      predicted: hyperPredicted,
    };

    // 8. Експоненціальна регресія
    const expY = y.map((val) => Math.log(val));
    const exp = leastSquares(x, expY, 1);
    const expC = exp.coeffs[0]; // c = ln(a)
    const expB = exp.coeffs[1];
    const expPredicted = x.map((xi) => Math.exp(expC + expB * xi));
    const expMetrics = calculateMetrics(y, expPredicted);
    result.exponential = {
      equation: `y = e^(${expC.toFixed(2)} + ${expB.toFixed(2)}x)`,
      coefficients: { c: expC, b: expB },
      ...expMetrics,
      mse: exp.mse,
      predicted: expPredicted,
    };

    setResults(result);
  };

  // Маппінг назв регресій
  const regressionNames: { [key: string]: string } = {
    linear: "Лінійна регресія",
    quadratic: "Квадратична регресія",
    cubic: "Кубічна регресія",
    power: "Степенева регресія",
    show: "Показникова регресія",
    logarithmic: "Логарифмічна регресія",
    hyperbolic: "Гіперболічна регресія",
    exponential: "Експоненціальна регресія",
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.formulaDisplay}>
        <p>Аппроксимація функції однієї змінної</p>
        <p>1. Лінійна регресія: y = ax + b</p>
        <p>2. Квадратична регресія: y = ax² + bx + c</p>
        <p>3. Кубічна регресія: y = ax³ + bx² + cx + d</p>
        <p>4. Степенева регресія: y = a * x^b</p>
        <p>5. Показникова регресія: y = a * b^x</p>
        <p>6. Логарифмічна регресія: y = a + b * ln(x)</p>
        <p>7. Гіперболічна регресія: y = a + b/x</p>
        <p>8. Експоненціальна регресія: y = e^(c + bx)</p>
      </div>

      <div className={styles.inputs}>
        {points.map((point, index) => (
          <div key={index} className={styles.inputGroup}>
            <label htmlFor={`x${index + 1}`}>
              x<sub>{index + 1}</sub>:
            </label>
            <input
              type="number"
              id={`x${index + 1}`}
              value={point.x === 0 ? "" : point.x}
              onChange={(e) => updatePoint(index, "x", e.target.value)}
              className={styles.input}
              placeholder={`x${index + 1}`}
            />
            <label htmlFor={`y${index + 1}`}>
              y<sub>{index + 1}</sub>:
            </label>
            <input
              type="number"
              id={`y${index + 1}`}
              value={point.y === 0 ? "" : point.y}
              onChange={(e) => updatePoint(index, "y", e.target.value)}
              className={styles.input}
              placeholder={`y${index + 1}`}
            />
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <button onClick={addPoint} className={styles.controlBtn}>
          Додати точку
        </button>
        <button
          onClick={removePoint}
          className={styles.controlBtn}
          disabled={points.length <= 2}
        >
          Прибрати точку
        </button>
        <button onClick={calculate} className={styles.calculateBtn}>
          Розрахувати
        </button>
      </div>

      {error && (
        <div className={styles.results}>
          <p style={{ color: "red" }}>{error}</p>
        </div>
      )}

      {results && !error && (
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className={styles.results}
        >
          <h3>Результати:</h3>
          {Object.entries(results).map(([key, result]) => (
            <div key={key} className={styles.step}>
              <p>
                <strong>{regressionNames[key]}</strong>
              </p>
              <p>{result.equation}</p>
              <p>
                {key === "linear"
                  ? "Коефіцієнт лінійної парної кореляції"
                  : "Коефіцієнт кореляції"}
                : {result.correlation}
              </p>
              <p>Коефіцієнт детермінації: {result.determination}</p>
              <p>Середня помилка апроксимації: {result.approximationError}%</p>
            </div>
          ))}
        </div>
      )}

      {results && !error && (
        <div className={styles.results}>
          <h3>Результати:</h3>
          {Object.entries(results).map(([key, result]) => (
            <div key={key} className={styles.step}>
              <p>
                <strong>{regressionNames[key]}</strong>
              </p>
              <p>{result.equation}</p>
              <p>
                {key === "linear"
                  ? "Коефіцієнт лінійної парної кореляції"
                  : "Коефіцієнт кореляції"}
                : {result.correlation}
              </p>
              <p>Коефіцієнт детермінації: {result.determination}</p>
              <p>Середня помилка апроксимації: {result.approximationError}%</p>
            </div>
          ))}
          <h3>Прогнозовані значення</h3>
          <table className={styles.predictionTable}>
            <thead>
              <tr>
                <th>i</th>
                <th>x</th>
                <th>y</th>
                {Object.keys(regressionNames).map((key) => (
                  <th key={key}>{regressionNames[key]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {points.map((point, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{point.x.toFixed(2)}</td>
                  <td>{point.y.toFixed(2)}</td>
                  {Object.keys(results).map((key) => (
                    <td key={key}>
                      {results[key].predicted[index].toFixed(4)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
