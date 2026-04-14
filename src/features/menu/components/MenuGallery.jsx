import { FiHeart } from "react-icons/fi";

export default function MenuGallery({ title, gallery, restaurant }) {
  return (
    <>
      <div className="relative overflow-hidden rounded-[20px] border border-[#eadfce] bg-[#f3eee8] shadow-[0_18px_44px_rgba(37,24,8,0.08)] sm:rounded-[28px]">
        <img
          src={gallery[0]}
          alt={title}
          className="h-[210px] w-full object-cover sm:h-[340px] lg:h-[420px]"
        />

        <button
          type="button"
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-black shadow-sm sm:right-4 sm:top-4 sm:h-10 sm:w-10"
          aria-label="Save menu"
        >
          <FiHeart className="text-[16px] sm:text-[18px]" />
        </button>

        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-2 sm:bottom-4 sm:left-4 sm:right-4">
          <div className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-black shadow-sm sm:px-3 sm:py-1.5 sm:text-[12px]">
            {restaurant.discount}
          </div>
          <div className="rounded-full bg-[#1f1f1f] px-2.5 py-1 text-[11px] font-semibold text-white sm:px-3 sm:py-1.5 sm:text-[12px]">
            {restaurant.deliveryTime}
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 sm:mt-4 sm:gap-3">
        {gallery.slice(0, 3).map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="overflow-hidden rounded-[14px] border border-[#eadfce] bg-[#f2f2f2] sm:rounded-[18px]"
          >
            <img
              src={image}
              alt={`${title} preview ${index + 1}`}
              className="h-[72px] w-full object-cover sm:h-[120px]"
            />
          </div>
        ))}
      </div>
    </>
  );
}
