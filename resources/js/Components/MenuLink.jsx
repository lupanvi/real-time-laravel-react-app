import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function Menulink({
    method = "get",
    as = "a",
    href,
    active = false,
    Icon,
    children,
}) {
    return (
        <div className={`flex items-center transition duration-150 ease-in-out focus:outline-none ${active
            ? "text-primary focus:text-primary"
            : "text-gray-800 hover:text-primary"
        }`}>
            <span>{Icon}</span>
            <Link
                method={method}
                as={as}
                href={href}
                className={`w-full flex items-start pl-3 pr-4 py-2 text-sm font-semibold`}
            >
                {children}
            </Link>
        </div>
    );
}
