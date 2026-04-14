import { Link } from "react-router-dom";
import VendorCard from "./VendorCard";

export default function VendorShowcaseSection({ title, vendors, seeAllHref }) {
  const visibleVendors = vendors.slice(0, 3);

  return (
    <section className="bg-white px-8 py-6 sm:px-10 lg:px-20">
      <div className="mx-auto w-full max-w-7xl">
        {title ? (
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="type-h3 font-semibold text-[#191919] sm:text-xl">
              {title}
            </h2>

            {seeAllHref ? (
              <Link
                to={seeAllHref}
                className="rounded-full border border-[#d7cec3] px-4 py-2 text-[13px] font-semibold text-[#2b2b2b] transition hover:border-[#c85f33] hover:text-[#c85f33]"
              >
                See all
              </Link>
            ) : null}
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleVendors.map((vendor) => (
            <VendorCard key={vendor.id ?? vendor.name} {...vendor} />
          ))}
        </div>
      </div>
    </section>
  );
}
