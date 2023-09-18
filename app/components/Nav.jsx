import Link from "next/link";
import React from "react";
import { BiSolidStoreAlt } from "react-icons/bi";
import { MdSpaceDashboard } from "react-icons/md";
import { BsBoxSeam, BsListCheck } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { usePathname } from "next/navigation";

const Nav = () => {
  const inactiveLink = "flex gap-1 p-1 items-center";
  const activeLink = inactiveLink + " bg-highlight text-black rounded-sm";
  const inactiveIcon = "w-6 h-6";
  const activeIcon = inactiveIcon + " text-primary";

  const pathname = usePathname();

  return (
    <aside className="text-white p-4 pr-0">
      <Link href={"/"} className="flex items-center gap-1 mb-4 mr-12">
        <BiSolidStoreAlt />
        <span>Ecommerce Admin</span>
      </Link>
      <nav className="flex flex-col gap-2">
        <Link href={"/"} className={pathname === '/' ? activeLink : inactiveLink}>
          <MdSpaceDashboard /> Dashboard
        </Link>
        <Link href={"/products"} className={pathname === '/products' ? activeLink : inactiveLink}>
          <BsBoxSeam /> Products
        </Link>
        <Link href={"/orders"} className={pathname === '/orders' ? activeLink : inactiveLink}>
          <BsListCheck /> Orders
        </Link>
        <Link href={"/settings"} className={pathname === '/settings' ? activeLink : inactiveLink}>
          <AiOutlineSetting /> Settings
        </Link>
      </nav>
    </aside>
  );
};

export default Nav;
