import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getMenuBySlug } from "../data/menuData";
import MenuAddOnsSection from "../components/MenuAddOnsSection";
import MenuDeliveryInfoCard from "../components/MenuDeliveryInfoCard";
import MenuGallery from "../components/MenuGallery";
import MenuIncludedSection from "../components/MenuIncludedSection";
import MenuOrderSummarySidebar from "../components/MenuOrderSummarySidebar";
import MenuOverviewCard from "../components/MenuOverviewCard";
import MenuVendorNotesCard from "../components/MenuVendorNotesCard";

export default function MenuDetailsPage() {
  const { menuId } = useParams();
  const menu = getMenuBySlug(menuId);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState([]);
  const [openIncludeItems, setOpenIncludeItems] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [menuId]);

  useEffect(() => {
    setSelectedAddOnIds([]);
    setOpenIncludeItems([]);
    setQuantity(1);
  }, [menuId]);

  if (!menu) {
    return <Navigate to="/" replace />;
  }

  const selectedAddOns = menu.addOns.filter((addOn) =>
    selectedAddOnIds.includes(addOn.id),
  );
  const addOnsTotal = selectedAddOns.reduce(
    (sum, addOn) => sum + addOn.price,
    0,
  );
  const total =
    menu.summary.subtotal * quantity +
    addOnsTotal +
    menu.summary.deliveryFee +
    menu.summary.vat;
  const restaurant = menu.restaurant;

  return (
    <section className="bg-[#fffdfa] px-3 py-4 text-black sm:px-6 sm:py-8 lg:px-8">
      <div className="">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_360px] lg:gap-8">
          <div>
            <MenuGallery
              title={menu.title}
              gallery={menu.gallery}
              restaurant={restaurant}
            />
            <MenuOverviewCard menu={menu} restaurant={restaurant} />
            <MenuIncludedSection
              includes={menu.includes}
              openIncludeItems={openIncludeItems}
              onToggleInclude={(item) =>
                setOpenIncludeItems((current) =>
                  current.includes(item)
                    ? current.filter((entry) => entry !== item)
                    : [...current, item],
                )
              }
            />

            <div className="mt-5 grid gap-5 lg:mt-8 lg:gap-6 lg:grid-cols-2">
              <MenuDeliveryInfoCard menu={menu} />
              <MenuVendorNotesCard />
            </div>

            <MenuAddOnsSection
              addOns={menu.addOns}
              selectedAddOnIds={selectedAddOnIds}
              onToggleAddOn={(addOnId) =>
                setSelectedAddOnIds((current) =>
                  current.includes(addOnId)
                    ? current.filter((id) => id !== addOnId)
                    : [...current, addOnId],
                )
              }
            />
          </div>

          <MenuOrderSummarySidebar
            menu={menu}
            quantity={quantity}
            restaurant={restaurant}
            total={total}
            selectedAddOns={selectedAddOns}
            onDecrease={() => setQuantity((current) => Math.max(1, current - 1))}
            onIncrease={() => setQuantity((current) => current + 1)}
          />
        </div>
      </div>
    </section>
  );
}
