import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getMenuBySlug } from "../data/menuData";
import HeroSection from "../components/HeroSection";
import MenuAddOnsSection from "../components/MenuAddOnsSection";
import MenuDetailsContent from "../components/MenuDetailsContent";
import MenuSummaryPanel from "../components/MenuSummaryPanel";

export default function MenuDetailsPage() {
  const { menuId } = useParams();
  const menu = getMenuBySlug(menuId);
  const [personCount, setPersonCount] = useState(menu?.minimumOrder ?? 20);
  const [vendorNote, setVendorNote] = useState("");
  const [addOnQuantities, setAddOnQuantities] = useState({});
  const [deliveryDate, setDeliveryDate] = useState("2026-03-25");
  const [deliveryTime, setDeliveryTime] = useState("14:30");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [menuId]);

  useEffect(() => {
    setPersonCount(menu?.minimumOrder ?? 20);
    setVendorNote("");
    setAddOnQuantities({});
    setDeliveryDate("2026-03-25");
    setDeliveryTime("14:30");
  }, [menuId]);

  if (!menu) {
    return <Navigate to="/" replace />;
  }
  const restaurant = menu.restaurant;

  return (
    <section className="bg-[#fffdfa] px-3 py-4 text-black sm:px-6 sm:py-8 lg:px-20">
      <div className=" max-w-7xl mx-auto">
        <HeroSection
          title={menu.title}
          gallery={menu.gallery}
          restaurant={restaurant}
        />

        <div className="border-x border-b border-[#ddd6cd] bg-white px-4 py-4 shadow-[0_10px_28px_rgba(37,24,8,0.06)] sm:px-5">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-6">
            <MenuDetailsContent
              menu={menu}
              restaurant={restaurant}
              personCount={personCount}
              onPersonCountChange={setPersonCount}
              deliveryDate={deliveryDate}
              deliveryTime={deliveryTime}
              onDeliveryDateChange={setDeliveryDate}
              onDeliveryTimeChange={setDeliveryTime}
              note={vendorNote}
              onNoteChange={setVendorNote}
            />

            <MenuSummaryPanel
              menu={menu}
              restaurant={restaurant}
              personCount={personCount}
              addOns={menu.addOns}
              addOnQuantities={addOnQuantities}
              deliveryDate={deliveryDate}
              deliveryTime={deliveryTime}
              onDeliveryDateChange={setDeliveryDate}
              onDeliveryTimeChange={setDeliveryTime}
              onDecrease={() =>
                setPersonCount((current) => Math.max(menu.minimumOrder, current - 1))
              }
              onIncrease={() => setPersonCount((current) => current + 1)}
            />
          </div>

          <button
            type="button"
            className="mt-4 w-full cursor-pointer rounded-[2px] bg-[#cf6e38] px-4 py-1.5 text-[16px] font-bold text-white"
          >
            Add to Cart
          </button>

          <MenuAddOnsSection
            addOns={menu.addOns}
            addOnQuantities={addOnQuantities}
            onDecrease={(addOnId) =>
              setAddOnQuantities((current) => ({
                ...current,
                [addOnId]: Math.max(0, (current[addOnId] ?? 0) - 1),
              }))
            }
            onIncrease={(addOnId) =>
              setAddOnQuantities((current) => ({
                ...current,
                [addOnId]: (current[addOnId] ?? 0) + 1,
              }))
            }
          />
        </div>
      </div>
    </section>
  );
}
