import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';

import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ farm }) {
    const { data, setData, put, processing, errors } = useForm({
        name: farm.name ?? '',
        total_area: farm.total_area ?? '',
        area_unit: farm.area_unit ?? 'acre',
        location: farm.location ?? '',
        description: farm.description ?? '',
        status: Boolean(farm.status),
    });

    const submit = (e) => {
        e.preventDefault();

        put(route('farms.update', farm.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Edit Farm
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Update your farm information.
                    </p>
                </div>
            }
        >
            <Head title="Edit Farm" />

            <div className="py-8">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

                    {/* Form Card */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">

                        <form onSubmit={submit}>

                            {/* Form Header */}
                            <div className="border-b border-gray-200 px-6 py-5">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Farm Information
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Update the details of this farm.
                                </p>
                            </div>

                            {/* Form Body */}
                            <div className="p-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                                    {/* Farm Name */}
                                    <div>
                                        <InputLabel
                                            htmlFor="name"
                                            value="Farm Name"
                                        />

                                        <TextInput
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            placeholder="Enter farm name"
                                            autoComplete="off"
                                            onChange={(e) =>
                                                setData(
                                                    'name',
                                                    e.target.value
                                                )
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
                                            name="total_area"
                                            value={data.total_area}
                                            className="mt-1 block w-full"
                                            placeholder="e.g. 13"
                                            min="0.01"
                                            step="0.01"
                                            onChange={(e) =>
                                                setData(
                                                    'total_area',
                                                    e.target.value
                                                )
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
                                            name="area_unit"
                                            value={data.area_unit}
                                            onChange={(e) =>
                                                setData(
                                                    'area_unit',
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        >
                                            <option value="acre">
                                                Acre
                                            </option>

                                            <option value="hectare">
                                                Hectare
                                            </option>

                                            <option value="decimal">
                                                Decimal
                                            </option>
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
                                            name="location"
                                            value={data.location}
                                            className="mt-1 block w-full"
                                            placeholder="Enter farm location"
                                            autoComplete="off"
                                            onChange={(e) =>
                                                setData(
                                                    'location',
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.location}
                                            className="mt-1"
                                        />
                                    </div>

                                    {/* Status */}
                                    <div className="flex items-center pt-6">
                                        <Checkbox
                                            id="status"
                                            name="status"
                                            checked={data.status}
                                            onChange={(e) =>
                                                setData(
                                                    'status',
                                                    e.target.checked
                                                )
                                            }
                                        />

                                        <InputLabel
                                            htmlFor="status"
                                            value="Active Farm"
                                            className="ms-2"
                                        />

                                        <InputError
                                            message={errors.status}
                                            className="ms-3"
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
                                            name="description"
                                            rows={4}
                                            value={data.description}
                                            className="mt-1 block w-full"
                                            placeholder="Enter farm description"
                                            onChange={(e) =>
                                                setData(
                                                    'description',
                                                    e.target.value
                                                )
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
                            <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">

                                <Link href={route('farms.index')}>
                                    <SecondaryButton type="button">
                                        Cancel
                                    </SecondaryButton>
                                </Link>

                                <PrimaryButton disabled={processing}>
                                    {processing
                                        ? 'Updating...'
                                        : 'Update Farm'}
                                </PrimaryButton>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}