import { FiMapPin, FiSearch, FiArrowDownLeft } from "react-icons/fi";
import HomeNavbar from "./HomeNavbar";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#fbf8f5]">
      <img
        src="/home/heroBg.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />

      <div className="relative z-10">
        <HomeNavbar />

        <div className="grid min-h-[calc(100vh-88px)] items-center gap-12 px-5 py-10 md:px-6 lg:grid-cols-2 lg:px-8 lg:py-14">
          <div className="max-w-2xl">
            <h1 className="type-h1 tracking-tight text-black">
              Order Lunch for
              <br />
              Work or Home
            </h1>

            <p className="type-para mt-5 max-w-xl text-gray-700">
              Fresh meals from local vendors delivered on time.
            </p>

            <div className="mt-8 max-w-2xl">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex h-12 flex-1 items-center rounded-xl border border-gray-300 bg-white px-4">
                  <FiMapPin className="shrink-0 text-sm text-gray-500" />
                  <input
                    type="text"
                    placeholder="Enter your delivery address"
                    className="type-para ml-3 w-full bg-transparent text-gray-700 outline-none placeholder:text-gray-400"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Add Postal Code"
                  className="type-para h-12 rounded-xl border border-gray-300 bg-white px-4 text-gray-700 outline-none placeholder:text-gray-400 sm:w-[180px]"
                />
              </div>

              <button className="type-h6 mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#c85f33] px-6 text-white transition hover:bg-[#b9542b]">
                <FiSearch className="text-base" />
                Search
              </button>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-[560px] items-center justify-center">
            <div className="relative h-[320px] w-full sm:h-[420px] lg:h-[500px]">
              <div className="absolute left-[2%] top-[6%] h-[140px] w-[180px] overflow-hidden rounded-[28px] shadow-xl sm:h-[180px] sm:w-[230px] lg:h-[210px] lg:w-[250px]">
                <img
                  src="/home/hero1.jpg"
                  alt="Food platter"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="absolute right-[0%] top-[18%] z-[10] h-[150px] w-[190px] overflow-hidden rounded-[30px] shadow-xl sm:h-[200px] sm:w-[240px] lg:h-[220px] lg:w-[255px]">
                <img
                  src="/home/hero2.jpg"
                  alt="Meal dishes"
                  className="h-full w-full object-cover"
                />
              </div>

              <div
                className="absolute left-[53%] bottom-[0%] h-[150px] w-[205px] -translate-x-1/2 overflow-hidden filter drop-shadow-xl sm:h-[200px] sm:w-[250px] lg:h-[230px] lg:w-[270px]"
                style={{ clipPath: "url(#liquidNotch)" }}
              >
                <img
                  src="/home/hero3.jpg"
                  alt="People eating together"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="absolute right-[30%] top-[10%] z-[100] flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full border-[10px] border-white bg-[#c85f33] text-white shadow-2xl sm:h-24 sm:w-24">
                <FiArrowDownLeft className="text-3xl sm:text-4xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="liquidNotch" clipPathUnits="objectBoundingBox">
            <path d="M0.1,0 L0.38,0 C0.45,0 0.48,0.02 0.48,0.1 L0.48,0.12 C0.48,0.18 0.52,0.22 0.58,0.22 L0.9,0.22 C0.98,0.22 1,0.24 1,0.32 L1,0.9 C1,0.98 0.98,1 0.9,1 L0.1,1 C0.02,1 0,0.98 0,0.9 L0,0.1 C0,0.02 0.02,0 0.1,0 Z" />
          </clipPath>
        </defs>
      </svg>
    </section>
  );
}
