import { NavLink } from "react-router-dom";
import { browseTabs } from "../data/browseData";

export default function BrowseTabs({
  gapless = false,
  showCenterDivider = false,
}) {
  return (
    <div className="rounded-[22px] border border-[#bfbfbf] bg-[#d8d8d8] shadow-[inset_0_2px_4px_rgba(255,255,255,0.55),inset_0_-2px_4px_rgba(0,0,0,0.12)] md:rounded-[40px]">
      <div
        className={`relative grid grid-cols-2 ${gapless ? "gap-0" : "gap-1"}`}
      >
        {showCenterDivider ? (
          <span className="pointer-events-none absolute inset-y-1.5 left-1/2 z-10 w-px -translate-x-1/2 bg-[#8f8f8f] shadow-[1px_0_0_rgba(255,255,255,0.6),-1px_0_0_rgba(0,0,0,0.12)] md:inset-y-2" />
        ) : null}
        {browseTabs.map((tab, index) => (
          <NavLink
            key={tab.id}
            to={tab.href}
            className={({ isActive }) =>
              `flex min-h-[64px] items-center justify-center px-3 py-2 text-center transition md:min-h-0 md:px-4 md:py-2 ${
                isActive
                  ? "bg-[#c85f33] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.55)]"
                  : "bg-transparent text-[#1f1f1f] hover:bg-[#d2d2d2]"
              } ${
                gapless
                  ? index === 0
                    ? "rounded-l-[18px] rounded-r-none md:rounded-l-[34px]"
                    : "rounded-r-[18px] rounded-l-none md:rounded-r-[34px]"
                  : "rounded-[18px] md:rounded-[34px]"
              }`
            }
          >
            <span className="text-[14px] font-semibold leading-[1.15] md:text-[36px]">
              {tab.label}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
