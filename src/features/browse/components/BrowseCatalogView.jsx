import { useEffect } from "react";
import BrowseTabs from "./BrowseTabs";
import BrowseCategoryStrip from "../../../components/shared/BrowseCategoryStrip";
import BrowseFilterBar from "../../../components/shared/BrowseFilterBar";
import BrowseMenuSection from "./BrowseMenuSection";

export default function BrowseCatalogView({ categories, menuItems, moreOptions }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <section className="w-full px-4 py-12 ">
      <BrowseTabs />
      <BrowseCategoryStrip categories={categories} moreOptions={moreOptions} />
      <BrowseFilterBar />
      <BrowseMenuSection title="Menu" items={menuItems} />
    </section>
  );
}
