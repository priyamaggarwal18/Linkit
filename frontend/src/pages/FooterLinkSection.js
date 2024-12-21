import * as React from "react";

export function FooterLinkSection({ title, links, isDarkMode }) {
  return (
    <section className="flex flex-col flex-1 shrink pb-32 basis-0 min-w-[240px] max-md:pb-24">
      <h2 className={`text-2xl tracking-tight leading-none font-black ${isDarkMode ? 'text-white ' : 'text-gray-800'}`}>
        {title}
      </h2>
      <nav className="flex flex-col pr-20 mt-6 text-xs tracking-normal leading-5 max-md:pr-5">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className={`mt-4 first:mt-0 ${isDarkMode ? 'text-white text-opacity-50 hover:text-gray-300' : 'text-stone-500 hover:text-stone-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500`}
          >
            {link.text}
          </a>
        ))}
      </nav>
    </section>
  );
}