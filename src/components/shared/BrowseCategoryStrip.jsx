import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

const CATEGORY_STRIP_VARIANTS = {
  default: {
    wrapperClassName: "relative",
    gridClassName:
      "mt-6 grid grid-cols-3 gap-y-6 bg-white py-5 sm:grid-cols-6",
    buttonClassName: "flex cursor-pointer flex-col items-center gap-2 text-center",
    iconWrapperClassName:
      "flex h-12 w-12 items-center justify-center rounded-full bg-[#f7f2ec]",
    imageClassName: "h-8 w-8 object-contain opacity-90",
    fallbackIcon: <FiMoreHorizontal className="text-h4 text-[#7a7a7a]" />,
    labelClassName: "type-h5  font-medium text-[#5f5f5f] sm:text-sm",
    panelClassName:
      "absolute right-10 top-[calc(100%+14px)] z-20 w-[92%] max-w-[820px] rounded-[12px] border border-[#dcdcdc] bg-white p-3 shadow-[0_14px_30px_rgba(0,0,0,0.18)]",
    panelPointerClassName:
      "absolute -top-[7px] right-[60px] h-3.5 w-3.5 rotate-45 border-l border-t border-[#dcdcdc] bg-white",
    panelGridClassName: "grid grid-cols-2 gap-2 sm:grid-cols-3",
    optionButtonClassName:
      "type-para rounded-full border   cursor-pointer border-[#bbbbbb] px-3 py-2 text-center text-[#333] transition hover:bg-[#f7f2ec]",
    clearButtonClassName:
      "type-subpara rounded-[6px] cursor-pointer border border-[#bcbcbc] px-3 py-1.5 text-[#333]",
  },
  preview: {
    wrapperClassName: "",
    gridClassName:
      "mt-8 grid grid-cols-3 gap-y-6 cursor-pointer sm:grid-cols-6",
    buttonClassName:
      "flex flex-col items-center cursor-pointer gap-2 text-center",
    iconWrapperClassName:
      "flex h-10 w-10 items-center justify-center text-[#8b8b8b]",
    imageClassName: "h-6 w-6 cursor-pointer object-contain opacity-90",
    fallbackIcon: (
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#e0e0e0] text-[#666666]">
        <FiMoreHorizontal className="text-[15px]" />
      </span>
    ),
    labelClassName: "type-h5 text-[#5f5f5f]",
    panelClassName:
      "absolute right-0 top-[calc(100%+14px)] z-20 w-[92%] max-w-[920px] rounded-[12px] border border-[#dcdcdc] bg-white p-3 shadow-[0_14px_30px_rgba(0,0,0,0.18)]",
    panelPointerClassName:
      "absolute -top-[7px] right-[26px] h-3.5 w-3.5 rotate-45 border-l border-t border-[#dcdcdc] bg-white",
    panelGridClassName: "grid grid-cols-2 gap-2 sm:grid-cols-3 cursor-pointer",
    optionButtonClassName:
      "type-para rounded-full border border-[#bbbbbb] px-3 py-2 text-center text-[#333] transition hover:bg-[#f7f2ec] cursor-pointer",
    clearButtonClassName:
      "type-para rounded-[6px] border border-[#bcbcbc] px-3 py-1.5 text-[#333]",
  },
};

export default function BrowseCategoryStrip({
  categories,
  moreOptions,
  variant = "default",
  isOpen,
  onOpenChange,
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const styles =
    CATEGORY_STRIP_VARIANTS[variant] ?? CATEGORY_STRIP_VARIANTS.default;
  const showMorePanel = isOpen ?? internalOpen;

  const handleMorePanelChange = (nextOpen) => {
    if (isOpen === undefined) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  return (
    <div className={styles.wrapperClassName}>
      <div className={styles.gridClassName}>
        {categories.map((item) => {
          const isMore = item.name === "More";

          return (
            <button
              key={item.name}
              onClick={() => {
                if (isMore) {
                  handleMorePanelChange(!showMorePanel);
                } else {
                  handleMorePanelChange(false);
                }
              }}
              className={styles.buttonClassName}
            >
              <span className={styles.iconWrapperClassName}>
                {item.icon ? (
                  <img
                    src={item.icon}
                    alt={item.name}
                    className={styles.imageClassName}
                  />
                ) : (
                  styles.fallbackIcon
                )}
              </span>
              <span className={styles.labelClassName} >{item.name}</span>
            </button>
          );
        })}
      </div>

      {showMorePanel ? (
        <div className={styles.panelClassName}>
          <span className={styles.panelPointerClassName} />
          <div className={styles.panelGridClassName}>
            {moreOptions.map((option) => (
              <button key={option} className={styles.optionButtonClassName}>
                {option}
              </button>
            ))}
          </div>

          <div className="mt-3 flex justify-end">
            <button
              onClick={() => handleMorePanelChange(false)}
              className={styles.clearButtonClassName}
            >
              Clear filter
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
