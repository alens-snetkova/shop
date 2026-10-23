/**
 * Каталог товаров (временная БД в виде массива).
 *
 * Поля товара:
 *  - id       — уникальный номер; по нему товар ищется в корзине и в окне товара
 *  - title    — название
 *  - img      — путь к картинке (файлы лежат в public/img)
 *  - desc     — описание
 *  - category — ключ категории; должен совпадать с `key` в Categories.jsx
 *  - price    — цена числом (не строкой), чтобы можно было считать сумму
 */

// Общее описание вынесено в константу, чтобы не повторять его в каждом товаре
export const ITEMS = [
  {
    id: 1,
    title: "Chair grey",
    img: "/img/chair-grey.jpg",
    desc: "A sleek and versatile addition to any room. Upholstered in premium, breathable grey fabric with a sturdy wooden frame for lasting comfort and modern elegance.",
    category: "chairs",
    price: 49.99,
  },
  {
    id: 2,
    title: "Table oak",
    img: "/img/table-oak.jpg",
    desc: "Crafted from solid, sustainably sourced oak wood. This durable dining table features a smooth, natural finish that brings warmth and timeless character to your home.",
    category: "tables",
    price: 199.99,
  },
  {
    id: 3,
    title: "Sofa blue",
    img: "/img/sofa-blue.jpg",
    desc: "A striking statement piece for your living room. Featuring deep, plush seating and rich blue upholstery, this sofa offers the perfect blend of bold style and ultimate relaxation.",
    category: "sofas",
    price: 499.99,
  },
  {
    id: 4,
    title: "Lamp desk",
    img: "/img/lamp-desk.jpg",
    desc: "Minimalist design meets functional lighting. This adjustable desk lamp provides warm, focused illumination, making it the perfect companion for late-night reading or productive work.",
    category: "lamps",
    price: 29.99,
  },
  {
    id: 5,
    title: "Shelf wall",
    img: "/img/shelf-wall.jpg",
    desc: "Maximize your space with this elegant floating wall shelf. Its clean lines and sturdy construction make it ideal for displaying books, plants, or your favorite decorative pieces.",
    category: "shelves",
    price: 39.99,
  },
  {
    id: 6,
    title: "Armchair leather",
    img: "/img/armchair-leather.jpg",
    desc: "Experience classic luxury with this premium leather armchair. Designed with ergonomic support and a rich, supple finish, it creates an instant cozy reading nook in any space.",
    category: "chairs",
    price: 299.99,
  },
];
