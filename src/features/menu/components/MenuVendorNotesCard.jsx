export default function MenuVendorNotesCard() {
  return (
    <div className="rounded-[20px] border border-[#e9e0d6] bg-white p-4 shadow-[0_16px_36px_rgba(37,24,8,0.05)] sm:rounded-[24px] sm:p-5">
      <h2 className="text-[17px] font-semibold text-black sm:text-[18px]">
        Add note for vendor
      </h2>
      <textarea
        rows={6}
        placeholder="Share dietary notes, setup instructions, or anything the vendor should know."
        className="mt-4 w-full rounded-[16px] border border-[#e5dbcf] px-4 py-3 text-[13px] text-black outline-none placeholder:text-[#8f8f8f] sm:text-[14px]"
      />
    </div>
  );
}
