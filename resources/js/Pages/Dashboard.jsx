import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BarChart from "@/Components/Charts/BarChart";

export default function Dashboard(props){
    const { projects } = props;    
    const [latestProjects, setLatestProjects] = useState(projects);

    useEffect(() => {
        window.Echo.private("projects").listen("ProjectCreated", (e) => {
            const temp = [...latestProjects];
            temp.pop();
            setLatestProjects([e.project, ...temp]);
        });
    }, [latestProjects]);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <div className="bg-white px-4">
                <h2 className="font-bold p-3 text-lg text-left border-b-2 border-white">
                    Latest Projects
                </h2>
                <div className="flex gap-4 py-4">                    
                    <div className="w-2/3 bg-gray-200 h-64">                        
                        { latestProjects.length ? <BarChart data={latestProjects} /> : 'No projects found.' }
                    </div>
                    <div className="w-1/3 bg-gray-200 text-xs h-64 overflow-y-scroll">                        
                        <table className="w-full whitespace-nowrap ">
                            <thead>
                                <tr className="font-bold text-left border-b-2 border-white">
                                    <th className="px-6 pt-5 pb-4">Id</th>
                                    <th className="px-6 pt-5 pb-4">Title</th>
                                    <th className="px-6 pt-5 pb-4">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {latestProjects.map(({ id, title, amount }) => {
                                    return (
                                        <tr
                                            key={id}
                                            className="hover:bg-gray-100 border-b-2 border-white focus-within:bg-gray-100"
                                        >
                                            <td className="border-t px-6 pt-5 pb-4">#{id}</td>
                                            <td className="border-t px-6 pt-5 pb-4">
                                                {title}
                                            </td>
                                            <td className="border-t px-6 pt-5 pb-4">
                                                <span className="inline-flex items-center p-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest">
                                                    {amount.toLocaleString('en-US', {
                                                        style: 'currency',
                                                        currency: 'USD',
                                                        })
                                                    }
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {latestProjects.length === 0 && (
                                    <tr>
                                        <td
                                            className="px-6 py-4 border-t"
                                            colSpan="3"
                                        >
                                            No projects found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
