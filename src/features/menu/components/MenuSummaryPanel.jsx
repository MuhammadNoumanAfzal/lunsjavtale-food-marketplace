function extractDiscountPercent(discount) {
  const matched = discount?.match(/(\d+)%/);
  return matched ? Number(matched[1]) : 0;
}

function formatDisplayDate(dateValue) {
  if (!dateValue) {
    return "";
  }

  const date = new Date(`${dateValue}T00:00:00`);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDisplayTime(timeValue) {
  if (!timeValue) {
    return "";
  }

  const [hours, minutes] = timeValue.split(":");
  const date = new Date(2026, 0, 1, Number(hours), Number(minutes));

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function SummaryRow({ label, value, bold = false }) {
  return (
    <div
      className={`type-subpara flex items-center justify-between ${
        bold ? "font-bold " : "text-[#2f2f2f]"
      }`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

export default function MenuSummaryPanel({
  menu,
  restaurant,
  personCount,
  addOns,
  addOnQuantities,
  deliveryDate,
  deliveryTime,
  onDeliveryDateChange,
  onDeliveryTimeChange,
  onDecrease,
  onIncrease,
}) {
  const subtotal = menu.pricePerPerson * personCount;
  const addOnTotal = addOns.reduce(
    (sum, addOn) => sum + addOn.price * (addOnQuantities[addOn.id] ?? 0),
    0,
  );
  const discountPercent = extractDiscountPercent(restaurant.discount);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = subtotal + addOnTotal - discountAmount;

  return (
    <aside className="border-t border-[#ddd6cd] pt-4 lg:border-t-0 lg:pt-0">
      <div className="border-b border-[#ddd6cd] pb-4">
        <p className="type-h4 text-center uppercase tracking-[0.12em] ">
          Order Summary
        </p>

        <div className="mt-4 border-b border-[#ddd6cd] pb-3">
          <h2 className="type-h5 font-bold ">{menu.title}</h2>
          <p className="type-subpara mt-1 text-[#4b4b4b]">
            {menu.pricePerPerson} NOK x {personCount} people
          </p>
        </div>

        <div className="mt-3 space-y-2 border-b border-[#ddd6cd] pb-3">
          <SummaryRow label="Subtotal" value={`${subtotal}`} />
          <SummaryRow label="Add-ons" value={`+${addOnTotal}`} />
          <SummaryRow
            label={`${discountPercent}% Discount`}
            value={`-${discountAmount}`}
          />
        </div>

        <div className="mt-3 flex items-center justify-between bg-[#e9e9e9] px-3 py-2">
          <span className="type-subpara font-bold ">Total</span>
          <span className="type-subpara font-bold ">{total}</span>
        </div>

        <button
          type="button"
          className="type-subpara mx-auto mt-5 block w-full max-w-[175px] rounded-[3px] bg-[#cf6e38] px-12 py-2 font-bold text-white"
        >
          Checkout
        </button>
      </div>

      <div className="py-4 ">
        <p className="type-h5 border-b border-[#ddd6cd] pb-3 text-center uppercase tracking-[0.12em]">
          Event Details
        </p>

        <h3 className="type-h5 mt-4 font-bold">Delivery Date &amp; Time</h3>
        <div className="mt-2 rounded-[2px] border border-[#d9d2ca]">
          <div className="type-subpara flex items-center text-[#4b4b4b]">
            <input
              type="date"
              value={deliveryDate}
              onChange={(event) => onDeliveryDateChange(event.target.value)}
              className="w-[116px] bg-transparent px-2 py-1.5 outline-none"
            />
            <span className="text-[#b2aaa1]">|</span>
            <input
              type="time"
              value={deliveryTime}
              onChange={(event) => onDeliveryTimeChange(event.target.value)}
              className="w-[84px] bg-transparent px-2 py-1.5 outline-none"
            />
          </div>
          <div className="type-subpara border-t border-[#ebe4db] px-2 py-1 text-[#6b6b6b]">
            {formatDisplayDate(deliveryDate)} | {formatDisplayTime(deliveryTime)}
          </div>
        </div>

        <h3 className="type-h6 mt-4 border-t border-[#ddd6cd] pt-4 font-bold">
          Person Count
        </h3>
        <div className="mt-2 inline-flex items-center rounded-[2px] border border-[#d9d2ca]">
          <button
            type="button"
            onClick={onDecrease}
            className="type-subpara px-3 py-1.5 text-[#4b4b4b]"
          >
            -
          </button>
          <span className="type-subpara border-x border-[#d9d2ca] px-4 py-1.5 text-[#4b4b4b]">
            {personCount}
          </span>
          <button
            type="button"
            onClick={onIncrease}
            className="type-subpara px-3 py-1.5 text-[#4b4b4b]"
          >
            +
          </button>
        </div>

        <p className="type-subpara mt-5 border-t border-[#ddd6cd] pt-4 text-[#4b4b4b]">
          Location: {menu.deliveryAddress}
        </p>
      </div>
    </aside>
  );
}
