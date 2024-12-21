import * as React from "react";

function ContactInfo({ contacts }) {
  return (
    <div className="flex flex-col mt-5">
      {contacts.map((contact, index) => (
        <div key={index} className="flex gap-2.5 mt-4 first:mt-0">
          <div className="flex relative flex-col justify-center self-start py-1.5 aspect-[1.222] w-[22px]">
            <img
              loading="lazy"
              src={contact.icon}
              alt=""
              className="object-cover absolute inset-0 size-full"
            />
            {contact.overlayIcon && (
              <img
                loading="lazy"
                src={contact.overlayIcon}
                alt=""
                className="object-contain w-full aspect-[2.44]"
              />
            )}
          </div>
          <a 
            href={contact.type === 'email' ? `mailto:${contact.text}` : `tel:${contact.text}`}
            className="grow shrink w-24 text-xs font-light text-zinc-500"
          >
            {contact.text}
          </a>
        </div>
      ))}
    </div>
  );
}

export default ContactInfo;