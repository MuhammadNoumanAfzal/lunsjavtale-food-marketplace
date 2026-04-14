export default function MenuDeliveryInfoCard({ menu }) {
  return (
    <div className="rounded-[20px] border border-[#e9e0d6] bg-white p-4 shadow-[0_16px_36px_rgba(37,24,8,0.05)] sm:rounded-[24px] sm:p-5">
      <h2 className="text-[17px] font-semibold text-black sm:text-[18px]">
        Menu delivery info
      </h2>
      <div className="mt-4 space-y-4 text-[13px] text-black sm:text-[14px]">
        <div>
          <p className="font-semibold text-black">Minimum order requirement</p>
          <p className="mt-1">Minimum order: {menu.minimumOrder} people</p>
        </div>
        <div>
          <p className="font-semibold text-black">Delivery date &amp; time</p>
          <p className="mt-1">Date: {menu.deliveryDate}</p>
          <p>Window: {menu.deliveryWindow}</p>
        </div>
        <div>
          <p className="font-semibold text-black">Address</p>
          <p className="mt-1">{menu.deliveryAddress}</p>
        </div>
      </div>
    </div>
  );
}
