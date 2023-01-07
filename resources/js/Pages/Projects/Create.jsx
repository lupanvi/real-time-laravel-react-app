import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/inertia-react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Textarea from "@/Components/Textarea";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Create(props) {
    const { data, setData, errors, post, processing } = useForm({
        title: "",
        description: "",
        amount: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("projects.store"));
    };

    const onHandleChange = (event) => {        
        setData(event.target.name, event.target.value);
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Project
                </h2>
            }
        >
            <div className="bg-white px-4">
                <form onSubmit={handleSubmit}>
                    <div className="p-8">
                        <div className="py-2">
                            <TextInput
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={data.title}
                                className="mt-1 block w-full"
                                autoComplete="title"
                                isFocused={true}
                                handleChange={onHandleChange}
                            />
                            <InputError
                                message={errors.title}
                                className="mt-2"
                            />
                        </div>
                        <div className="py-4">
                            <Textarea
                                className="w-full h-44"                                
                                name="description"
                                errors={errors.description}
                                value={data.description}
                                handleChange={onHandleChange}
                                placeholder="Description"                                
                            />
                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>
                        <div className="py-4">
                            <TextInput
                                type="text"
                                name="amount"
                                placeholder="Amount"
                                value={data.amount}
                                className="mt-1 block w-full"
                                autoComplete="amount"
                                isFocused={true}
                                handleChange={onHandleChange}
                            />
                            <InputError
                                message={errors.amount}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
                        <PrimaryButton disabled={processing} type="submit">
                            Create Project
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
