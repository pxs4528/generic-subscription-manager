import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import Logo from "@/public/assets/subhub_logo.svg";
import { PowerIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Button } from "../button";

export default function SideNav() {
  return (
    <div className="dark:bg-gray-900 flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="dark:bg-gray-600 mb-2 flex h-20 items-end justify-start rounded-md bg-white p-4 md:h-40 hover:bg-gray-500"
        href="/"
      >
        <div className="dark:invert w-32 text-white md:w-40">
          <Image src={Logo} alt="SubHub Logo" />
        </div>
      </Link>
      <div className="dark:bg-gray-900 flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="dark:bg-gray-900 hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>

        <form className="w-22">
          <a href="/login">
            <button type="button" className="dark:bg-gray-700 flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-500 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">

              <PowerIcon className="text-white w-6" />
              <div className="text-white md:inline">Sign Out</div>

            </button>
          </a>
        </form>

      </div>
    </div>
  );
}
