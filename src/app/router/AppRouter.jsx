import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import HomePage from "../../features/home/pages/HomePage";
import BrowseFoodTypePage from "../../features/browse/pages/BrowseFoodTypePage";
import BrowseOccasionPage from "../../features/browse/pages/BrowseOccasionPage";
import OrderConfirmedPage from "../../features/order/pages/OrderConfirmedPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse/food-type" element={<BrowseFoodTypePage />} />
        <Route path="/browse/occasion" element={<BrowseOccasionPage />} />
        <Route path="/order-confirmed" element={<OrderConfirmedPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
