import { foodTypeMenuItems, occasionMenuItems } from "../../browse/data/browseData";
import { popularProducts } from "../../home/data/homeData";

function normalizeVendor(vendor) {
  return vendor?.replace(/^By\s+/, "") ?? "Lunsjavtale Kitchen";
}

function formatPriceValue(price) {
  const matched = `${price}`.match(/(\d+)/);
  return matched ? Number(matched[1]) : 199;
}

function createBrowseMenuDetail(item, index) {
  const basePrice = formatPriceValue(item.price);
  const vendor = normalizeVendor(item.vendor);

  return {
    id: `browse-${item.slug}`,
    slug: item.slug,
    title: item.title,
    vendor,
    vendorLine: item.vendor,
    rating: item.rating,
    image: item.image,
    gallery: [item.image, "/home/hero2.jpg", "/home/hero3.jpg"],
    pricePerPerson: basePrice,
    minimumOrder: 10 + (index % 4) * 5,
    description:
      "Freshly prepared menu designed for office lunches, team gatherings, and catered events with dependable delivery.",
    includes: [
      "Seasonal salad",
      "Fresh bread",
      "Main menu selection",
      "Dessert bite",
      "Serving setup",
    ],
    summary: {
      subtotal: basePrice * 10,
      deliveryFee: 79,
      vat: 125,
    },
    restaurant: {
      name: vendor,
      description:
        "Modern catering kitchen focused on office lunches, warm buffet trays, and polished event setup.",
      location: "Bergen City Center",
      distance: `${2 + (index % 4)}.${(index % 3) + 1} km away`,
      deliveryFee: "NOK 79 delivery",
      deliveryTime: "30-45 min",
      discount: index % 2 === 0 ? "15% off large orders" : "Free drinks on selected bundles",
      cuisines: ["Catering", "Lunch", "Office Events"],
    },
    deliveryDate: "Dec 25, 2026",
    deliveryWindow: "3:15 PM - 3:45 PM",
    deliveryAddress: "1080 6th Ave W, Bergen",
    addOns: [
      { id: `${item.slug}-addon-1`, title: "Fruit platter", price: 49, image: "/home/v.jpg" },
      { id: `${item.slug}-addon-2`, title: "Mini desserts", price: 59, image: "/home/hero1.jpg" },
      { id: `${item.slug}-addon-3`, title: "Soft drinks", price: 39, image: "/home/hero2.jpg" },
      { id: `${item.slug}-addon-4`, title: "Extra sides", price: 45, image: "/home/hero3.jpg" },
      
    ],
  };
}

function createHomeMenuDetail(item, index) {
  const basePrice = 149 + index * 20;

  return {
    id: `home-${item.slug}`,
    slug: item.slug,
    title: item.name,
    vendor: "Featured Vendor",
    vendorLine: item.deliveryFee,
    rating: item.rating,
    image: item.image,
    gallery: [item.image, "/home/hero3.jpg", "/home/v.jpg"],
    pricePerPerson: basePrice,
    minimumOrder: 8 + index * 2,
    description:
      "A popular ready-to-order menu package from our featured marketplace partners, ideal for quick group orders.",
    includes: [
      "Chef-selected items",
      "Packaging and setup",
      "Cutlery on request",
      "Fast marketplace delivery",
    ],
    summary: {
      subtotal: basePrice * 8,
      deliveryFee: 59,
      vat: 95,
    },
    restaurant: {
      name: item.name,
      description:
        "Popular marketplace restaurant known for reliable group orders, quick prep, and easy weekday delivery.",
      location: "Central Bergen",
      distance: `${1 + index}.${index + 2} km away`,
      deliveryFee: item.deliveryFee,
      deliveryTime: item.deliveryTime,
      discount: item.discount,
      cuisines: ["Fast Lunch", "Group Orders", "Takeaway"],
    },
    deliveryDate: "Dec 25, 2026",
    deliveryWindow: item.deliveryTime,
    deliveryAddress: "1080 6th Ave W, Bergen",
    addOns: [
      { id: `${item.slug}-addon-1`, title: "Dips", price: 29, image: "/home/hero1.jpg" },
      { id: `${item.slug}-addon-2`, title: "Sides", price: 35, image: "/home/hero2.jpg" },
      { id: `${item.slug}-addon-3`, title: "Desserts", price: 45, image: "/home/hero3.jpg" },
    ],
  };
}

export const menuDetails = [
  ...foodTypeMenuItems.map(createBrowseMenuDetail),
  ...occasionMenuItems.map(createBrowseMenuDetail),
  ...popularProducts.map(createHomeMenuDetail),
];

export function getMenuBySlug(slug) {
  return menuDetails.find((item) => item.slug === slug);
}

export function getMenuSlugByRestaurantName(name) {
  const matchedMenu = menuDetails.find(
    (item) => item.restaurant.name.toLowerCase() === name.toLowerCase(),
  );

  return matchedMenu?.slug ?? menuDetails[0]?.slug ?? "";
}
