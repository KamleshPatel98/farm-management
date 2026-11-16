
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';

import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ field, farms }) {

    const { data, setData, put, processing, errors } = useForm({
        farm_id: String(field.farm_id ?? ''),
        name: field.name ?? '',
        area: field.area ?? '',
        area_unit: field.area_unit ?? 'acre',
        soil_type: field.soil_type ?? '',
        water_source: field.water_source ?? '',
        description: field.description ?? '',
        status: Boolean(field.status),
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('fields.update', field.id));
    };

    return (
        <AuthenticatedLayout>

            <Head title="Edit Field" />

            <div className="p-4 sm:p-6">

                {/* Page Header */}
                <div className="bg-white shadow-sm mb-2">

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-6 py-4 border-b">

                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                Field Management
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Create, edit, and manage your fields.
                            </p>
                        </div>

                        <Link
                            href={route('fields.index')}
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
                                Edit Field
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                Update the details of this field.
                            </p>

                        </div>


                        {/* Form Body */}
                        <div className="p-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                {/* Farm */}
                                <div>
                                    <InputLabel
                                        htmlFor="farm_id"
                                        value="Farm"
                                    />

                                    <select
                                        id="farm_id"
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
                                        value={data.soil_type}
                                        className="mt-1 block w-full"
                                        placeholder="Enter soil type"
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
                                        value={data.water_source}
                                        className="mt-1 block w-full"
                                        placeholder="Enter water source"
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
                                            Active Field
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
                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 px-6 py-4 border-t border-gray-300 bg-gray-50">

                            <Link href={route('fields.index')}>
                                <SecondaryButton type="button">
                                    <i className="fa fa-times me-1"></i>
                                    Cancel
                                </SecondaryButton>
                            </Link>

                            <PrimaryButton disabled={processing}>
                                <i className="fa fa-save me-1"></i>
                                {processing ? 'Updating...' : 'Update Field'}
                            </PrimaryButton>

                        </div>

                    </form>

                </div>

            </div>

        </AuthenticatedLayout>
    );
}
