import React from "react";
import FooterNav from "./FooterNav";
import { PrismicNextImage } from "@prismicio/next";

const Footer = ({ footer }) => {
  return (
    <footer className="text-[2rem] md:text-[1.125rem] text-secondary bg-primary min-h-[20rem] md:px-16 px-4 w-full py-16 mt-32 flex flex-col">
      <div className="flex flex-col w-full text-center md:flex-row md:text-start">
        <div className="mb-16 md:w-[45.625rem]">
          <figure className="w-[15.375rem] h-[6.125rem] mb-16">
            <PrismicNextImage
              className="w-full h-full object-cover"
              alt={footer.data.logo.alt}
              field={footer.data.logo}
            />
          </figure>
          <span className="text-center md:mb-0">{footer.data.copyrights}</span>
        </div>
        <nav className="flex flex-col md:flex-row ">
          <FooterNav slices={footer.data.navigation.data.slices} />
          <FooterNav slices={footer.data.navigation.data.slices1} />
          <FooterNav
            slices={footer.data.navigation.data.slices2}
            location={footer.data.navigation.data.location}
          />
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
