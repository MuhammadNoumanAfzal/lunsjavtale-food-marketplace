export default function MenuAddOnsSection({
  addOns,
  addOnQuantities,
  onDecrease,
  onIncrease,
}) {
  const shouldScroll = addOns.length > 8;

  return (
    <section className="mt-4 border-t border-[#ddd6cd] pt-3">
      <h3 className="type-h3 font-bold text-[#1f1f1f]">Add-ons</h3>

      <div className="mt-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div
          className={`gap-2 ${
            shouldScroll
              ? "flex min-w-max"
              : "grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8"
          }`}
        >
          {addOns.map((addOn) => {
            const quantity = addOnQuantities[addOn.id] ?? 0;

            return (
              <article
                key={addOn.id}
                className={`${shouldScroll ? "w-[88px] shrink-0" : "min-w-0"}`}
              >
                <div className="overflow-hidden rounded-[20px] border border-[#d8d1c8] bg-white">
                  <img
                    src={addOn.image}
                    alt={addOn.title}
                    className="h-[124px] w-full object-cover"
                  />
                </div>

                <p className="mt-1 truncate text-center type-para font-medium text-[#1f1f1f]">
                  {addOn.title}
                </p>

                <div className="mt-1 flex items-center justify-center rounded-[2px] border border-[#d8d1c8] bg-white type-subapara text-[#4b4b4b] cursor-pointer">
                  <button
                    type="button"
                    onClick={() => onDecrease(addOn.id)}
                    className="px-2 py-0.5 cursor-pointer"
                  >
                    -
                  </button>
                  <span className=" px-2.5 py-0.5">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => onIncrease(addOn.id)}
                    className="px-2 py-0.5 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
