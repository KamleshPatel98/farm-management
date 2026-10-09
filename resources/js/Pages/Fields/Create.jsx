
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';

import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ farms }) {
    const { data, setData, post, processing, errors } = useForm({
        farm_id: '',
        name: '',
        area: '',
        area_unit: 'acre',
        soil_type: '',
        water_source: '',
        description: '',
        status: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('fields.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Add Field
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Add a new field to your farm management system.
                    </p>
                </div>
            }
        >
            <Head title="Add Field" />

            <div className="py-8">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

                    {/* Form Card */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">

                        <form onSubmit={submit}>

                            {/* Form Header */}
                            <div className="border-b border-gray-200 px-6 py-5">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Field Information
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Enter the basic details of your field.
                                </p>
                            </div>

                            {/* Form Body */}
                            <div className="p-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                                    {/* Farm */}
                                    <div>
                                        <InputLabel
                                            htmlFor="farm_id"
                                            value="Farm"
                                        />

                                        <select
                                            id="farm_id"
                                            name="farm_id"
                                            value={data.farm_id}
                                            onChange={(e) =>
                                                setData('farm_id', e.target.value)
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        >
                                            <option value="">Select Farm</option>

                                            {farms.map((farm) => (
                                                <option key={farm.id} value={farm.id}>
                                                    {farm.name}
                                                </option>
                                            ))}
                                        </select>

                                        <InputError
                                            message={errors.farm_id}
                                            className="mt-1"
                                        />
                                    </div>

                                    {/* Field Name */}
                                    <div>
                                        <InputLabel
                                            htmlFor="name"
                                            value="Field Name"
                                        />

                                        <TextInput
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            placeholder="Enter field name"
                                            autoComplete="off"
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            required
                                        />

                                        <InputError
                                            message={errors.name}
                                            className="mt-1"
                                        />
                                    </div>

                                    {/* Area */}
                                    <div>
                                        <InputLabel
                                            htmlFor="area"
                                            value="Area"
                                        />

                                        <TextInput
                                            id="area"
                                            type="number"
                                            name="area"
                                            value={data.area}
                                            className="mt-1 block w-full"
                                            placeholder="e.g. 2.50"
                                            min="0.01"
                                            step="0.01"
                                            onChange={(e) =>
                                                setData('area', e.target.value)
                                            }
                                            required
                                        />

                                        <InputError
                                            message={errors.area}
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
                                                setData('area_unit', e.target.value)
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
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

                                    {/* Soil Type */}
                                    <div>
                                        <InputLabel
                                            htmlFor="soil_type"
                                            value="Soil Type"
                                        />

                                        <TextInput
                                            id="soil_type"
                                            type="text"
                                            name="soil_type"
                                            value={data.soil_type}
                                            className="mt-1 block w-full"
                                            placeholder="e.g. Clay, Sandy, Loamy"
                                            autoComplete="off"
                                            onChange={(e) =>
                                                setData('soil_type', e.target.value)
                                            }
                                        />

                                        <InputError
                                            message={errors.soil_type}
                                            className="mt-1"
                                        />
                                    </div>

                                    {/* Water Source */}
                                    <div>
                                        <InputLabel
                                            htmlFor="water_source"
                                            value="Water Source"
                                        />

                                        <TextInput
                                            id="water_source"
                                            type="text"
                                            name="water_source"
                                            value={data.water_source}
                                            className="mt-1 block w-full"
                                            placeholder="e.g. Borewell, Pond, Canal"
                                            autoComplete="off"
                                            onChange={(e) =>
                                                setData('water_source', e.target.value)
                                            }
                                        />

                                        <InputError
                                            message={errors.water_source}
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
                                                setData('status', e.target.checked)
                                            }
                                        />

                                        <InputLabel
                                            htmlFor="status"
                                            value="Active Field"
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
                                            placeholder="Enter field description"
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
                            <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">

                                <Link href={route('fields.index')}>
                                    <SecondaryButton type="button">
                                        Cancel
                                    </SecondaryButton>
                                </Link>

                                <PrimaryButton disabled={processing}>
                                    {processing ? 'Saving...' : 'Save Field'}
                                </PrimaryButton>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}