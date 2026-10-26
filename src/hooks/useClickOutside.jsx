import { useEffect } from "react";

/**
 * Вызывает onOutside, когда пользователь нажимает вне ВСЕХ переданных элементов.
 * @param refs      — одна ссылка (useRef) или массив ссылок на «защищаемые» элементы
 * @param onOutside — что сделать при клике снаружи (например, закрыть)
 * @param active    — слушать клики только пока элемент открыт
 */
export default function useClickOutside(refs, onOutside, active = true) {
  useEffect(() => {
    if (!active) return;

    const list = Array.isArray(refs) ? refs : [refs];

    const handle = (e) => {
      // Клик «внутри», если он попал хотя бы в один из элементов
      const inside = list.some(
        (r) => r.current && r.current.contains(e.target),
      );
      if (!inside) onOutside();
    };

    document.addEventListener("pointerdown", handle);
    return () => document.removeEventListener("pointerdown", handle);
  }, [refs, onOutside, active]);
}
