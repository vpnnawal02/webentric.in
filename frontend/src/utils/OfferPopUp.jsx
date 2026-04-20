import { useEffect, useState } from "react";
import PopUpForm from "../components/PopUpForm";

export default function OfferPopup() {
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("popupShown")) return;

        const timer = setTimeout(() => {
            setShow(true);
            sessionStorage.setItem("popupShown", "true");
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 ">
            <PopUpForm open={open} setOpen={setOpen} />
            <div className="bg-white p-6 rounded-sm max-w-sm w-full text-center relative shadow-xl py-10">

                <button
                    onClick={() => setShow(false)}
                    className="absolute top-2 right-3 text-xl"
                >
                    ×
                </button>

                <h2 className="text-xl font-bold mb-2">
                    Exclusive Launch Offer
                </h2>

                <p className="text-gray-600 mb-3">
                    Get a high-converting website at
                </p>

                <p className="text-2xl font-bold text-black mb-3">
                    30% OFF
                </p>

                <p className="text-sm text-red-500 mb-4">
                    Limited to first 10 clients only
                </p>

                <button
                    onClick={() => setOpen(true)}
                    className=" w-full sm:w-auto px-7 sm:px-8  py-3.5 bg-blue-500 text-white text-sm sm:text-base font-semibold rounded-xs shadow-sm  hover:bg-blue-700  transition-color">
                    Claim your offer
                </button>
            </div>
        </div>
    );
}