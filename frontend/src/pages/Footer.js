import * as React from "react";
import { FooterLinkSection } from "./FooterLinkSection";
import {
  companyLinks,
  communityLinks,
  supportLinks,
  legalLinks,
  socialImages
} from "../constants/FooterData";
import { useNavigate } from "react-router-dom";

export function Footer({ isDarkMode }) {
  const navigate = useNavigate();
  const handleNavigation = (link) => {
    navigate(link);
  };
  return (
    <footer className={`flex flex-col px-16 pt-16 pb-16 mt-10 rounded-2xl ${isDarkMode ? "bg-black text-white" : "bg-white text-black"} max-md:px-5 max-md:max-w-full`}>
    <div className="flex flex-wrap gap-4 items-start font-black max-md:max-w-full">
      <FooterLinkSection title="Company" links={companyLinks} isDarkMode={isDarkMode} />
      <FooterLinkSection title="Community" links={communityLinks} isDarkMode={isDarkMode} />
      <FooterLinkSection title="Support" links={supportLinks} isDarkMode={isDarkMode} />
      <FooterLinkSection title="Trust & Legal" links={legalLinks} isDarkMode={isDarkMode} />
    </div>
      
      <div className="flex flex-wrap gap-10 items-start mt-12 max-md:mt-10 max-md:max-w-full mx-auto">
        <div className="flex gap-2 items-start font-black tracking-normal min-w-[240px]">
          <button 
          onClick={() => handleNavigation("/login")}
            className={`${!isDarkMode?"bg-zinc-100 hover:bg-zinc-200 focus:ring-zinc-500":"text-white bg-custom-grey-color "} px-7 pt-5 pb-5 text-base leading-relaxed rounded-lg  max-md:px-5  focus:outline-none focus:ring-2 focus:ring-offset-2 `}
          >
            Log in
          </button>
          <button 
          onClick={() => handleNavigation("/register")}
            className="pt-5 pr-8 pb-5 pl-7 text-sm leading-6 bg-custom-green rounded-[32px] max-md:px-5 hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
          >
            Get started for free
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 items-center min-w-[240px] max-md:max-w-full">
          <div className="flex gap-2 items-start self-stretch my-auto min-w-[240px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/30d4071338e7485e977656a212aa2027/51d0570189554a318f2411070e54d520d14163b08c47ba071857f8acba8b7831?apiKey=30d4071338e7485e977656a212aa2027&"
              alt="Company certification badge 1"
              className="object-contain shrink-0 aspect-[2.23] rounded-[10000px] w-[143px]"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/30d4071338e7485e977656a212aa2027/cc0bc1409975dcc80ac3fe292f9ed652fac66f2b360622f5027d7adf4907405b?apiKey=30d4071338e7485e977656a212aa2027&"
              alt="Company certification badge 2"
              className="object-contain shrink-0 aspect-[2.47] rounded-[10000px] w-[158px]"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}