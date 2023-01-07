import React, { useEffect } from "react";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/inertia-react";
import ApplicationLogo from "./ApplicationLogo";
import MenuLink from "./MenuLink";
import { Typography } from "@material-tailwind/react";

import { AiOutlineHome, AiOutlineProject } from "react-icons/ai";
import MenuGroup from "./MenuGroup";

export const MySidebar = ({ auth }) => {
    return (
        <div className="p-4 hidden sm:flex flex-col items-center ">
            <div className="flex pb-10">
                <Link href="/">
                    <ApplicationLogo className="block h-9 w-auto text-gray-500" />
                </Link>
            </div>

            <div className="profile flex flex-col items-center">
                {/*not working <img src="../../images/abigail.png">*/}
                <img src="/avatar.png" className="h-28 w-28 rounded-full" />
                <div className="text-3xl">{auth.user.name}</div>
                <div className="text-lg text-green-300 text-center">
                    Admin
                </div>
            </div>

            <div className="menu mt-4">                
                    <MenuGroup>
                        <MenuLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                            Icon={<AiOutlineHome />}
                        >
                            Dashboard
                        </MenuLink>
                    </MenuGroup>
                    <MenuGroup label="Data">
                        <MenuLink
                            href={route("projects.index")}
                            active={route().current("projects.index")}
                            Icon={<AiOutlineProject />}
                        >
                            Projects
                        </MenuLink>                      
                    </MenuGroup>                
            </div>
        </div>
    );
};
