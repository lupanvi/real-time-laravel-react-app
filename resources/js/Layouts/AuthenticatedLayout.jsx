import React, { useState } from 'react';
import { Header } from '@/Components/Header';
import { MySidebar } from '@/Components/MySidebar';
import FlashMessages from '@/Components/FlashMessages';

export default function Authenticated({ auth, header, children }) {    
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <div className="w-1/5">
                <MySidebar auth={auth} />
            </div>
            <div className="w-4/5 bg-white">
                <Header header={header} auth={auth} />
                <FlashMessages />
                <main>{children}</main>
            </div>
        </div>
    );
}
