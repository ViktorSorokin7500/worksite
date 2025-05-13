import styles from "@/styles/modules/tools.module.scss";
import { BlockMath, InlineMath } from "react-katex";

export function FormulasInterpretation() {
  return (
    <div className={styles.formulasContainer}>
      <h3>Формули розрахунку</h3>

      <div className={styles.formulaSection}>
        <h4>Вступ</h4>
        <p>
          Нехай є невідома функція <InlineMath math="y = f(x)" />, задана
          табличними значеннями (наприклад, отриманими в результаті
          експериментальних вимірювань). Завдання полягає в тому, щоб знайти
          функцію заданого виду <InlineMath math="y = F(x)" /> (лінійну,
          квадратичну тощо), яка в заданих точках приймає значення, максимально
          близькі до табличних.
        </p>
        <p>
          Отримана формула <InlineMath math="y = F(x)" />, яку називають
          емпіричною формулою, рівнянням регресії або апроксимуючою функцією,
          дозволяє знаходити значення <InlineMath math="f(x)" /> для нетабличних{" "}
          <InlineMath math="x" />, згладжуючи результати вимірювань величини{" "}
          <InlineMath math="y" />.
        </p>
        <p>
          Для визначення параметрів функції <InlineMath math="F" />{" "}
          використовується метод найменших квадратів. У цьому методі критерієм
          близькості апроксимуючої функції до набору точок є сума квадратів
          різниць між табличними значеннями <InlineMath math="y" /> та
          теоретичними значеннями, розрахованими за рівнянням регресії.
        </p>
        <p>
          Таким чином, потрібно знайти функцію <InlineMath math="F" />, яка
          мінімізує суму квадратів:
        </p>
        <BlockMath math="S = \sum_{i} (y_i - F(x_i))^2 \rightarrow \min" />
        <p>
          Розглянемо розв’язання цієї задачі на прикладі лінійної регресії{" "}
          <InlineMath math="F(x) = ax + b" />:
        </p>
        <p>
          <InlineMath math="S" /> є функцією двох змінних{" "}
          <InlineMath math="a" /> і <InlineMath math="b" />. Для знаходження
          мінімуму використовуємо умову екстремуму — прирівнюємо до нуля
          часткові похідні:
        </p>
        <BlockMath math="\begin{cases} \sum [y_i - F(x_i, a, b)] \cdot F'_a(x_i, a, b) = 0 \\ \sum [y_i - F(x_i, a, b)] \cdot F'_b(x_i, a, b) = 0 \end{cases}" />
        <p>
          Для функції <InlineMath math="F(x, a, b) = ax + b" /> часткові похідні
          дорівнюють:
        </p>
        <BlockMath math="F'_a = x, \quad F'_b = 1" />
        <p>Підставивши похідні, отримуємо:</p>
        <BlockMath math="\begin{cases} \sum (y_i - ax_i - b) \cdot x_i = 0 \\ \sum (y_i - ax_i - b) = 0 \end{cases}" />
        <p>Далі:</p>
        <BlockMath math="\begin{cases} \sum y_i x_i - a \sum x_i^2 - b \sum x_i = 0 \\ \sum y_i - a \sum x_i - n b = 0 \end{cases}" />
        <p>
          Виразивши <InlineMath math="a" /> і <InlineMath math="b" />, отримуємо
          формули для коефіцієнтів лінійної регресії, наведені нижче.
        </p>
      </div>

      <div className={styles.formulaSection}>
        <h4>Лінійна регресія</h4>
        <p>Рівняння регресії:</p>
        <BlockMath math="\widehat{y} = ax + b" />
        <p>
          Коефіцієнт <InlineMath math="a" />:
        </p>
        <BlockMath math="a = \frac{\sum x_i \sum y_i - n \sum x_i y_i}{\left(\sum x_i\right)^2 - n \sum x_i^2}" />
        <p>
          Коефіцієнт <InlineMath math="b" />:
        </p>
        <BlockMath math="b = \frac{\sum x_i \sum x_i y_i - \sum x_i^2 \sum y_i}{\left(\sum x_i\right)^2 - n \sum x_i^2}" />
        <p>Коефіцієнт лінійної парної кореляції:</p>
        <BlockMath math="r_{xy} = \frac{n \sum x_i y_i - \sum x_i \sum y_i}{\sqrt{\left(n \sum x_i^2 - \left(\sum x_i\right)^2\right) \left(n \sum y_i^2 - \left(\sum y_i\right)^2\right)}}" />
        <p>Коефіцієнт детермінації:</p>
        <BlockMath math="R^2 = r_{xy}^2" />
        <p>Середня помилка апроксимації:</p>
        <BlockMath math="\overline{A} = \dfrac{1}{n} \sum \left| \dfrac{y_i - \widehat{y}_i}{y_i} \right| \cdot 100\%" />
      </div>

      <div className={styles.formulaSection}>
        <h4>Квадратична регресія</h4>
        <p>Рівняння регресії:</p>
        <BlockMath math="\widehat{y} = ax^2 + bx + c" />
        <p>
          Система рівнянь для знаходження коефіцієнтів{" "}
          <InlineMath math="a, b, c" />:
        </p>
        <BlockMath math="\begin{cases} a \sum x_i^2 + b \sum x_i + n c = \sum y_i \\ a \sum x_i^3 + b \sum x_i^2 + c \sum x_i = \sum x_i y_i \\ a \sum x_i^4 + b \sum x_i^3 + c \sum x_i^2 = \sum x_i^2 y_i \end{cases}" />
        <p>Коефіцієнт кореляції:</p>
        <BlockMath math="R = \sqrt{1 - \frac{\sum (y_i - \widehat{y}_i)^2}{\sum (y_i - \overline{y})^2}}, \quad \text{де} \quad \overline{y} = \dfrac{1}{n} \sum y_i" />
        <p>Коефіцієнт детермінації:</p>
        <BlockMath math="R^2" />
        <p>Середня помилка апроксимації:</p>
        <BlockMath math="\overline{A} = \dfrac{1}{n} \sum \left| \dfrac{y_i - \widehat{y}_i}{y_i} \right| \cdot 100\%" />
      </div>

      <div className={styles.formulaSection}>
        <h4>Кубічна регресія</h4>
        <p>Рівняння регресії:</p>
        <BlockMath math="\widehat{y} = ax^3 + bx^2 + cx + d" />
        <p>
          Система рівнянь для знаходження коефіцієнтів{" "}
          <InlineMath math="a, b, c, d" />:
        </p>
        <BlockMath math="\begin{cases} a \sum x_i^3 + b \sum x_i^2 + c \sum x_i + n d = \sum y_i \\ a \sum x_i^4 + b \sum x_i^3 + c \sum x_i^2 + d \sum x_i = \sum x_i y_i \\ a \sum x_i^5 + b \sum x_i^4 + c \sum x_i^3 + d \sum x_i^2 = \sum x_i^2 y_i \\ a \sum x_i^6 + b \sum x_i^5 + c \sum x_i^4 + d \sum x_i^3 = \sum x_i^3 y_i \end{cases}" />
        <p>
          Коефіцієнт кореляції, коефіцієнт детермінації та середня помилка
          апроксимації використовують ті самі формули, що й для квадратичної
          регресії.
        </p>
      </div>

      <div className={styles.formulaSection}>
        <h4>Степенева регресія</h4>
        <p>Рівняння регресії:</p>
        <BlockMath math="\widehat{y} = a \cdot x^b" />
        <p>
          Коефіцієнт <InlineMath math="b" />:
        </p>
        <BlockMath math="b = \dfrac{n \sum (\ln x_i \cdot \ln y_i) - \sum \ln x_i \cdot \sum \ln y_i}{n \sum \ln^2 x_i - \left(\sum \ln x_i\right)^2}" />
        <p>
          Коефіцієнт <InlineMath math="a" />:
        </p>
        <BlockMath math="a = \exp\left(\dfrac{1}{n} \sum \ln y_i - \dfrac{b}{n} \sum \ln x_i\right)" />
        <p>
          Коефіцієнт кореляції, коефіцієнт детермінації та середня помилка
          апроксимації використовують ті самі формули, що й для квадратичної
          регресії.
        </p>
      </div>

      <div className={styles.formulaSection}>
        <h4>Показникова регресія</h4>
        <p>Рівняння регресії:</p>
        <BlockMath math="\widehat{y} = a \cdot b^x" />
        <p>
          Коефіцієнт <InlineMath math="b" />:
        </p>
        <BlockMath math="b = \exp \dfrac{n \sum x_i \ln y_i - \sum x_i \cdot \sum \ln y_i}{n \sum x_i^2 - \left(\sum x_i\right)^2}" />
        <p>
          Коефіцієнт <InlineMath math="a" />:
        </p>
        <BlockMath math="a = \exp\left(\dfrac{1}{n} \sum \ln y_i - \dfrac{\ln b}{n} \sum x_i\right)" />
        <p>
          Коефіцієнт кореляції, коефіцієнт детермінації та середня помилка
          апроксимації використовують ті самі формули, що й для квадратичної
          регресії.
        </p>
      </div>

      <div className={styles.formulaSection}>
        <h4>Гіперболічна регресія</h4>
        <p>Рівняння регресії:</p>
        <BlockMath math="\widehat{y} = a + \dfrac{b}{x}" />
        <p>
          Коефіцієнт <InlineMath math="b" />:
        </p>
        <BlockMath math="b = \dfrac{n \sum \dfrac{y_i}{x_i} - \sum \dfrac{1}{x_i} \sum y_i}{n \sum \dfrac{1}{x_i^2} - \left(\sum \dfrac{1}{x_i}\right)^2}" />
        <p>
          Коефіцієнт <InlineMath math="a" />:
        </p>
        <BlockMath math="a = \dfrac{1}{n} \sum y_i - \dfrac{b}{n} \sum \dfrac{1}{x_i}" />
        <p>
          Коефіцієнт кореляції, коефіцієнт детермінації та середня помилка
          апроксимації використовують ті самі формули, що й для квадратичної
          регресії.
        </p>
      </div>

      <div className={styles.formulaSection}>
        <h4>Логарифмічна регресія</h4>
        <p>Рівняння регресії:</p>
        <BlockMath math="\widehat{y} = a + b \ln x" />
        <p>
          Коефіцієнт <InlineMath math="b" />:
        </p>
        <BlockMath math="b = \dfrac{n \sum (y_i \ln x_i) - \sum \ln x_i \cdot \sum y_i}{n \sum \ln^2 x_i - \left(\sum \ln x_i\right)^2}" />
        <p>
          Коефіцієнт <InlineMath math="a" />:
        </p>
        <BlockMath math="a = \dfrac{1}{n} \sum y_i - \dfrac{b}{n} \sum \ln x_i" />
        <p>
          Коефіцієнт кореляції, коефіцієнт детермінації та середня помилка
          апроксимації використовують ті самі формули, що й для квадратичної
          регресії.
        </p>
      </div>

      <div className={styles.formulaSection}>
        <h4>Експоненціальна регресія</h4>
        <p>Рівняння регресії:</p>
        <BlockMath math="\widehat{y} = e^{a + b x}" />
        <p>
          Коефіцієнт <InlineMath math="b" />:
        </p>
        <BlockMath math="b = \dfrac{n \sum x_i \ln y_i - \sum x_i \cdot \sum \ln y_i}{n \sum x_i^2 - \left(\sum x_i\right)^2}" />
        <p>
          Коефіцієнт <InlineMath math="a" />:
        </p>
        <BlockMath math="a = \dfrac{1}{n} \sum \ln y_i - \dfrac{b}{n} \sum x_i" />
        <p>
          Коефіцієнт кореляції, коефіцієнт детермінації та середня помилка
          апроксимації використовують ті самі формули, що й для квадратичної
          регресії.
        </p>
      </div>
    </div>
  );
}
