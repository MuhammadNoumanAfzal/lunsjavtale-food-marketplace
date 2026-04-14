import { FiMinus, FiPlus } from "react-icons/fi";

function PriceRow({ label, value, bold = false }) {
  return (
    <div
      className={`flex items-center justify-between ${
        bold ? "text-[15px] font-semibold" : "text-[14px]"
      } text-black`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

export default function MenuOrderSummarySidebar({
  menu,
  quantity,
  restaurant,
  total,
  selectedAddOns,
  onDecrease,
  onIncrease,
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}) {
  const addOnsTotal = selectedAddOns.reduce(
    (sum, addOn) => sum + addOn.price,
    0,
  );

  return (
    <aside className="order-first lg:order-none lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-[8px] border border-[#d8d8d8] bg-white p-4 text-black shadow-sm">
        <p className="border-b border-[#d9d9d9] pb-2 text-center text-[12px] font-semibold uppercase tracking-[0.08em] text-[#444]">
          Order Summary
        </p>

        <div className="mt-4">
          <h2 className="text-[16px] font-semibold leading-tight text-black">
            {menu.title}
          </h2>
          <p className="mt-1 text-[13px] text-[#444]">{restaurant.name}</p>
        </div>

        <div className="mt-5 space-y-3">
          <PriceRow
            label={`${quantity} X NOK ${menu.pricePerPerson}`}
            value={`${menu.pricePerPerson * quantity}`}
          />

          <PriceRow
            label="Subtotal"
            value={`${menu.summary.subtotal * quantity}`}
          />

          {selectedAddOns.length ? (
            <PriceRow label="Add-ons" value={`${addOnsTotal}`} />
          ) : null}

          {menu.summary.discount ? (
            <PriceRow
              label="20% Discount"
              value={`-${menu.summary.discount}`}
            />
          ) : null}

          <div className="border-t border-[#d9d9d9] pt-3">
            <PriceRow label="Total" value={`${total}`} bold />
          </div>
        </div>

        <button
          type="button"
          className="mt-5 w-full rounded-[4px] bg-[#c86432] px-4 py-2.5 text-[14px] font-semibold text-white transition hover:opacity-95"
        >
          Checkout
        </button>

        <div className="mt-6 border-t border-[#d9d9d9] pt-4">
          <p className="text-center text-[12px] font-semibold uppercase text-[#444]">
            Event Details
          </p>

          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-1 block text-[14px] font-semibold text-black">
                Delivery Date & Time
              </label>

              <div className="grid grid-cols-1 gap-2">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => onDateChange?.(e.target.value)}
                  className="h-10 w-full rounded-[3px] border border-[#cfcfcf] px-3 text-[14px] text-black outline-none focus:border-[#c86432]"
                />

                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => onTimeChange?.(e.target.value)}
                  className="h-10 w-full rounded-[3px] border border-[#cfcfcf] px-3 text-[14px] text-black outline-none focus:border-[#c86432]"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-[14px] font-semibold text-black">
                Person Count
              </label>

              <div className="flex w-fit items-center overflow-hidden rounded-[3px] border border-[#cfcfcf]">
                <button
                  type="button"
                  onClick={onDecrease}
                  className="flex h-10 w-10 items-center justify-center text-black"
                >
                  <FiMinus />
                </button>

                <span className="flex h-10 min-w-[48px] items-center justify-center border-x border-[#cfcfcf] px-3 text-[14px]">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={onIncrease}
                  className="flex h-10 w-10 items-center justify-center text-black"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            <div className="text-[113px] text-[#444]">
              <p>Location: {restaurant.location}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
