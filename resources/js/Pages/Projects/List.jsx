import React, {useEffect} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { InertiaLink, usePage, Link } from "@inertiajs/inertia-react";
import { Button } from "@material-tailwind/react";
import { Inertia } from '@inertiajs/inertia';
import Pagination from '@/Components/Pagination'
import ButtonLink from "@/Components/ButtonLink";

export default function List(props) {
    const { projects } = props
    const { data, links, meta } = projects      

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Projects
                </h2>
            }
        >
            <div className="bg-white px-4">
                <div className="my-2">
                    <ButtonLink href="/projects/create">Create new Project</ButtonLink>
                </div>
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr className="font-bold text-left">
                            <th className="px-6 pt-5 pb-4">Id</th>
                            <th className="px-6 pt-5 pb-4">Title</th>
                            <th className="px-6 pt-5 pb-4">Description</th>
                            <th className="px-6 pt-5 pb-4">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(({ id, title, description, amount }) => {
                            return (
                                <tr
                                    key={id}
                                    className="hover:bg-gray-100 focus-within:bg-gray-100"
                                >
                                    <td className="border-t">
                                        <InertiaLink
                                            href={route("projects.edit", id)}
                                            className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                                        >
                                            {id}
                                        </InertiaLink>
                                    </td>
                                    <td className="border-t">
                                        <InertiaLink
                                            href={route("projects.edit", id)}
                                            className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                                        >
                                            {title}
                                        </InertiaLink>
                                    </td>
                                    <td className="border-t">
                                        <InertiaLink
                                            tabIndex="-1"
                                            href={route("projects.edit", id)}
                                            className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                                        >
                                            {description}
                                        </InertiaLink>
                                    </td>
                                    <td className="border-t">
                                        <InertiaLink
                                            tabIndex="-1"
                                            href={route("projects.edit", id)}
                                            className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                                        >
                                             {amount.toLocaleString('en-US', {
                                                        style: 'currency',
                                                        currency: 'USD',
                                                        })
                                                    }
                                        </InertiaLink>
                                    </td>
                                </tr>
                            );
                        })}
                        {data.length === 0 && (
                            <tr>
                                <td className="px-6 py-4 border-t" colSpan="3">
                                    No projects found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>            
            <Pagination links={meta.links} />
        </AuthenticatedLayout>
    );
}
