import React from 'react'
import { useState } from "react";
import { CONTACT_ITEMS } from "../assets/data.js"


const ContactButtons = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="fixed right-0 top-3/4 md:top-60 -translate-y-1/2 z-40 flex  items-center">
            {/* Toggle / collapsed handle */}
            <div

                onMouseLeave={() => setIsOpen(false)}
                className={`ml-2 bg-white border border-gray-200 shadow-xl flex flex-col gap-2 px-3 py-3 transition-all duration-300
                            ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"}`}>
                {CONTACT_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                        <a
                            key={item.id}
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center gap-2 text-xs text-gray-700 hover:text-gray-900 min-w-[150px]"
                        >
                            <span
                                className={`inline-flex h-8 w-8 items-center justify-center text-white ${item.bg} shadow-md transition-transform group-hover:-translate-y-0.5`}
                            >
                                <Icon className="text-[14px]" />
                            </span>
                            <span className="font-medium">{item.label}</span>
                        </a>
                    );
                })}
            </div>
            <button
                type="button"
                onMouseEnter={() => setIsOpen(true)}
                className=" h-40 w-10 md:w-15 bg-blue-600/40 border border-blue-400 text-black text-[10px] font-semibold flex items-center justify-center tracking-[0.12em] uppercase rotate-180 [writing-mode:vertical-rl] shadow-lg hover:bg-blue-700 transition-colors ">
                Contact
            </button>

        </div>
    );
}

export default ContactButtons
