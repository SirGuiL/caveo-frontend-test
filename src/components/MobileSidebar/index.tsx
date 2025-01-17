import Link from "next/link";
import { Accordion } from "../Accordion";

interface MobileSidebarProps {
  onPressLink: () => void;
}

const MobileSidebar = ({ onPressLink }: MobileSidebarProps) => {
  return (
    <div className="flex flex-col gap-2 p-4 pt-16">
      <Link href="/" onClick={onPressLink}>
        <span className="text-3xl text-gray-200 font-medium hover:text-blue-400 transition-colors duration-300">
          Início
        </span>
      </Link>

      <Accordion onPressLink={onPressLink} />
    </div>
  );
};

export { MobileSidebar };
