/**
 * FlyingImage — временная картинка, которая «летит» от товара к иконке
 * корзины после добавления.
 *
 * Как это работает:
 *  1. Картинка ставится ровно на место фото товара (position: fixed в CSS).
 *  2. Считается, на сколько пикселей её нужно сдвинуть до корзины.
 *  3. Эти значения передаются в CSS как переменные --dx и --dy,
 *     а анимация fly-to-cart (см. стили) сдвигает и уменьшает картинку.
 *  4. По окончании анимации вызывается onDone, и App убирает картинку.
 *
 * Props:
 *  - img    — адрес картинки
 *  - from   — положение и размер фото товара (getBoundingClientRect)
 *  - to     — положение и размер иконки корзины
 *  - onDone — вызывается, когда анимация закончилась
 */
export default function FlyingImage({ img, from, to, onDone }) {
  // Сдвиг между центром фото и центром иконки корзины
  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);

  return (
    <img
      className="flying-image"
      src={img}
      alt="" // картинка декоративная, скринридеру читать её не нужно
      onAnimationEnd={onDone}
      style={{
        left: from.left,
        top: from.top,
        width: from.width,
        height: from.height,
        "--dx": `${dx}px`,
        "--dy": `${dy}px`,
      }}
    />
  );
}
