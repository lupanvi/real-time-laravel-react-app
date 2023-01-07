import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function ButtonLink({ method = 'get', as = 'a', href, children }) {
    return (
        <Link
            method={method}
            as={as}
            href={href}
            className={`inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-primary transition ease-in-out duration-150`}
        >
            {children}
        </Link>
    );
}