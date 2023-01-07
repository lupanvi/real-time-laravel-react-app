import React from "react";

export default function MenuGroup({label='', children}) {
    return (
        <div className="py-2">
            <div className="text-gray-700 text-sm">{label}</div>                 
            <div className="ml-1">{children}</div>
        </div>
    );
}
