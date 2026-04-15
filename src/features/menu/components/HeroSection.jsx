import { FiArrowLeft, FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function HeroSection({ title, gallery, restaurant }) {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden rounded-t-[14px] bg-[#f3eee8] shadow-[0_14px_36px_rgba(37,24,8,0.1)]">
      <img
        src={gallery[0]}
        alt={title}
        className="h-[240px] w-full object-cover sm:h-[340px] lg:h-[420px]"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

      <button
        type="button"
        onClick={() => navigate(-1)}
        className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-black shadow-sm transition hover:bg-white sm:left-4 sm:top-4"
        aria-label="Go back"
      >
        <FiArrowLeft className="text-[13px]" />
      </button>

      <button
        type="button"
        className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-black shadow-sm transition hover:bg-white sm:right-4 sm:top-4"
        aria-label="Save menu"
      >
        <FiHeart className="text-[13px]" />
        <span>Save</span>
      </button>

      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
        {restaurant.deliveryTime ? (
          <span className="rounded-full bg-[#1f1f1f]/85 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm">
            {restaurant.deliveryTime}
          </span>
        ) : null}
      </div>
    </section>
  );
}
