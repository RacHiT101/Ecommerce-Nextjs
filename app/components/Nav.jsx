import Link from "next/link";
import React from "react";
import { BiSolidStoreAlt } from "react-icons/bi";
import { MdSpaceDashboard } from "react-icons/md";
import { BsBoxSeam, BsListCheck } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Logo from "./Logo";

const Nav = ({show, setShowNav}) => {
  const inactiveLink = 'flex items-center gap-1 p-1';
  const activeLink = inactiveLink+' bg-highlight text-black rounded-sm';
  const inactiveIcon = "w-6 h-6";
  const activeIcon = inactiveIcon + " text-primary";

  const pathname = usePathname();

  const router = useRouter();

  async function logout() {
    await router.push('/');
    await signOut();
  }

  return (
    <aside className={(show?'left-0':'-left-full')+" top-0 text-gray-500 p-4 fixed w-full bg-bgGray h-full md:static md:w-auto transition-all"}>
      <div className="mb-4 mr-4">
        <Logo />
      </div>
      
      <nav className="flex flex-col gap-2">
        <Link href={"/"} onClick={() => setShowNav(false)} className={pathname === '/' ? activeLink : inactiveLink}>
          <MdSpaceDashboard /> Dashboard
        </Link>
        <Link href={"/products"} onClick={() => setShowNav(false)} className={pathname.includes('/products')  ? activeLink : inactiveLink}>
          <BsBoxSeam /> Products
        </Link>
        <Link href={"/categories"} onClick={() => setShowNav(false)} className={pathname.includes('/categories') ? activeLink : inactiveLink}>
          <BsBoxSeam /> Categories
        </Link>
        <Link href={"/orders"} onClick={() => setShowNav(false)} className={pathname.includes('/orders') ? activeLink : inactiveLink}>
          <BsListCheck /> Orders
        </Link>
        <Link href={"/settings"} onClick={() => setShowNav(false)} className={pathname.includes('/settings') ? activeLink : inactiveLink}>
          <AiOutlineSetting /> Settings
        </Link>
        <button onClick={logout} className={inactiveLink}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Nav;
