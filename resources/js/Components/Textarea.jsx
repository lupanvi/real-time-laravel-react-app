import React, { useEffect, useRef } from 'react';

export default function Textarea({    
    name,
    value,
    className,
    autoComplete,
    required,    
    handleChange,
    placeholder
}) {  

    return (
        <div className="flex flex-col items-start">
            <textarea                
                name={name}                
                className={
                    `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
                    className
                }                
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
                placeholder={placeholder}
                value={value}
            >
            </textarea>
        </div>
    );
}
