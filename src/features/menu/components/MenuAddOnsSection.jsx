import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function MenuAddOnsSection({
  addOns,
  addOnQuantities,
  onDecrease,
  onIncrease,
}) {
  const shouldScroll = addOns.length > 4;
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    container.scrollBy({
      left: direction * 720,
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-4 border-t border-[#ddd6cd] pt-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="type-h3 font-bold text-[#1f1f1f]">Add-ons</h3>

        {shouldScroll ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleScroll(-1)}
              className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[#ddd6cd] bg-white text-[#5c5c5c] transition hover:bg-[#f7f2ec]"
              aria-label="Previous add-ons"
            >
              <FiChevronLeft className="text-[15px]" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll(1)}
              className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[#ddd6cd] bg-white text-[#5c5c5c] transition hover:bg-[#f7f2ec]"
              aria-label="Next add-ons"
            >
              <FiChevronRight className="text-[15px]" />
            </button>
          </div>
        ) : null}
      </div>

      <div
        ref={scrollRef}
        className="mt-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div
          className={`gap-2 ${
            shouldScroll
              ? "flex min-w-max"
              : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
          }`}
        >
          {addOns.map((addOn) => {
            const quantity = addOnQuantities[addOn.id] ?? 0;

            return (
              <article
                key={addOn.id}
                className={`${shouldScroll ? "w-[172px] shrink-0" : "min-w-0"}`}
              >
                <div className="flex h-full flex-col overflow-hidden rounded-[12px] border border-[#ddd6cd] bg-white shadow-[0_6px_14px_rgba(37,24,8,0.05)]">
                  <img
                    src={addOn.image}
                    alt={addOn.title}
                    className="h-[84px] w-full object-cover"
                  />
                  <div className="flex flex-1 flex-col px-2 py-2">
                    <div className="min-h-[48px]">
                      <p className="line-clamp-2 text-[18px] font-semibold leading-4 text-[#1f1f1f]">
                        {addOn.title}
                      </p>
                      <p className="mt-2 text-[13px] font-medium text-[#7a746e]">
                        NOK {addOn.price}
                      </p>
                    </div>

                    <div className="mt-auto pt-2">
                      {quantity > 0 ? (
                        <div className="flex items-center justify-between rounded-[8px] border border-[#ddd6cd] bg-white text-[12px] font-semibold text-[#4b4b4b]">
                          <button
                            type="button"
                            onClick={() => onDecrease(addOn.id)}
                            className="px-3 py-1.5"
                          >
                            -
                          </button>
                          <span>{quantity}</span>
                          <button
                            type="button"
                            onClick={() => onIncrease(addOn.id)}
                            className="px-3 py-1.5"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onIncrease(addOn.id)}
                          className="w-full rounded-[8px] border border-[#ddd6cd] bg-white py-1.5 text-[12px] font-semibold text-[#4b4b4b] transition hover:bg-[#f7f2ec]"
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
