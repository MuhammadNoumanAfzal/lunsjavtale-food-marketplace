import { useMemo, useState } from "react";
import { FiCheck, FiChevronDown, FiStar } from "react-icons/fi";
import {
  browseFilterChips,
  dietaryOptions,
  distanceOptions,
  offerOptions,
  orderMinimumOptions,
  pricingOptions,
  ratingOptions,
  sortByOptions,
} from "../../features/browse/data/browseData";

const DROPDOWN_CHIP_KEYS = new Set([
  "sort",
  "rating",
  "dietary",
  "offer",
  "pricing",
  "other",
]);

const createDefaultOtherFilters = () => ({
  individualPackaging: false,
  newlyAdded: false,
  smallBusiness: false,
  budgetPerPerson: "",
  orderMinimum: "Any price",
  distance: "Any distance",
});

const FILTER_BAR_VARIANTS = {
  default: {
    containerClassName:
      "relative mt-5 flex flex-wrap items-center gap-2 xl:flex-nowrap xl:justify-between",
    chipsWrapperClassName:
      "grid w-full grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center xl:w-auto xl:flex-nowrap",
    inactiveChipClassName: "border-[#ddd5cc] bg-white text-[#666666]",
    applyButtonClassName:
      "type-h6 cursor-pointer ml-auto inline-flex h-10 items-center rounded-full bg-[#c96b33] px-10 text-white transition hover:bg-[#b85e2a]",
  },
  preview: {
    containerClassName:
      "mt-5 flex flex-wrap items-center gap-2 sm:flex-nowrap sm:justify-between",
    chipsWrapperClassName:
      "grid w-full grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-2",
    inactiveChipClassName: "border-[#bdbdbd] bg-white text-[#666666]",
    applyButtonClassName:
      "type-h6 inline-flex h-8 shrink-0 items-center rounded-full bg-[#c96b33] px-5 text-white hover:bg-[#b85e2a]",
  },
};

function FilterDropdown({ minWidthClassName, children, onClear }) {
  return (
    <div
      className={`absolute left-0 top-[calc(100%+12px)] z-30 rounded-[12px] border border-[#d9d9d9] bg-white p-2 shadow-[0_12px_26px_rgba(0,0,0,0.16)] ${minWidthClassName}`}
    >
      <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t border-[#d9d9d9] bg-white" />
      <div className="space-y-1">{children}</div>
      <div className="mt-2 flex justify-end">
        <button
          onClick={onClear}
          className="type-paara cursor-pointer rounded-[6px] border border-[#bcbcbc] px-2 py-1 text-black"
        >
          Clear filter
        </button>
      </div>
    </div>
  );
}

function MultiSelectIndicator({ isSelected }) {
  return (
    <span
      className={`flex h-3.5 w-3.5 items-center justify-center rounded border ${
        isSelected
          ? "border-[#c85f33] bg-[#c85f33]"
          : "border-[#bcbcbc] bg-white"
      }`}
    >
      {isSelected ? (
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
      ) : null}
    </span>
  );
}

function InlineSelectDropdown({
  label,
  value,
  options,
  isOpen,
  onToggle,
  onSelect,
  menuPosition = "bottom",
}) {
  const menuPositionClassName =
    menuPosition === "top" ? "bottom-[calc(100%+6px)]" : "top-[calc(100%+6px)]";

  return (
    <div className="relative">
      <p className="type-para mb-1 text-black">{label}</p>
      <button
        type="button"
        onClick={onToggle}
        className="type-subpara flex w-full items-center justify-between rounded-[2px] border border-[#cfcfcf] bg-white px-3 py-2 text-left text-black outline-none"
      >
        <span>{value}</span>
        <FiChevronDown className="text-[18px] text-[#666]" />
      </button>

      {isOpen ? (
        <div
          className={`absolute left-0 z-20 w-[250px] rounded-[8px] border border-[#d9d9d9] bg-white p-1 shadow-[0_12px_26px_rgba(0,0,0,0.16)] ${menuPositionClassName}`}
        >
          {options.map((option) => {
            const isSelected = option === value;

            return (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(option)}
                className={`type-subpara flex w-full items-center justify-between rounded-[6px] px-3 py-2 text-left transition ${
                  isSelected
                    ? "bg-[#f5f5f5] text-black"
                    : "text-black hover:bg-[#f7f2ec]"
                }`}
              >
                <span>{option}</span>
                <span className="flex w-4 justify-center">
                  {isSelected ? (
                    <FiCheck className="text-[14px] text-black" />
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function OtherFiltersModal({ otherFilters, setOtherFilters, onClose }) {
  const [openInlineDropdown, setOpenInlineDropdown] = useState(null);

  const updateOtherFilter = (key, value) => {
    setOtherFilters((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/10 px-4">
      <div className="w-full max-w-[440px] rounded-[12px] border border-[#d9d9d9] bg-white p-3 shadow-[0_18px_40px_rgba(0,0,0,0.2)]">
        <h1 className="type-h4 mb-3 text-black">Other Filters</h1>
        <div className="space-y-3">
          <label className="flex items-start gap-2  ">
            <input
              type="checkbox"
              checked={otherFilters.individualPackaging}
              onChange={(event) =>
                updateOtherFilter("individualPackaging", event.target.checked)
              }
              className="mt-1"
            />
            <span>
              <span className="type-para block text-black">
                Individual Packaging
              </span>
              <span className="type-subpara text-[#8a8a8a]">
                Restaurants that offer individually packaged items
              </span>
            </span>
          </label>

          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={otherFilters.newlyAdded}
              onChange={(event) =>
                updateOtherFilter("newlyAdded", event.target.checked)
              }
              className="mt-1"
            />
            <span>
              <span className="type-para block text-black">New</span>
              <span className="type-subpara text-[#8a8a8a]">
                Restaurants that are new to Lunsjavtale
              </span>
            </span>
          </label>

          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={otherFilters.smallBusiness}
              onChange={(event) =>
                updateOtherFilter("smallBusiness", event.target.checked)
              }
              className="mt-1"
            />
            <span className="type-para text-black">Small business</span>
          </label>

          <div>
            <p className="type-para mb-1 text-black">Budget per person</p>
            <input
              type="text"
              value={otherFilters.budgetPerPerson}
              onChange={(event) =>
                updateOtherFilter("budgetPerPerson", event.target.value)
              }
              placeholder="$"
              className="type-subpara w-full rounded-[2px] border border-[#cfcfcf] px-3 py-2 outline-none"
            />
          </div>

          <div className=" pt-10">
            <h4 className="type-h4 mb-3 text-black">Delivery filters</h4>

            <div className="space-y-3">
              <InlineSelectDropdown
                label="Order minimum"
                value={otherFilters.orderMinimum}
                options={orderMinimumOptions}
                isOpen={openInlineDropdown === "orderMinimum"}
                onToggle={() =>
                  setOpenInlineDropdown((current) =>
                    current === "orderMinimum" ? null : "orderMinimum",
                  )
                }
                onSelect={(option) => {
                  updateOtherFilter("orderMinimum", option);
                  setOpenInlineDropdown(null);
                }}
                menuPosition="bottom"
              />

              <InlineSelectDropdown
                label="Distance"
                value={otherFilters.distance}
                options={distanceOptions}
                isOpen={openInlineDropdown === "distance"}
                onToggle={() =>
                  setOpenInlineDropdown((current) =>
                    current === "distance" ? null : "distance",
                  )
                }
                onSelect={(option) => {
                  updateOtherFilter("distance", option);
                  setOpenInlineDropdown(null);
                }}
                menuPosition="top"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              onClick={() => {
                setOtherFilters(createDefaultOtherFilters());
                onClose();
              }}
              className="type-para cursor-pointer rounded-[6px] border border-[#bcbcbc] px-2 py-1 text-black"
            >
              Clear filter
            </button>
            <button
              onClick={onClose}
              className="type-para cursor-pointer rounded-[6px] bg-[#c85f33] px-2 py-1 text-white"
            >
              Apply filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BrowseFilterBar({
  variant = "default",
  onControlInteract,
  disabled = false,
}) {
  const [activeFilters, setActiveFilters] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedSort, setSelectedSort] = useState("Sort by");
  const [selectedRating, setSelectedRating] = useState("Ratings");
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [selectedOffers, setSelectedOffers] = useState([]);
  const [selectedPricing, setSelectedPricing] = useState("Pricing");
  const [otherFilters, setOtherFilters] = useState(createDefaultOtherFilters);
  const styles = FILTER_BAR_VARIANTS[variant] ?? FILTER_BAR_VARIANTS.default;

  const otherFilterCount = useMemo(
    () =>
      [
        otherFilters.individualPackaging,
        otherFilters.newlyAdded,
        otherFilters.smallBusiness,
        otherFilters.budgetPerPerson,
        otherFilters.orderMinimum !== "Any price",
        otherFilters.distance !== "Any distance",
      ].filter(Boolean).length,
    [otherFilters],
  );

  const chipLabels = {
    sort: selectedSort,
    rating: selectedRating,
    dietary:
      selectedDietary.length > 0
        ? `${selectedDietary.length} selected`
        : "Dietary options",
    offer:
      selectedOffers.length > 0 ? `${selectedOffers.length} selected` : "Offer",
    pricing: selectedPricing,
    other:
      otherFilterCount > 0 ? `${otherFilterCount} filters` : "Other Filters",
  };

  const toggleFilter = (key) => {
    setActiveFilters((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key],
    );
  };

  const toggleMultiSelect = (setter, option) => {
    setter((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    );
  };

  const handleChipClick = (chipKey) => {
    if (disabled) {
      return;
    }

    onControlInteract?.();

    if (DROPDOWN_CHIP_KEYS.has(chipKey)) {
      setOpenDropdown((current) => (current === chipKey ? null : chipKey));
      return;
    }

    setOpenDropdown(null);
    toggleFilter(chipKey);
  };

  return (
    <>
      <div className={styles.containerClassName}>
        <div className={styles.chipsWrapperClassName}>
          {browseFilterChips.map((chip) => {
            const isDropdownChip = DROPDOWN_CHIP_KEYS.has(chip.key);
            const isActive =
              activeFilters.includes(chip.key) ||
              (chip.key === "sort" && selectedSort !== "Sort by") ||
              (chip.key === "rating" && selectedRating !== "Ratings") ||
              (chip.key === "dietary" && selectedDietary.length > 0) ||
              (chip.key === "offer" && selectedOffers.length > 0) ||
              (chip.key === "pricing" && selectedPricing !== "Pricing") ||
              (chip.key === "other" && otherFilterCount > 0);

            return (
              <div key={chip.key} className="relative w-full sm:w-auto">
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => handleChipClick(chip.key)}
                  className={`type-subpara inline-flex h-10 w-full items-center justify-between gap-3 rounded-full border px-4 transition sm:min-w-[190px] sm:px-6 ${
                    isActive
                      ? "border-[#c6a343] bg-[#fff8dd] text-[#4e4e4e]"
                      : styles.inactiveChipClassName
                  } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
                >
                  <span className="flex w-3 justify-center">
                    {chip.icon === "star" ? (
                      <FiStar className="text-[11px] text-[#d5aa22]" />
                    ) : null}
                  </span>

                  <span>{chipLabels[chip.key] ?? chip.label}</span>

                  {isDropdownChip ? (
                    <FiChevronDown className="text-[16px]" />
                  ) : null}
                </button>

                {chip.key === "sort" && openDropdown === "sort" ? (
                  <FilterDropdown
                    minWidthClassName="min-w-[190px]"
                    onClear={() => {
                      setSelectedSort("Sort by");
                      setOpenDropdown(null);
                    }}
                  >
                    {sortByOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSelectedSort(option);
                          setOpenDropdown(null);
                        }}
                        className="type-para block w-full rounded-[8px] px-3 py-2 text-left text-black transition hover:bg-[#f7f2ec]"
                      >
                        {option}
                      </button>
                    ))}
                  </FilterDropdown>
                ) : null}

                {chip.key === "rating" && openDropdown === "rating" ? (
                  <FilterDropdown
                    minWidthClassName="min-w-[190px]"
                    onClear={() => {
                      setSelectedRating("Ratings");
                      setOpenDropdown(null);
                    }}
                  >
                    {ratingOptions.map((option, index) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSelectedRating(option);
                          setOpenDropdown(null);
                        }}
                        className="type-para flex w-full items-center gap-2 rounded-[8px] px-3 py-2 text-left text-black transition hover:bg-[#f7f2ec]"
                      >
                        <span className="flex items-center gap-1 text-[#d5aa22]">
                          <span className="text-black">{5 - index}</span>
                          <FiStar className="text-[11px] fill-[#d5aa22]" />
                        </span>
                        <span>{option.replace(/^\d+\s*/, "")}</span>
                      </button>
                    ))}
                  </FilterDropdown>
                ) : null}

                {chip.key === "dietary" && openDropdown === "dietary" ? (
                  <FilterDropdown
                    minWidthClassName="min-w-[190px]"
                    onClear={() => {
                      setSelectedDietary([]);
                      setOpenDropdown(null);
                    }}
                  >
                    {dietaryOptions.map((option) => {
                      const isSelected = selectedDietary.includes(option);

                      return (
                        <button
                          key={option}
                          onClick={() =>
                            toggleMultiSelect(setSelectedDietary, option)
                          }
                          className="type-para flex w-full items-center gap-2 rounded-[8px] px-3 py-2 text-left text-black transition hover:bg-[#f7f2ec]"
                        >
                          <MultiSelectIndicator isSelected={isSelected} />
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </FilterDropdown>
                ) : null}

                {chip.key === "offer" && openDropdown === "offer" ? (
                  <FilterDropdown
                    minWidthClassName="min-w-[190px]"
                    onClear={() => {
                      setSelectedOffers([]);
                      setOpenDropdown(null);
                    }}
                  >
                    {offerOptions.map((option) => {
                      const isSelected = selectedOffers.includes(option);

                      return (
                        <button
                          key={option}
                          onClick={() =>
                            toggleMultiSelect(setSelectedOffers, option)
                          }
                          className="type-para flex w-full items-center gap-2 rounded-[8px] px-3 py-2 text-left text-black transition hover:bg-[#f7f2ec]"
                        >
                          <MultiSelectIndicator isSelected={isSelected} />
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </FilterDropdown>
                ) : null}

                {chip.key === "pricing" && openDropdown === "pricing" ? (
                  <FilterDropdown
                    minWidthClassName="min-w-[190px]"
                    onClear={() => {
                      setSelectedPricing("Pricing");
                      setOpenDropdown(null);
                    }}
                  >
                    {pricingOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSelectedPricing(option);
                          setOpenDropdown(null);
                        }}
                        className="type-para block w-full rounded-[8px] px-3 py-2 text-left text-black transition hover:bg-[#f7f2ec]"
                      >
                        {option}
                      </button>
                    ))}
                  </FilterDropdown>
                ) : null}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          disabled={disabled}
          className={`${styles.applyButtonClassName} ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
        >
          Apply
        </button>
      </div>

      {openDropdown === "other" && !disabled ? (
        <OtherFiltersModal
          otherFilters={otherFilters}
          setOtherFilters={setOtherFilters}
          onClose={() => setOpenDropdown(null)}
        />
      ) : null}
    </>
  );
}
