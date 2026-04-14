import { Link } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

export default function HomeNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full">
      <div className="flex items-center justify-between px-4 py-2">
        <Link to="/" className="flex items-center">
          <img
            src="/home/logo.png"
            alt="logo"
            className="h-17 w-33 object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/contact"
            className="type-h5 text-gray-700 transition hover:text-black"
          >
            Contact us
          </Link>

          <Link
            to="/signin"
            className="type-h6 rounded-full bg-[#c85f33] px-6 py-2 text-white transition hover:opacity-90"
          >
            Sign in
          </Link>

          <Link
            to="/cart"
            className="text-3xl text-black transition hover:opacity-70"
          >
            <FiShoppingCart />
          </Link>
        </nav>

        <button onClick={() => setOpen(!open)} className="text-2xl md:hidden">
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {open ? (
        <div className="space-y-4 border-t border-gray-100 px-5 pb-5 pt-4 md:hidden">
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="type-h6 block text-gray-700"
          >
            Contact us
          </Link>

          <Link
            to="/signin"
            onClick={() => setOpen(false)}
            className="type-h6 block w-fit rounded-full bg-[#c85f33] px-5 py-2 text-white"
          >
            Sign in
          </Link>

          <Link
            to="/cart"
            onClick={() => setOpen(false)}
            className="type-h6 flex items-center gap-2 text-gray-700"
          >
            <FiShoppingCart />
            Cart
          </Link>
        </div>
      ) : null}
    </header>
  );
}
