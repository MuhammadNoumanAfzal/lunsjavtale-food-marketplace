import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function MenuAddOnsSection({
  addOns,
  selectedAddOnIds,
  onToggleAddOn,
}) {
  const [startIndex, setStartIndex] = useState(0);
  const visibleAddOns = addOns.slice(startIndex, startIndex + 4);
  const canGoBack = startIndex > 0;
  const canGoForward = startIndex + 4 < addOns.length;

  return (
    <div className="mt-5 rounded-[20px] border border-[#e9e0d6] bg-white p-4 shadow-[0_16px_36px_rgba(37,24,8,0.05)] sm:mt-8 sm:rounded-[24px] sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-[17px] font-semibold text-black sm:text-[18px]">Add-ons</h2>
        <div className="flex items-center gap-2 text-black">
          <button
            type="button"
            onClick={() =>
              setStartIndex((current) => Math.max(0, current - 1))
            }
            disabled={!canGoBack}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e0d6ca] text-black ${
              canGoBack
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-40"
            }`}
          >
            <FiChevronLeft />
          </button>
          <button
            type="button"
            onClick={() =>
              setStartIndex((current) =>
                Math.min(addOns.length - 4, current + 1),
              )
            }
            disabled={!canGoForward}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e0d6ca] text-black ${
              canGoForward
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-40"
            }`}
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {visibleAddOns.map((addOn) => (
          <article
            key={addOn.id}
            className="overflow-hidden rounded-[18px] border border-[#ece2d8] bg-[#fffdfb]"
          >
            <img
              src={addOn.image}
              alt={addOn.title}
              className="h-[160px] w-full object-cover sm:h-[132px]"
            />
            <div className="p-3">
              <h3 className="text-[14px] font-semibold text-black">
                {addOn.title}
              </h3>
              <p className="mt-1 text-[12px] text-black">NOK {addOn.price}</p>
              <button
                type="button"
                onClick={() => onToggleAddOn(addOn.id)}
                className={`mt-3 w-full cursor-pointer rounded-[10px] border px-3 py-2 text-[12px] font-semibold ${
                  selectedAddOnIds.includes(addOn.id)
                    ? "border-[#c85f33] bg-[#c85f33] text-white"
                    : "border-[#d8cfc4] text-black"
                }`}
              >
                {selectedAddOnIds.includes(addOn.id) ? "Added" : "Add"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
