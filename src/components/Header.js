"use client";
import Image from "next/image";
import LOGO_IMAGE from "@/../public/assets/Logo/logo.png";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useState } from "react";
import { GoHome } from "react-icons/go";
import { usePathname } from "next/navigation";
import Link from "next/link";

const jakarta = Plus_Jakarta_Sans({
  weight: ["700"],
  subsets: ["latin"],
});

const SCREENS_ARRAY = [
  {
    title: "Contextual Search",
    link: "/contextual-search",
  },
  {
    title: "Key Negatives",
    link: "/key-negatives",
  },
  {
    title: "Flash Report",
    link: "/flash-report",
  },
  {
    title: "Sec GPT",
    link: "/sec-gpt",
  },
  {
    title: "Financials",
    link: "/financials",
  },
];
const Header = ({}) => {
  const currentPage = usePathname();
  const [user, setUser] = useState(false);
  console.log(currentPage, "router.pathname");
  return (
    <nav
      className={`${jakarta.className} h-[8vh] flex items-center justify-between bg-primary px-[60px]`}
    >
      <div className="flex items-center gap-6">
        <Image src={LOGO_IMAGE} className="h-[48px] w-[48px]" alt="LOGO" />
        <p className="text-[22px] text-white font-bold">Finance Flash</p>
        {currentPage !== "/" && (
          <div className="flex gap-3 ml-5">
            {SCREENS_ARRAY.map((v) => (
              <Link href={v.link} key={v.link}>
                <button
                  className={`${
                    v.link === currentPage
                      ? "bg-white text-primary"
                      : "bg-primary text-white"
                  } min-w-fit px-4  text-base font-bold h-11 rounded-md`}
                >
                  {v.title}
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="flex">
        {currentPage !== "/" ? (
          <Link href={"/"}>
          <button className="bg-primary text-white text-2xl">
            <GoHome />
          </button>
          </Link>
        ) : (
          <Link href={"/contextual-search"}>
            <button
              className="bg-white text-primary text-base font-bold w-24 h-11 rounded-md"
              //   onClick={() => setUser(true)}
            >
              Log In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};
export default Header;
