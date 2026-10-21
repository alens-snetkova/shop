const CATEGORIES = [
  { key: "all", name: "All" },
  { key: "chairs", name: "Chairs" },
  { key: "tables", name: "Tables" },
  { key: "sofas", name: "Sofas" },
  { key: "lamps", name: "Lamps" },
  { key: "shelves", name: "Shelves" },
];

export default function Categories({ activeCategory, onChoose }) {
  return (
    <div className="categories">
      {CATEGORIES.map((el) => (
        <div
          key={el.key}
          className={el.key === activeCategory ? "active" : ""}
          onClick={() => onChoose(el.key)}
        >
          {el.name}
        </div>
      ))}
    </div>
  );
}
