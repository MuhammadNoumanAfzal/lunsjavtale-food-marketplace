import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiChevronDown,
  FiMapPin,
  FiShoppingCart,
  FiCalendar,
  FiSearch,
  FiX,
} from "react-icons/fi";

const dropdownOptions = {
  city: ["Bergen", "Oslo", "Stavanger", "Trondheim"],
  time: ["Any time", "Morning", "Afternoon", "Evening"],
  event: ["Event details", "Office lunch", "Birthday", "Wedding"],
};

export default function CommonNavbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    city: "Bergen",
    time: "Any time",
    event: "Event details",
  });
  const [searchValue, setSearchValue] = useState("");

  const toggleDropdown = (key) => {
    setOpenDropdown((current) => (current === key ? null : key));
  };

  const handleSelect = (key, value) => {
    setSelectedFilters((current) => ({ ...current, [key]: value }));
    setOpenDropdown(null);
  };

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className=" grid w-full  grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-1.5">
        <Link to="/" className="shrink-0">
          <img
            src="/home/logo.png"
            alt="Lunsjavtale"
            className="h-17 w-33 object-contain"
          />
        </Link>

        <div className="hidden min-w-0 items-center justify-self-center lg:flex">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="flex h-8 items-center overflow-hidden rounded-full border border-[#d9d1c7] bg-white">
                <button
                  type="button"
                  onClick={() => toggleDropdown("city")}
                  className="type-subpara flex h-full items-center gap-1.5 px-3 text-[#434343]"
                >
                  <FiMapPin className="text-[14x] text-[#8f8f8f]" />
                  <span className="text-[16px]">{selectedFilters.city}</span>
                  <FiChevronDown className="text-[10px] text-[#8f8f8f]" />
                </button>

                <div className="h-4 w-px bg-[#e3ddd6]" />

                <button
                  type="button"
                  onClick={() => toggleDropdown("time")}
                  className="type-subpara flex h-full items-center gap-1.5 px-3 text-[#5d5d5d]"
                >
                  <FiCalendar className="text-[14px] text-[#8f8f8f]" />
                  <span className="text-[16px]">{selectedFilters.time}</span>
                  <FiChevronDown className="text-[10px] text-[#8f8f8f]" />
                </button>

                <div className="h-4 w-px bg-[#e3ddd6]" />

                <button
                  type="button"
                  onClick={() => toggleDropdown("event")}
                  className="type-subpara flex h-full items-center gap-1.5 px-3 text-[#5d5d5d]"
                >
                  <span className="text-[16px]">{selectedFilters.event}</span>
                  <FiChevronDown className="text-[10px] text-[#8f8f8f]" />
                </button>
              </div>

              {openDropdown ? (
                <div className="absolute left-0 top-[calc(100%+8px)] z-50 min-w-[580px] rounded-2xl border border-[#ece7df] bg-white p-2 shadow-lg">
                  {dropdownOptions[openDropdown].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelect(openDropdown, option)}
                      className="type-subpara flex w-full rounded-xl px-3 py-2 text-left text-[#4f4f4f] transition hover:bg-[#f7f2ec]"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="flex h-8 w-full max-w-[220px] items-center rounded-full border border-[#ddd6cd] bg-white pl-3 pr-1">
              <input
                type="text"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search restaurant..."
                className="text-[10px] w-full bg-transparent text-[#5c5c5c] outline-none placeholder:text-[#b8b1a9]"
              />

              {searchValue ? (
                <button
                  type="button"
                  onClick={() => setSearchValue("")}
                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-[#a7a099]"
                  aria-label="Clear search"
                >
                  <FiX className="text-[11px]" />
                </button>
              ) : null}

              <button
                type="button"
                className="ml-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#c85f33] text-white"
                aria-label="Search"
              >
                <FiSearch className="text-[16px]" />
              </button>
            </div>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Link
            to="/"
            className="type-h5 hidden text-[#2f2f2f] transition hover:text-[#c85f33] md:inline-flex"
          >
            Contact us
          </Link>

          <Link
            to="/"
            className="type-h6 rounded-full bg-[#c85f33] px-6 py-2 text-white transition hover:bg-[#b6542c]"
          >
            Sign in
          </Link>

          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center text-[18px] text-[#2f2f2f] transition hover:text-[#c85f33]"
            aria-label="Cart"
          >
            <div className="text-3xl">
              {" "}
              <FiShoppingCart />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
