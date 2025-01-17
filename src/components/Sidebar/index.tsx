import Link from "next/link";

import { Accordion } from "../Accordion";

const Sidebar = () => {
  return (
    <div className="hidden md:flex min-w-40 max-w-40 h-full bg-blue-950 p-4 gap-1 flex-col">
      <Link href="/">
        <span className="text-base text-gray-200 font-normal hover:text-blue-400 transition-colors duration-300">
          Início
        </span>
      </Link>

      <Accordion />
    </div>
  );
};

export { Sidebar };
