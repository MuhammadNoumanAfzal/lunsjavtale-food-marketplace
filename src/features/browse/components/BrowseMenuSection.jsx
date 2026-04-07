import MenuCard from "../../../components/shared/MenuCard";

export default function BrowseMenuSection({ title, items }) {
  return (
    <section className="mt-12 px-2">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="type-h3 font-semibold text-[#191919]">{title}</h2>
        <p className="text-sm text-[#777]">{items.length} items</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 ">
        {items.map((item) => (
          <MenuCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
