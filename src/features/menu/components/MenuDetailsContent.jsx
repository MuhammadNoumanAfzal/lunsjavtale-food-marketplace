import { useState } from "react";
import { FiChevronDown, FiMapPin, FiStar } from "react-icons/fi";

function formatVendorDiscount(discount) {
  return discount?.replace(/\s+on\s+selected\s+bundles?/i, "") ?? "";
}

export default function MenuDetailsContent({
  menu,
  restaurant,
  personCount,
  onPersonCountChange,
  note,
  onNoteChange,
}) {
  const [showFullMenu, setShowFullMenu] = useState(false);
  const [openIncludeItems, setOpenIncludeItems] = useState([]);
  const visibleIncludes = showFullMenu ? menu.includes : menu.includes.slice(0, 5);

  return (
    <div className="border-r border-[#ddd6cd] pr-0 lg:pr-6">
      <div className="border-b border-[#ddd6cd] pb-4">
        <h1 className="type-h2 leading-tight text-[#1f1f1f]">{menu.title}</h1>

        <div className="mt-2">
          <span className="type-subpara inline-flex rounded-full bg-[#e7e7e7] px-3 py-1 text-[#1f1f1f]">
            {restaurant.name}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="type-subpara inline-flex items-center gap-1 rounded-full border border-[#d9d2ca] px-2 py-0.5 text-[#3a3a3a]">
            <FiStar className="fill-[#f4b400] text-[#f4b400]" />
            {menu.rating}
          </span>
          <span className="type-subpara inline-flex items-center gap-1 rounded-full border border-[#d9d2ca] px-2 py-0.5 text-[#3a3a3a]">
            <FiMapPin className="text-[11px]" />
            Bergen
          </span>
          <span className="type-subpara inline-flex rounded-full border border-[#d9d2ca] px-2 py-0.5 text-[#3a3a3a]">
            Gluten free
          </span>
          {restaurant.discount ? (
            <span className="type-subpara inline-flex rounded-full bg-[#fff1eb] px-2 py-0.5 text-[#CF3A00]">
              {formatVendorDiscount(restaurant.discount)}
            </span>
          ) : null}
        </div>

        <div className="type-para mt-5 space-y-1 text-[#2b2b2b]">
          <p>Price: {menu.pricePerPerson} per person</p>
          <p>Minimum Persons: {menu.minimumOrder}</p>
          <p>Vendor: {restaurant.name}</p>
        </div>

        <p className="type-para mt-5 max-w-[44ch] text-[#4b4b4b]">
          {menu.description}
        </p>
      </div>

      <div className="border-b border-[#ddd6cd] py-4">
        <h2 className="type-h5 text-[#1f1f1f]">
          What&apos;s Included in this Menu
        </h2>

        <div className="mt-3 space-y-2">
          {visibleIncludes.map((item, index) => {
            const isOpen = openIncludeItems.includes(item);

            return (
              <div key={item}>
                <button
                  type="button"
                  onClick={() =>
                    setOpenIncludeItems((current) =>
                      current.includes(item)
                        ? current.filter((entry) => entry !== item)
                        : [...current, item],
                    )
                  }
                  className="flex w-full items-center gap-3 text-left"
                >
                  <img
                    src={menu.gallery[index % menu.gallery.length]}
                    alt={item}
                    className="h-10 w-16 rounded-[4px] object-cover"
                  />
                  <span className="type-para flex-1 text-[#1f1f1f]">{item}</span>
                  <FiChevronDown
                    className={`text-[16px] text-[#6b6b6b] transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen ? (
                  <p className="type-subpara ml-[76px] mt-2 text-[#6b6b6b]">
                    Included as part of this selected menu bundle.
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setShowFullMenu((current) => !current)}
          className="type-para mt-3 text-[#2f2f2f]"
        >
          {showFullMenu ? "Hide Full Menu details.." : "View Full Menu details.."}
        </button>
      </div>

      <div className="border-b border-[#ddd6cd] py-4">
        <div className="max-w-[340px] rounded-[6px] bg-[#efefef] px-4 py-3">
          <p className="type-h5 text-[#1f1f1f]">
            Minimum Order Requirement
          </p>
          <p className="type-para mt-2 text-[#4b4b4b]">
            Minimum order required:{" "}
            <span className="font-bold text-[#1f1f1f]">
              {menu.minimumOrder} Persons
            </span>
          </p>
        </div>
      </div>

      <div className="type-para border-b border-[#ddd6cd] py-6 text-[#1f1f1f]">
        <h3 className="type-h4 font-bold">Delivery Date &amp; Time</h3>
        <p className="mt-2">Date: {menu.deliveryDate}</p>
        <p className="mt-1">Time: {menu.deliveryWindow}</p>

        <h3 className="type-h4 mt-4 font-bold">Event Details</h3>
        <div className="mt-2 flex items-center gap-2">
          <span>Persons:</span>
          <select
            value={personCount}
            onChange={(event) => onPersonCountChange(Number(event.target.value))}
            className="rounded-[3px] border border-[#bfbfbf] bg-white px-2 py-1 text-[12px] outline-none"
          >
            {Array.from({ length: 31 }, (_, index) => menu.minimumOrder + index).map(
              (value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ),
            )}
          </select>
        </div>
        <p className="mt-1">Location: {menu.deliveryAddress}</p>
      </div>

      <div className="py-4">
        <h3 className="type-para font-bold text-[#1f1f1f]">Add Note for Vendor</h3>
        <textarea
          rows={5}
          value={note}
          onChange={(event) => onNoteChange(event.target.value)}
          placeholder="Add Note..."
          className="type-subpara mt-2 w-full rounded-[2px] border border-[#d9d2ca] px-3 py-2 text-[#1f1f1f] outline-none placeholder:text-[#b3aba3]"
        />
      </div>
    </div>
  );
}
