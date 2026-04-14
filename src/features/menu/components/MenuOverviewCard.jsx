import {
  FiClock,
  FiMapPin,
  FiStar,
  FiTruck,
} from "react-icons/fi";

function InfoTile({ icon, label, title, subtitle }) {
  return (
    <div className="rounded-[16px] border border-[#eadfce] bg-[#fffaf5] p-3 sm:rounded-[18px] sm:p-4">
      <div className="flex items-center gap-2 text-black">
        {icon}
        <span className="text-[13px] font-semibold">{label}</span>
      </div>
      <p className="mt-2 text-[16px] font-semibold text-black sm:text-[18px]">{title}</p>
      <p className="mt-1 text-[12px] text-black sm:text-[13px]">{subtitle}</p>
    </div>
  );
}

export default function MenuOverviewCard({ menu, restaurant }) {
  return (
    <div className="mt-5 rounded-[20px] border border-[#eadfce] bg-white p-4 shadow-[0_16px_36px_rgba(37,24,8,0.05)] sm:mt-6 sm:rounded-[26px] sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#7d6d5a]">
            Menu
          </p>
          <h1 className="mt-2 text-[24px] font-semibold leading-tight text-black sm:type-h3">
            {menu.title}
          </h1>
          <p className="mt-2 text-[14px] font-medium text-black sm:text-[15px]">
            {restaurant.name}
          </p>
          <p className="mt-2 max-w-[720px] text-[13px] leading-6 text-black sm:text-[14px] sm:leading-7">
            {restaurant.description}
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-1 rounded-full border border-[#ebdfcf] bg-[#fff6e6] px-3 py-1.5 text-[13px] font-semibold text-black">
          <FiStar className="fill-[#f4b400] text-[#f4b400]" />
          <span>{menu.rating}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-5 sm:gap-3">
        <div className="rounded-full bg-[#ffe9df] px-3 py-1 text-[11px] font-semibold text-[#9a431f] sm:text-[12px]">
          NOK {menu.pricePerPerson} per person
        </div>
        <div className="rounded-full border border-[#ddd3c7] px-3 py-1 text-[11px] text-black sm:text-[12px]">
          Minimum {menu.minimumOrder} people
        </div>
        <div className="rounded-full border border-[#ddd3c7] px-3 py-1 text-[11px] text-black sm:text-[12px]">
          {restaurant.deliveryFee}
        </div>
        <div className="rounded-full border border-[#ddd3c7] px-3 py-1 text-[11px] text-black sm:text-[12px]">
          {restaurant.distance}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2 xl:grid-cols-4">
        <InfoTile
          icon={<FiStar className="fill-[#f4b400] text-[#f4b400]" />}
          label="Rating"
          title={`${menu.rating} / 5`}
          subtitle="Top-rated vendor in this area"
        />
        <InfoTile
          icon={<FiMapPin />}
          label="Location"
          title={restaurant.location}
          subtitle={restaurant.distance}
        />
        <InfoTile
          icon={<FiTruck />}
          label="Delivery"
          title={restaurant.deliveryFee}
          subtitle={restaurant.discount}
        />
        <InfoTile
          icon={<FiClock />}
          label="Timing"
          title={restaurant.deliveryTime}
          subtitle={restaurant.cuisines.join(" | ")}
        />
      </div>

      <p className="mt-5 max-w-[780px] text-[13px] leading-6 text-black sm:mt-6 sm:text-[14px] sm:leading-7">
        {menu.description}
      </p>
    </div>
  );
}
