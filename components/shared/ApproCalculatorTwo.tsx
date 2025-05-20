"use client";
import { useState } from "react";
import styles from "@/styles/modules/tools.module.scss";
import { FormulasInterpretation } from "./FormulasInterpretation";

export function ApproCalculatorTwo() {
  // Точки: y може бути null для прогнозованих точок
  const [points, setPoints] = useState<
    { xa: number; xb: number; y: number | null }[]
  >([
    { xa: 0, xb: 0, y: 0 },
    { xa: 0, xb: 0, y: 0 },
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
  const [showFormulas, setShowFormulas] = useState<boolean>(false);

  // Додавання нової точки
  const addPoint = () => {
    setPoints((prev) => [...prev, { xa: 0, xb: 0, y: null }]);
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
  const updatePoint = (
    index: number,
    field: "xa" | "xb" | "y",
    value: string
  ) => {
    const numValue =
      value === "" ? (field === "y" ? null : 0) : parseFloat(value) || 0;
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
    xa: number[],
    xb: number[],
    y: number[],
    type: string
  ): {
    coeffs: number[];
    mse: number;
    predicted: number[];
    extraParams?: { [key: string]: number };
  } => {
    let A: number[][] = [];
    let b: number[] = [];
    const n = xa.length;
    let transformedXa = xa;
    let transformedXb = xb;
    let transformedY = y;
    let coeffs: number[] = [];
    const extraParams: { [key: string]: number } = {};

    if (type === "linear") {
      A = [
        [n, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      b = [0, 0, 0];
      for (let i = 0; i < n; i++) {
        A[0][1] += xa[i];
        A[0][2] += xb[i];
        A[1][0] += xa[i];
        A[1][1] += xa[i] * xa[i];
        A[1][2] += xa[i] * xb[i];
        A[2][0] += xb[i];
        A[2][1] += xb[i] * xa[i];
        A[2][2] += xb[i] * xb[i];
        b[0] += y[i];
        b[1] += y[i] * xa[i];
        b[2] += y[i] * xb[i];
      }
      coeffs = gaussianElimination(A, b);
    } else if (type === "quadratic") {
      A = Array(6)
        .fill(0)
        .map(() => Array(6).fill(0));
      b = Array(6).fill(0);
      for (let i = 0; i < n; i++) {
        A[0][0] += 1;
        A[0][1] += xa[i];
        A[0][2] += xb[i];
        A[0][3] += xa[i] * xa[i];
        A[0][4] += xb[i] * xb[i];
        A[0][5] += xa[i] * xb[i];
        A[1][1] += xa[i] * xa[i];
        A[1][3] += xa[i] * xa[i] * xa[i];
        A[1][5] += xa[i] * xa[i] * xb[i];
        A[2][2] += xb[i] * xb[i];
        A[2][4] += xb[i] * xb[i] * xb[i];
        A[2][5] += xa[i] * xb[i] * xb[i];
        A[3][3] += xa[i] * xa[i] * xa[i] * xa[i];
        A[4][4] += xb[i] * xb[i] * xb[i] * xb[i];
        A[5][5] += xa[i] * xb[i] * xa[i] * xb[i];
        b[0] += y[i];
        b[1] += y[i] * xa[i];
        b[2] += y[i] * xb[i];
        b[3] += y[i] * xa[i] * xa[i];
        b[4] += y[i] * xb[i] * xb[i];
        b[5] += y[i] * xa[i] * xb[i];
      }
      for (let i = 0; i < 6; i++) {
        for (let j = i + 1; j < 6; j++) {
          A[j][i] = A[i][j];
        }
      }
      coeffs = gaussianElimination(A, b);
    } else if (type === "cubic") {
      A = Array(10)
        .fill(0)
        .map(() => Array(10).fill(0));
      b = Array(10).fill(0);
      for (let i = 0; i < n; i++) {
        A[0][0] += 1;
        A[0][1] += xa[i];
        A[0][2] += xb[i];
        A[0][3] += xa[i] * xa[i];
        A[0][4] += xb[i] * xb[i];
        A[0][5] += xa[i] * xb[i];
        A[0][6] += xa[i] * xa[i] * xa[i];
        A[0][7] += xb[i] * xb[i] * xb[i];
        A[0][8] += xa[i] * xa[i] * xb[i];
        A[0][9] += xa[i] * xb[i] * xb[i];
        b[0] += y[i];
        b[1] += y[i] * xa[i];
        b[2] += y[i] * xb[i];
        b[3] += y[i] * xa[i] * xa[i];
        b[4] += y[i] * xb[i] * xb[i];
        b[5] += y[i] * xa[i] * xb[i];
        b[6] += y[i] * xa[i] * xa[i] * xa[i];
        b[7] += y[i] * xb[i] * xb[i] * xb[i];
        b[8] += y[i] * xa[i] * xa[i] * xb[i];
        b[9] += y[i] * xa[i] * xb[i] * xb[i];
      }
      for (let i = 0; i < 10; i++) {
        for (let j = i + 1; j < 10; j++) {
          A[j][i] = A[i][j];
        }
      }
      coeffs = gaussianElimination(A, b);
    } else if (type === "power") {
      transformedXa = xa.map((val) => Math.log(val));
      transformedXb = xb.map((val) => Math.log(val));
      transformedY = y.map((val) => Math.log(val));
      A = [
        [n, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      b = [0, 0, 0];
      for (let i = 0; i < n; i++) {
        A[0][1] += transformedXa[i];
        A[0][2] += transformedXb[i];
        A[1][0] += transformedXa[i];
        A[1][1] += transformedXa[i] * transformedXa[i];
        A[1][2] += transformedXa[i] * transformedXb[i];
        A[2][0] += transformedXb[i];
        A[2][1] += transformedXb[i] * transformedXa[i];
        A[2][2] += transformedXb[i] * transformedXb[i];
        b[0] += transformedY[i];
        b[1] += transformedY[i] * transformedXa[i];
        b[2] += transformedY[i] * transformedXb[i];
      }
      coeffs = gaussianElimination(A, b);
      extraParams.a = Math.exp(coeffs[0]);
    } else if (type === "show") {
      transformedY = y.map((val) => Math.log(val));
      A = [
        [n, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      b = [0, 0, 0];
      for (let i = 0; i < n; i++) {
        A[0][1] += xa[i];
        A[0][2] += xb[i];
        A[1][0] += xa[i];
        A[1][1] += xa[i] * xa[i];
        A[1][2] += xa[i] * xb[i];
        A[2][0] += xb[i];
        A[2][1] += xb[i] * xa[i];
        A[2][2] += xb[i] * xb[i];
        b[0] += transformedY[i];
        b[1] += transformedY[i] * xa[i];
        b[2] += transformedY[i] * xb[i];
      }
      coeffs = gaussianElimination(A, b);
      extraParams.a = Math.exp(coeffs[0]);
      extraParams.b = Math.exp(coeffs[1]);
      extraParams.c = Math.exp(coeffs[2]);
    } else if (type === "logarithmic") {
      transformedXa = xa.map((val) => Math.log(val));
      transformedXb = xb.map((val) => Math.log(val));
      A = [
        [n, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      b = [0, 0, 0];
      for (let i = 0; i < n; i++) {
        A[0][1] += transformedXa[i];
        A[0][2] += transformedXb[i];
        A[1][0] += transformedXa[i];
        A[1][1] += transformedXa[i] * transformedXa[i];
        A[1][2] += transformedXa[i] * transformedXb[i];
        A[2][0] += transformedXb[i];
        A[2][1] += transformedXb[i] * transformedXa[i];
        A[2][2] += transformedXb[i] * transformedXb[i];
        b[0] += y[i];
        b[1] += y[i] * transformedXa[i];
        b[2] += y[i] * transformedXb[i];
      }
      coeffs = gaussianElimination(A, b);
    } else if (type === "hyperbolic") {
      transformedXa = xa.map((val) => 1 / val);
      transformedXb = xb.map((val) => 1 / val);
      A = [
        [n, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      b = [0, 0, 0];
      for (let i = 0; i < n; i++) {
        A[0][1] += transformedXa[i];
        A[0][2] += transformedXb[i];
        A[1][0] += transformedXa[i];
        A[1][1] += transformedXa[i] * transformedXa[i];
        A[1][2] += transformedXa[i] * transformedXb[i];
        A[2][0] += transformedXb[i];
        A[2][1] += transformedXb[i] * transformedXa[i];
        A[2][2] += transformedXb[i] * transformedXb[i];
        b[0] += y[i];
        b[1] += y[i] * transformedXa[i];
        b[2] += y[i] * transformedXb[i];
      }
      coeffs = gaussianElimination(A, b);
    } else if (type === "exponential") {
      transformedY = y.map((val) => Math.log(val));
      A = [
        [n, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      b = [0, 0, 0];
      for (let i = 0; i < n; i++) {
        A[0][1] += xa[i];
        A[0][2] += xb[i];
        A[1][0] += xa[i];
        A[1][1] += xa[i] * xa[i];
        A[1][2] += xa[i] * xb[i];
        A[2][0] += xb[i];
        A[2][1] += xb[i] * xa[i];
        A[2][2] += xb[i] * xb[i];
        b[0] += transformedY[i];
        b[1] += transformedY[i] * xa[i];
        b[2] += transformedY[i] * xb[i];
      }
      coeffs = gaussianElimination(A, b);
    }

    // Прогнозовані значення
    const predicted = xa.map((xai, i) =>
      predictY(xai, xb[i], coeffs, type, extraParams)
    );

    // MSE
    let mse = 0;
    for (let i = 0; i < n; i++) {
      mse += Math.pow(y[i] - predicted[i], 2);
    }
    mse /= n;

    return { coeffs, mse, predicted, extraParams };
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

    let numerator = 0;
    let denom1 = 0;
    let denom2 = 0;
    for (let i = 0; i < n; i++) {
      numerator += (y[i] - yMean) * (predicted[i] - yMean);
      denom1 += Math.pow(y[i] - yMean, 2);
      denom2 += Math.pow(predicted[i] - yMean, 2);
    }
    const correlation = numerator / Math.sqrt(denom1 * denom2) || 0;

    let ssr = 0;
    let sst = 0;
    for (let i = 0; i < n; i++) {
      ssr += Math.pow(y[i] - predicted[i], 2);
      sst += Math.pow(y[i] - yMean, 2);
    }
    const determination = sst > 0 ? 1 - ssr / sst : 0;

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

  // Передбачення y
  const predictY = (
    xa: number,
    xb: number,
    coeffs: number[],
    type: string,
    extraParams?: { [key: string]: number }
  ) => {
    if (type === "linear") {
      return coeffs[0] + coeffs[1] * xa + coeffs[2] * xb;
    } else if (type === "quadratic") {
      return (
        coeffs[0] +
        coeffs[1] * xa +
        coeffs[2] * xb +
        coeffs[3] * xa * xa +
        coeffs[4] * xb * xb +
        coeffs[5] * xa * xb
      );
    } else if (type === "cubic") {
      return (
        coeffs[0] +
        coeffs[1] * xa +
        coeffs[2] * xb +
        coeffs[3] * xa * xa +
        coeffs[4] * xb * xb +
        coeffs[5] * xa * xb +
        coeffs[6] * xa * xa * xa +
        coeffs[7] * xb * xb * xb +
        coeffs[8] * xa * xa * xb +
        coeffs[9] * xa * xb * xb
      );
    } else if (type === "power") {
      return (
        extraParams!.a! * Math.pow(xa, coeffs[1]) * Math.pow(xb, coeffs[2])
      );
    } else if (type === "show") {
      return (
        extraParams!.a! *
        Math.pow(extraParams!.b!, xa) *
        Math.pow(extraParams!.c!, xb)
      );
    } else if (type === "logarithmic") {
      return coeffs[0] + coeffs[1] * Math.log(xa) + coeffs[2] * Math.log(xb);
    } else if (type === "hyperbolic") {
      return coeffs[0] + coeffs[1] / xa + coeffs[2] / xb;
    } else if (type === "exponential") {
      return Math.exp(coeffs[0] + coeffs[1] * xa + coeffs[2] * xb);
    }
    return 0;
  };

  // Розрахунок апроксимацій
  const calculate = () => {
    const validPoints = points.filter((p) => p.y !== null) as {
      xa: number;
      xb: number;
      y: number;
    }[];
    const xa = validPoints.map((p) => p.xa);
    const xb = validPoints.map((p) => p.xb);
    const y = validPoints.map((p) => p.y);

    // Валідація
    if (validPoints.length < 3) {
      setError("Потрібно щонайменше 3 точки з xa, xb та y для розрахунку!");
      setResults(null);
      return;
    }
    if (
      xa.some((val) => isNaN(val) || val <= 0) ||
      xb.some((val) => isNaN(val) || val <= 0) ||
      y.some((val) => isNaN(val) || val <= 0)
    ) {
      setError(
        "Усі значення xa, xb та y повинні бути більше 0 і не бути порожніми!"
      );
      setResults(null);
      return;
    }
    setError(null);

    const result: typeof results = {};

    const findPointIndex = (point: {
      xa: number;
      xb: number;
      y: number | null;
    }) => {
      if (point.y === null) return -1;
      return validPoints.findIndex(
        (vp) => vp.xa === point.xa && vp.xb === point.xb && vp.y === point.y
      );
    };

    // 1. Множинна лінійна регресія
    const linear = leastSquares(xa, xb, y, "linear");
    const linearMetrics = calculateMetrics(y, linear.predicted);
    result.linear = {
      equation: `y = ${linear.coeffs[0].toFixed(
        2
      )} + ${linear.coeffs[1].toFixed(2)}xa + ${linear.coeffs[2].toFixed(2)}xb`,
      coefficients: {
        c: linear.coeffs[0],
        a: linear.coeffs[1],
        b: linear.coeffs[2],
      },
      ...linearMetrics,
      mse: linear.mse,
      predicted: points.map((p) => {
        const index = findPointIndex(p);
        return index !== -1
          ? linear.predicted[index]
          : predictY(p.xa, p.xb, linear.coeffs, "linear");
      }),
    };

    // 2. Квадратична регресія
    const quadratic = leastSquares(xa, xb, y, "quadratic");
    const quadraticMetrics = calculateMetrics(y, quadratic.predicted);
    result.quadratic = {
      equation: `y = ${quadratic.coeffs[0].toFixed(
        2
      )} + ${quadratic.coeffs[1].toFixed(2)}xa + ${quadratic.coeffs[2].toFixed(
        2
      )}xb + ${quadratic.coeffs[3].toFixed(
        2
      )}xa² + ${quadratic.coeffs[4].toFixed(
        2
      )}xb² + ${quadratic.coeffs[5].toFixed(2)}xa*xb`,
      coefficients: {
        c: quadratic.coeffs[0],
        a: quadratic.coeffs[1],
        b: quadratic.coeffs[2],
        d: quadratic.coeffs[3],
        e: quadratic.coeffs[4],
        f: quadratic.coeffs[5],
      },
      ...quadraticMetrics,
      mse: quadratic.mse,
      predicted: points.map((p) => {
        const index = findPointIndex(p);
        return index !== -1
          ? quadratic.predicted[index]
          : predictY(p.xa, p.xb, quadratic.coeffs, "quadratic");
      }),
    };

    // 3. Кубічна регресія
    const cubic = leastSquares(xa, xb, y, "cubic");
    const cubicMetrics = calculateMetrics(y, cubic.predicted);
    result.cubic = {
      equation: `y = ${cubic.coeffs[0].toFixed(2)} + ${cubic.coeffs[1].toFixed(
        2
      )}xa + ${cubic.coeffs[2].toFixed(2)}xb + ${cubic.coeffs[3].toFixed(
        2
      )}xa² + ${cubic.coeffs[4].toFixed(2)}xb² + ${cubic.coeffs[5].toFixed(
        2
      )}xa*xb + ${cubic.coeffs[6].toFixed(2)}xa³ + ${cubic.coeffs[7].toFixed(
        2
      )}xb³ + ${cubic.coeffs[8].toFixed(2)}xa²*xb + ${cubic.coeffs[9].toFixed(
        2
      )}xa*xb²`,
      coefficients: {
        c: cubic.coeffs[0],
        a: cubic.coeffs[1],
        b: cubic.coeffs[2],
        d: cubic.coeffs[3],
        e: cubic.coeffs[4],
        f: cubic.coeffs[5],
        g: cubic.coeffs[6],
        h: cubic.coeffs[7],
        i: cubic.coeffs[8],
        j: cubic.coeffs[9],
      },
      ...cubicMetrics,
      mse: cubic.mse,
      predicted: points.map((p) => {
        const index = findPointIndex(p);
        return index !== -1
          ? cubic.predicted[index]
          : predictY(p.xa, p.xb, cubic.coeffs, "cubic");
      }),
    };

    // 4. Степенева регресія
    const power = leastSquares(xa, xb, y, "power");
    const powerMetrics = calculateMetrics(y, power.predicted);
    result.power = {
      equation: `y = ${power.extraParams!.a.toFixed(
        2
      )} * xa^${power.coeffs[1].toFixed(2)} * xb^${power.coeffs[2].toFixed(2)}`,
      coefficients: {
        a: power.extraParams!.a,
        b: power.coeffs[1],
        c: power.coeffs[2],
      },
      ...powerMetrics,
      mse: power.mse,
      predicted: points.map((p) =>
        predictY(p.xa, p.xb, power.coeffs, "power", power.extraParams)
      ),
    };

    // 5. Показникова регресія
    const show = leastSquares(xa, xb, y, "show");
    const showMetrics = calculateMetrics(y, show.predicted);
    result.show = {
      equation: `y = ${show.extraParams!.a.toFixed(
        2
      )} * ${show.extraParams!.b.toFixed(2)}^xa * ${show.extraParams!.c.toFixed(
        2
      )}^xb`,
      coefficients: {
        a: show.extraParams!.a,
        b: show.extraParams!.b,
        c: show.extraParams!.c,
      },
      ...showMetrics,
      mse: show.mse,
      predicted: points.map((p) =>
        predictY(p.xa, p.xb, show.coeffs, "show", show.extraParams)
      ),
    };

    // 6. Логарифмічна регресія
    const logarithmic = leastSquares(xa, xb, y, "logarithmic");
    const logarithmicMetrics = calculateMetrics(y, logarithmic.predicted);
    result.logarithmic = {
      equation: `y = ${logarithmic.coeffs[0].toFixed(
        2
      )} + ${logarithmic.coeffs[1].toFixed(
        2
      )}ln(xa) + ${logarithmic.coeffs[2].toFixed(2)}ln(xb)`,
      coefficients: {
        c: logarithmic.coeffs[0],
        a: logarithmic.coeffs[1],
        b: logarithmic.coeffs[2],
      },
      ...logarithmicMetrics,
      mse: logarithmic.mse,
      predicted: points.map((p) =>
        predictY(p.xa, p.xb, logarithmic.coeffs, "logarithmic")
      ),
    };

    // 7. Гіперболічна регресія
    const hyperbolic = leastSquares(xa, xb, y, "hyperbolic");
    const hyperbolicMetrics = calculateMetrics(y, hyperbolic.predicted);
    result.hyperbolic = {
      equation: `y = ${hyperbolic.coeffs[0].toFixed(
        2
      )} + ${hyperbolic.coeffs[1].toFixed(
        2
      )}/xa + ${hyperbolic.coeffs[2].toFixed(2)}/xb`,
      coefficients: {
        c: hyperbolic.coeffs[0],
        a: hyperbolic.coeffs[1],
        b: hyperbolic.coeffs[2],
      },
      ...hyperbolicMetrics,
      mse: hyperbolic.mse,
      predicted: points.map((p) =>
        predictY(p.xa, p.xb, hyperbolic.coeffs, "hyperbolic")
      ),
    };

    // 8. Експоненціальна регресія
    const exponential = leastSquares(xa, xb, y, "exponential");
    const exponentialMetrics = calculateMetrics(y, exponential.predicted);
    result.exponential = {
      equation: `y = e^(${exponential.coeffs[0].toFixed(
        2
      )} + ${exponential.coeffs[1].toFixed(
        2
      )}xa + ${exponential.coeffs[2].toFixed(2)}xb)`,
      coefficients: {
        c: exponential.coeffs[0],
        a: exponential.coeffs[1],
        b: exponential.coeffs[2],
      },
      ...exponentialMetrics,
      mse: exponential.mse,
      predicted: points.map((p) =>
        predictY(p.xa, p.xb, exponential.coeffs, "exponential")
      ),
    };

    setResults(result);
  };

  // Маппінг назв регресій
  const regressionNames: { [key: string]: string } = {
    linear: "Множинна лінійна регресія",
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
        <p>1. Множинна лінійна регресія: y = c + a * xa + b * xb</p>
        <p>
          2. Квадратична регресія: y = c + a * xa + b * xb + d * xa² + e * xb² +
          f * xa * xb
        </p>
        <p>
          3. Кубічна регресія: y = c + a * xa + b * xb + d * xa² + e * xb² + f *
          xa * xb + g * xa³ + h * xb³ + i * xa² * xb + j * xa * xb²
        </p>
        <p>4. Степенева регресія: y = a * xa^b * xb^c</p>
        <p>5. Показникова регресія: y = a * b^xa * c^xb</p>
        <p>6. Логарифмічна регресія: y = c + a * ln(xa) + b * ln(xb)</p>
        <p>7. Гіперболічна регресія: y = c + a/xa + b/xb</p>
        <p>8. Експоненціальна регресія: y = e^(c + a * xa + b * xb)</p>
      </div>

      <div className={styles.inputs}>
        {points.map((point, index) => (
          <div key={index} className={styles.inputGroup}>
            <label htmlFor={`xa${index + 1}`}>
              x<sub>a{index + 1}</sub>:
            </label>
            <input
              type="number"
              id={`xa${index + 1}`}
              value={point.xa === 0 ? "" : point.xa}
              onChange={(e) => updatePoint(index, "xa", e.target.value)}
              className={styles.input}
              placeholder={`xa${index + 1}`}
            />
            <label htmlFor={`xb${index + 1}`}>
              x<sub>b{index + 1}</sub>:
            </label>
            <input
              type="number"
              id={`xb${index + 1}`}
              value={point.xb === 0 ? "" : point.xb}
              onChange={(e) => updatePoint(index, "xb", e.target.value)}
              className={styles.input}
              placeholder={`xb${index + 1}`}
            />
            <label htmlFor={`y${index + 1}`}>
              y<sub>{index + 1}</sub>:
            </label>
            <input
              type="number"
              id={`y${index + 1}`}
              value={point.y === null ? "" : point.y}
              onChange={(e) => updatePoint(index, "y", e.target.value)}
              className={styles.input}
              placeholder={`y${index + 1} (опц.)`}
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

      <div className={styles.controls}>
        <button
          onClick={() => setShowFormulas(!showFormulas)}
          className={styles.controlBtn}
        >
          {showFormulas ? "Сховати формули" : "Відобразити формули"}
        </button>
      </div>

      {showFormulas && <FormulasInterpretation />}

      {results && !error && (
        <div className={styles.results}>
          <h3>Результати:</h3>
          {Object.entries(results).map(([key, result]) => (
            <div key={key} className={styles.step}>
              <p>
                <strong>{regressionNames[key]}</strong>
              </p>
              <p>{result.equation}</p>
              <p>Коефіцієнт кореляції: {result.correlation}</p>
              <p>Коефіцієнт детермінації: {result.determination}</p>
              <p>Середня помилка апроксимації: {result.approximationError}%</p>
            </div>
          ))}
          <h3>Прогнозовані значення</h3>
          <table className={styles.predictionTable}>
            <thead>
              <tr>
                <th>i</th>
                <th>xa</th>
                <th>xb</th>
                <th>y</th>
                {Object.keys(regressionNames).map((key) => (
                  <th key={key}>{regressionNames[key]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {points.map((point, index) => (
                <tr
                  key={index}
                  className={point.y === null ? styles["predicted-only"] : ""}
                >
                  <td>{index + 1}</td>
                  <td>{point.xa.toFixed(2)}</td>
                  <td>{point.xb.toFixed(2)}</td>
                  <td>{point.y !== null ? point.y.toFixed(2) : "N/N"}</td>
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
