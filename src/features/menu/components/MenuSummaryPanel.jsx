import { useMemo, useState } from "react";

function extractDiscountPercent(discount) {
  const matched = discount?.match(/(\d+)%/);
  return matched ? Number(matched[1]) : 0;
}

function extractNumericValue(value, fallback = 0) {
  const matched = `${value ?? ""}`.match(/(\d+)/);
  return matched ? Number(matched[1]) : fallback;
}

function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

function toTitleCase(value) {
  return value
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
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
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function SummaryRow({ label, value, strong = false, muted = false }) {
  return (
    <div
      className={`type-subpara flex items-center justify-between gap-4 ${
        strong ? "font-bold text-[#171717]" : "text-[#3f3f3f]"
      } ${muted ? "text-[#7d7d7d]" : ""}`}
    >
      <span>{label}</span>
      <span className="shrink-0">{value}</span>
    </div>
  );
}

function CompactPillButton({ children, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`type-subpara min-w-[30px] rounded-full border px-2 py-[3px] text-center transition ${
        active
          ? "border-[#cf6e38] bg-[#fff1e9] text-[#cf6e38]"
          : "border-[#d7d7d7] bg-white text-[#4b4b4b] hover:bg-[#f7f7f7]"
      }`}
    >
      {children}
    </button>
  );
}

function OrderItemCard({
  index,
  title,
  price,
  details,
  note,
  actionLabel,
  actionTone = "danger",
  onAction,
  children,
}) {
  return (
    <div className="border-b border-[#e1e1e1] py-2.5">
      <div className="flex items-start justify-between gap-2">
        <h3 className="type-subpara font-bold text-[#171717]">
          {index} {title}
        </h3>
        <span className="type-subpara shrink-0 font-bold text-[#171717]">
          {formatCurrency(price)}
        </span>
      </div>

      <div className="mt-1.5 space-y-1">
        {details.map((detail) => (
          <div key={detail} className="flex items-start gap-1.5">
            <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-[#9b9b9b]" />
            <p className="type-subpara leading-[1.35] text-[#808080]">{detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <p className="type-subpara text-[#808080]">{note}</p>
        <button
          type="button"
          onClick={onAction}
          className={`type-subpara ${
            actionTone === "danger" ? "text-[#d45446]" : "text-[#4b75c9]"
          }`}
        >
          {actionLabel}
        </button>
      </div>

      {children}
    </div>
  );
}

function SectionTitle({ children, bordered = true, className = "" }) {
  return (
    <p
      className={`type-h4 text-center uppercase tracking-[0.08em] text-[#171717] ${
        bordered ? "border-b border-[#d8d8d8] pb-1.5" : ""
      } ${className}`}
    >
      {children}
    </p>
  );
}

function DetailInput({ type, value, onChange, className = "" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={`type-para h-6 rounded-[2px] border border-[#d7d7d7] bg-white px-2 text-center text-[#2c2c2c] outline-none ${className}`}
    />
  );
}

function QuantityButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="type-para flex h-6 w-6 items-center justify-center rounded-[2px] border border-[#d7d7d7] bg-white text-[#2c2c2c] transition hover:bg-[#f5f5f5]"
    >
      {children}
    </button>
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
  onRemoveAddOn,
}) {
  const [tipPercent, setTipPercent] = useState(10);
  const [isTablewareModalOpen, setIsTablewareModalOpen] = useState(false);
  const [selectedTableware, setSelectedTableware] = useState([
    "plates",
    "napkins",
    "utensils",
    "cups",
  ]);
  const [draftTableware, setDraftTableware] = useState(selectedTableware);
  const [tablewareInstructions, setTablewareInstructions] = useState("");
  const [draftTablewareInstructions, setDraftTablewareInstructions] = useState("");

  const selectedAddOns = useMemo(
    () =>
      addOns.filter((addOn) => (addOnQuantities[addOn.id] ?? 0) > 0).map((addOn) => ({
        ...addOn,
        quantity: addOnQuantities[addOn.id] ?? 0,
      })),
    [addOns, addOnQuantities],
  );

  const baseItems = menu.includes.slice(0, 5).map((item, index) => ({
    id: `${menu.id}-include-${index}`,
    name: item,
    quantity: 1,
  }));

  const foodAndBeverageTotal =
    menu.pricePerPerson * personCount +
    selectedAddOns.reduce((sum, addOn) => sum + addOn.price * addOn.quantity, 0);
  const deliveryFee = extractNumericValue(restaurant.deliveryFee, menu.summary?.deliveryFee ?? 0);
  const taxAndService = menu.summary?.vat ?? 0;
  const discountPercent = extractDiscountPercent(restaurant.discount);
  const discountAmount = Math.round(
    ((menu.pricePerPerson * personCount) * discountPercent) / 100,
  );
  const tipAmount = Math.round((foodAndBeverageTotal * tipPercent) / 100);
  const total =
    foodAndBeverageTotal + deliveryFee + taxAndService + tipAmount - discountAmount;

  const formattedSchedule = [formatDisplayDate(deliveryDate), formatDisplayTime(deliveryTime)]
    .filter(Boolean)
    .join(", ");

  const tipOptions = [10, 15, 20, 25];
  const tablewareOptions = ["napkins", "utensils", "plates/bowls"];
  const orderCards = [
    {
      id: `${menu.id}-main`,
      kind: "menu",
      title: menu.title,
      price: foodAndBeverageTotal,
      details: baseItems.map((item) => item.name),
      note: `Serves ${personCount}`,
      actionLabel: "Delete",
      actionTone: "danger",
    },
    ...selectedAddOns.map((addOn) => ({
      id: addOn.id,
      kind: "addon",
      title: addOn.title,
      price: addOn.price * addOn.quantity,
      details: [`Qty: ${addOn.quantity}`, "Add-on item"],
      note: `Serves ${personCount}`,
      actionLabel: "Delete",
      actionTone: "danger",
    })),
    {
      id: `${menu.id}-tableware`,
      kind: "tableware",
      title: "Tableware",
      price: 0,
      details: [
        `Include: ${
          selectedTableware.length ? selectedTableware.join(", ") : "none"
        }`,
        ...(tablewareInstructions ? [`Note: ${tablewareInstructions}`] : []),
      ],
      note: "",
      actionLabel: "Edit",
      actionTone: "edit",
    },
  ];

  const toggleTablewareItem = (item) => {
    setDraftTableware((current) =>
      current.includes(item)
        ? current.filter((entry) => entry !== item)
        : [...current, item],
    );
  };

  const openTablewareModal = () => {
    setDraftTableware(selectedTableware);
    setDraftTablewareInstructions(tablewareInstructions);
    setIsTablewareModalOpen(true);
  };

  const closeTablewareModal = () => {
    setDraftTableware(selectedTableware);
    setDraftTablewareInstructions(tablewareInstructions);
    setIsTablewareModalOpen(false);
  };

  const saveTablewareModal = () => {
    setSelectedTableware(draftTableware);
    setTablewareInstructions(draftTablewareInstructions.trim());
    setIsTablewareModalOpen(false);
  };

  return (
    <>
      <aside className="border-t border-[#ddd6cd] pt-4 lg:sticky lg:top-24 lg:self-start lg:border-t-0 lg:pt-0">
        <div className="max-h-[calc(100vh-7rem)] overflow-y-auto rounded-[2px] border border-[#d7d7d7] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] [scrollbar-gutter:stable]">
          <div className="px-2.5 py-2">
            <SectionTitle className="text-3xl">Order Summary</SectionTitle>

            {orderCards.map((card, index) => (
              <OrderItemCard
                key={card.id}
                index={index + 1}
                title={card.title}
                price={card.price}
                details={card.details}
                note={card.note}
                actionLabel={card.actionLabel}
                actionTone={card.actionTone}
                onAction={
                  card.kind === "tableware"
                    ? openTablewareModal
                    : card.kind === "addon"
                      ? () => onRemoveAddOn?.(card.id)
                      : undefined
                }
              />
            ))}

            <div className="border-b border-[#e1e1e1] py-2.5">
              <SummaryRow
                label="Food & beverage"
                value={formatCurrency(foodAndBeverageTotal)}
              />
              <p className="type-subpara mt-0.5 text-[#8a8a8a]">{restaurant.name}</p>

              <div className="mt-2 space-y-1.5">
                <SummaryRow
                  label="Restaurant delivery fee"
                  value={formatCurrency(deliveryFee)}
                  muted
                />
                <p className="type-subpara text-[#8a8a8a]">
                  This is not a driver tip
                </p>
                <SummaryRow
                  label={`${toTitleCase("sales tax")}`}
                  value={formatCurrency(taxAndService)}
                  muted
                />
                {discountAmount > 0 ? (
                  <SummaryRow
                    label={`${discountPercent}% discount`}
                    value={`-${formatCurrency(discountAmount)}`}
                  />
                ) : null}
              </div>
            </div>

            <div className="border-b border-[#e1e1e1] py-2.5">
              <div className="flex items-center justify-between gap-3">
                <p className="type-subpara text-[#171717]">Tip</p>
                <span className="type-subpara font-bold text-[#171717]">
                  {formatCurrency(tipAmount)}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {tipOptions.slice(0, 3).map((option) => (
                  <CompactPillButton
                    key={option}
                    active={option === tipPercent}
                    onClick={() => setTipPercent(option)}
                  >
                    {option}%
                  </CompactPillButton>
                ))}
                <CompactPillButton>Other</CompactPillButton>
              </div>
            </div>

            <div className="border-b border-[#e1e1e1] py-2.5">
              <SectionTitle bordered={false}>Event Details</SectionTitle>

              <div className="mt-3 space-y-3">
                <div>
                  <p className="type-subpara text-[#171717]">Delivery Date &amp; Time</p>
                  <div className="mt-1.5 rounded-[2px] border border-[#d7d7d7] bg-white px-3 py-2">
                    <p className="type-subpara text-[#666]">
                      {formattedSchedule || "25 Mar, 2026 | 02:30 PM"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="type-subpara text-[#171717]">Person Count</p>
                  <div className="mt-1.5 inline-flex items-center rounded-[2px] border border-[#d7d7d7] bg-white">
                    <QuantityButton onClick={onDecrease}>-</QuantityButton>
                    <span className="type-subpara flex h-6 min-w-[34px] items-center justify-center px-2 text-[#2c2c2c]">
                      {personCount}
                    </span>
                    <QuantityButton onClick={onIncrease}>+</QuantityButton>
                  </div>
                </div>

                <p className="type-subpara text-center text-[#4f4f4f]">
                  Location: House # 22 Bergen
                </p>
              </div>
            </div>

            <div className="border-t border-[#e1e1e1] pt-2.5">
              <div className="mb-2.5 flex items-center justify-between gap-3">
                <span className="type-subpara font-bold text-[#171717]">Total</span>
                <span className="type-subpara font-bold text-[#171717]">
                  {formatCurrency(total)}
                </span>
              </div>

              <button
                type="button"
                className="type-subpara w-full rounded-[2px] bg-[#cf6e38] px-4 py-1.5 font-bold text-white transition hover:bg-[#bc5f2e]"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </aside>

      {isTablewareModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4">
          <div className="w-full max-w-[560px] rounded-[20px] bg-white p-5 shadow-[0_24px_60px_rgba(0,0,0,0.22)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="type-h3 text-[#171717]">Tableware</h2>
                <p className="type-para mt-2 max-w-[470px] text-[#2d2d2d]">
                  Need some tableware for your event? Add them below, and we&apos;ll
                  let the caterer know! The quantity they send will be based on your
                  headcount.
                </p>
              </div>

              <button
                type="button"
                onClick={closeTablewareModal}
                className="text-[36px] leading-none text-[#171717]"
                aria-label="Close tableware editor"
              >
                ×
              </button>
            </div>

            <div className="mt-7">
              <p className="type-h5 text-[#171717]">Please tell us what you need</p>

              <div className="mt-4 space-y-3">
                {tablewareOptions.map((item) => {
                  const isSelected = draftTableware.includes(item);

                  return (
                    <label
                      key={item}
                      className="flex cursor-pointer items-center gap-3"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleTablewareItem(item)}
                        className="sr-only"
                      />
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-[4px] border ${
                          isSelected
                            ? "border-[#cf6e38] bg-[#cf6e38] text-white"
                            : "border-[#c8c8c8] bg-white text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                      <span className="type-para text-[#171717]">
                        {toTitleCase(item)}
                      </span>
                    </label>
                  );
                })}
              </div>

              <button
                type="button"
                className="type-h5 mt-6 underline underline-offset-2 text-[#171717]"
              >
                Add special instructions
              </button>

              <textarea
                rows={5}
                value={draftTablewareInstructions}
                onChange={(event) =>
                  setDraftTablewareInstructions(event.target.value)
                }
                placeholder="Let the restaurant know of any allergies or preparation instructions."
                className="type-para mt-4 w-full rounded-[14px] border border-[#cfc7bd] px-4 py-3 text-[#171717] outline-none placeholder:text-[#9b9b9b]"
              />
            </div>

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeTablewareModal}
                className="type-h5 rounded-full border border-[#171717] px-6 py-3 text-[#171717]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveTablewareModal}
                className="type-h5 rounded-full bg-[#cf6e38] px-6 py-3 text-white"
              >
                Update Item
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
