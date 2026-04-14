import { FiMinus, FiPlus, FiStar } from "react-icons/fi";

function PriceRow({ label, value, bold = false }) {
  return (
    <div
      className={`flex items-center justify-between text-[13px] ${
        bold ? "font-semibold text-black" : "text-black"
      }`}
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
}) {
  const addOnsTotal = selectedAddOns.reduce(
    (sum, addOn) => sum + addOn.price,
    0,
  );

  return (
    <aside className="order-first lg:order-none lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-[20px] border border-[#e7ddd2] bg-[#fffdfb] p-4 text-black shadow-[0_16px_44px_rgba(44,27,9,0.08)] sm:rounded-[24px] sm:p-5">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#8a7d70]">
          Order summary
        </p>
        <div className="mt-4 border-b border-[#ece3d9] pb-4">
          <h2 className="text-[18px] font-semibold leading-tight text-black sm:text-[20px]">{menu.title}</h2>
          <p className="mt-1 text-[12px] text-black sm:text-[13px]">{restaurant.name}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#fff6e6] px-2.5 py-1 text-[12px] font-semibold text-black">
              <FiStar className="fill-[#f4b400] text-[#f4b400]" />
              {menu.rating}
            </span>
            <span className="rounded-full border border-[#e3d7c8] px-2.5 py-1 text-[12px] text-black">
              {restaurant.location}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-[13px] text-black sm:text-[14px]">Quantity</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onDecrease}
              className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] border border-[#ddd2c6] text-black sm:h-9 sm:w-9"
            >
              <FiMinus />
            </button>
            <span className="inline-flex min-w-[38px] items-center justify-center rounded-[10px] border border-[#ddd2c6] px-3 py-2 text-[13px] font-semibold text-black sm:min-w-[42px] sm:text-[14px]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={onIncrease}
              className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] border border-[#ddd2c6] text-black sm:h-9 sm:w-9"
            >
              <FiPlus />
            </button>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <PriceRow label="Price per person" value={`NOK ${menu.pricePerPerson}`} />
          <PriceRow
            label="Subtotal"
            value={`NOK ${menu.summary.subtotal * quantity}`}
          />
          {selectedAddOns.length ? (
            <PriceRow label="Add-ons" value={`NOK ${addOnsTotal}`} />
          ) : null}
          <PriceRow label="Delivery fee" value={`NOK ${menu.summary.deliveryFee}`} />
          <PriceRow label="VAT" value={`NOK ${menu.summary.vat}`} />
          <div className="border-t border-[#ece3d9] pt-3">
            <PriceRow label="Total" value={`NOK ${total}`} bold />
          </div>
        </div>

        <button
          type="button"
          className="mt-5 w-full rounded-[12px] bg-[#c85f33] px-4 py-3 text-[13px] font-semibold text-white transition hover:bg-[#b6542c] sm:text-[14px]"
        >
          Checkout
        </button>

        <div className="mt-4 rounded-[16px] border border-[#ece3d9] bg-white p-4">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8a7d70]">
            Event details
          </p>
          <div className="mt-3 space-y-2 text-[13px] text-black">
            <p>Delivery date: {menu.deliveryDate}</p>
            <p>Delivery time: {menu.deliveryWindow}</p>
            <p>Persons: {menu.minimumOrder}</p>
          </div>
        </div>

        <div className="mt-4 rounded-[16px] border border-[#ece3d9] bg-white p-4">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8a7d70]">
            Restaurant info
          </p>
          <div className="mt-3 space-y-2 text-[13px] text-black">
            <p>Name: {restaurant.name}</p>
            <p>Location: {restaurant.location}</p>
            <p>Delivery: {restaurant.deliveryFee}</p>
            <p>Offer: {restaurant.discount}</p>
          </div>
        </div>

        {selectedAddOns.length ? (
          <div className="mt-4 rounded-[16px] border border-[#ece3d9] bg-white p-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8a7d70]">
              Selected add-ons
            </p>
            <div className="mt-3 space-y-2 text-[13px] text-black">
              {selectedAddOns.map((addOn) => (
                <div
                  key={addOn.id}
                  className="flex items-center justify-between gap-3"
                >
                  <span>{addOn.title}</span>
                  <span>NOK {addOn.price}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
