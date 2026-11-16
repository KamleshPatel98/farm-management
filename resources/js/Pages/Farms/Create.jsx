
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';

import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        total_area: '',
        area_unit: 'acre',
        location: '',
        description: '',
        status: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('farms.store'));
    };

    return (
        <AuthenticatedLayout>

            <Head title="Add Farm" />

            <div className="p-4 sm:p-6">

                {/* Page Header */}
                <div className="bg-white shadow-sm mb-2">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-6 py-4 border-b">

                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                Farm Management
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Create, edit, and manage your farms.
                            </p>
                        </div>

                        <Link
                            href={route('farms.index')}
                            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-400 text-gray-600 rounded-md hover:bg-gray-100 transition text-sm"
                        >
                            <i className="fa fa-arrow-left"></i>
                            Back to List
                        </Link>

                    </div>
                </div>


                {/* Form Card */}
                <div className="bg-white shadow-md">

                    <form onSubmit={submit}>

                        {/* Form Header */}
                        <div className="px-6 py-4 border-b border-gray-300">

                            <h3 className="text-lg font-semibold text-gray-800">
                                Add Farm
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                Enter the basic details of your farm.
                            </p>

                        </div>


                        {/* Form Body */}
                        <div className="p-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                {/* Farm Name */}
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="Farm Name"
                                    />

                                    <TextInput
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        placeholder="Enter farm name"
                                        autoComplete="off"
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.name}
                                        className="mt-1"
                                    />
                                </div>


                                {/* Total Area */}
                                <div>
                                    <InputLabel
                                        htmlFor="total_area"
                                        value="Total Area"
                                    />

                                    <TextInput
                                        id="total_area"
                                        type="number"
                                        value={data.total_area}
                                        className="mt-1 block w-full"
                                        placeholder="e.g. 13"
                                        min="0.01"
                                        step="0.01"
                                        onChange={(e) =>
                                            setData('total_area', e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.total_area}
                                        className="mt-1"
                                    />
                                </div>


                                {/* Area Unit */}
                                <div>
                                    <InputLabel
                                        htmlFor="area_unit"
                                        value="Area Unit"
                                    />

                                    <select
                                        id="area_unit"
                                        value={data.area_unit}
                                        onChange={(e) =>
                                            setData('area_unit', e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="acre">Acre</option>
                                        <option value="hectare">Hectare</option>
                                        <option value="decimal">Decimal</option>
                                    </select>

                                    <InputError
                                        message={errors.area_unit}
                                        className="mt-1"
                                    />
                                </div>


                                {/* Location */}
                                <div>
                                    <InputLabel
                                        htmlFor="location"
                                        value="Location"
                                    />

                                    <TextInput
                                        id="location"
                                        type="text"
                                        value={data.location}
                                        className="mt-1 block w-full"
                                        placeholder="Enter farm location"
                                        autoComplete="off"
                                        onChange={(e) =>
                                            setData('location', e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.location}
                                        className="mt-1"
                                    />
                                </div>


                                {/* Status */}
                                <div className="md:col-span-2">

                                    <label className="inline-flex items-center gap-2 cursor-pointer">

                                        <input
                                            type="checkbox"
                                            checked={data.status}
                                            onChange={(e) =>
                                                setData('status', e.target.checked)
                                            }
                                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                        />

                                        <span className="text-sm font-medium text-gray-700">
                                            Active Farm
                                        </span>

                                    </label>

                                    <InputError
                                        message={errors.status}
                                        className="mt-1"
                                    />

                                </div>


                                {/* Description */}
                                <div className="md:col-span-2">

                                    <InputLabel
                                        htmlFor="description"
                                        value="Description"
                                    />

                                    <TextArea
                                        id="description"
                                        rows={4}
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        placeholder="Enter farm description"
                                        onChange={(e) =>
                                            setData('description', e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.description}
                                        className="mt-1"
                                    />

                                </div>

                            </div>

                        </div>


                        {/* Form Footer */}
                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 px-6 py-4 border-t border-gray-300 bg-gray-50">

                            <Link href={route('farms.index')}>
                                <SecondaryButton type="button">
                                    <i className="fa fa-times me-1"></i>
                                    Cancel
                                </SecondaryButton>
                            </Link>

                            <PrimaryButton disabled={processing}>
                                <i className="fa fa-save me-1"></i>
                                {processing ? 'Saving...' : 'Save Farm'}
                            </PrimaryButton>

                        </div>

                    </form>

                </div>

            </div>

        </AuthenticatedLayout>
    );
}
