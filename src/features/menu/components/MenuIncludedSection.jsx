function getIncludeDescription(item) {
  const descriptions = {
    "Seasonal salad":
      "Fresh seasonal greens and vegetables prepared to complement the main menu.",
    "Fresh bread":
      "Daily baked bread selection served ready for sharing.",
    "Main menu selection":
      "The core dish package prepared for your selected group size.",
    "Dessert bite":
      "A light sweet finish included with each order bundle.",
    "Serving setup":
      "Basic serving trays and setup support for smooth delivery handoff.",
    "Chef-selected items":
      "A curated assortment chosen to match the menu style and portion size.",
    Packaging: "Neatly packed for transport and easy event distribution.",
    "Packaging and setup":
      "Secure catering packaging with setup-ready presentation.",
    "Cutlery on request":
      "Disposable cutlery and napkins can be included when needed.",
    "Fast marketplace delivery":
      "Priority marketplace handoff designed for dependable arrival.",
  };

  return descriptions[item] ?? "Included as part of this menu package.";
}

export default function MenuIncludedSection({
  includes,
  openIncludeItems,
  onToggleInclude,
}) {
  return (
    <div className="mt-5 rounded-[20px] border border-[#e9e0d6] bg-white p-4 shadow-[0_16px_36px_rgba(37,24,8,0.05)] sm:mt-8 sm:rounded-[24px] sm:p-5">
      <h2 className="text-[17px] font-semibold text-black sm:text-[18px]">
        What&apos;s included in this menu
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {includes.map((item) => (
          <div
            key={item}
            className="rounded-[14px] border border-[#eee5db] px-3 py-3 sm:px-4"
          >
            <button
              type="button"
              onClick={() => onToggleInclude(item)}
              className="flex w-full cursor-pointer items-center justify-between text-left"
            >
              <span className="pr-3 text-[13px] text-black sm:text-[14px]">{item}</span>
              <span className="text-[18px] text-black">
                {openIncludeItems.includes(item) ? "-" : "+"}
              </span>
            </button>

            {openIncludeItems.includes(item) ? (
              <p className="mt-3 border-t border-[#f1e8dd] pt-3 text-[12px] leading-6 text-black sm:text-[13px]">
                {getIncludeDescription(item)}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
