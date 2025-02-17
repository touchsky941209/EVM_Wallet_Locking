import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const ChainMenu: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<string>(
    "/assets/icons/chainIcon.svg"
  );
  const [selectedAlt, setSelectedAlt] = useState<string>("solana");

  const handleIconClick = (iconSrc: string, altText: string): void => {
    setSelectedIcon(iconSrc);
    setSelectedAlt(altText);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative inline-flex items-center justify-center lg:gap-2 rounded-full lg:bg-[#202229] lg:px-3">
          <div className="relative flex h-10 w-6 md:h-10 md:w-10 items-center justify-center rounded-full bg-cover bg-center">
            <Image
              src={selectedIcon}
              alt={selectedAlt}
              width={30}
              height={30}
            />
          </div>
          <FaChevronDown className="h-4 w-4 hidden lg:block" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-0 border-0 w-32" align="end">
      </PopoverContent>
    </Popover>
  );
};
