import HeroSection from "../components/HeroSection";
import FoodBrowsePreviewSection from "../components/FoodBrowsePreviewSection";
import HowItWorksSection from "../components/HowItWorksSection";
import VendorShowcaseSection from "../components/VendorShowcaseSection";
import ProductShowcaseSection from "../components/ProductShowcaseSection";
import {
  popularVendors,
  featuredVendors,
  popularProducts,
} from "../data/homeData";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FoodBrowsePreviewSection />
      <VendorShowcaseSection
        title="Popular Vendors"
        vendors={popularVendors}
        seeAllHref="/vendors/popular"
      />
      <VendorShowcaseSection
        title="Featured Vendors"
        vendors={featuredVendors}
        seeAllHref="/vendors/featured"
      />
      <ProductShowcaseSection
        title="Popular Products"
        products={popularProducts}
        seeAllHref="/products/popular"
      />
      <HowItWorksSection />
    </div>
  );
}
