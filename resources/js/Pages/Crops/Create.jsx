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
        crop_type: 'Cereal',
        duration_days: '',
        scientific_name: '',
        description: '',
        status: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('crops.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Add Crop" />

            <div className="p-4 sm:p-6">
                {/* Page Header */}
                <div className="bg-white shadow-sm mb-2">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-6 py-4 border-b">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                Crop Management
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Create, edit, and manage your crop master data.
                            </p>
                        </div>

                        <Link
                            href={route('crops.index')}
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
                                Add Crop
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                Enter the details to create a new crop.
                            </p>
                        </div>

                        {/* Form Body */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Crop Name */}
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="Crop Name"
                                    />

                                    <TextInput
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        placeholder="Enter crop name"
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

                                {/* Crop Type */}
                                <div>
                                    <InputLabel
                                        htmlFor="crop_type"
                                        value="Crop Type"
                                    />

                                    <select
                                        id="crop_type"
                                        value={data.crop_type}
                                        onChange={(e) =>
                                            setData('crop_type', e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    >
                                        {[
                                            'Cereal',
                                            'Pulse',
                                            'Vegetable',
                                            'Fruit',
                                            'Oilseed',
                                            'Spice',
                                            'Other',
                                        ].map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>

                                    <InputError
                                        message={errors.crop_type}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Duration */}
                                <div>
                                    <InputLabel
                                        htmlFor="duration_days"
                                        value="Duration (Days)"
                                    />

                                    <TextInput
                                        id="duration_days"
                                        type="number"
                                        value={data.duration_days}
                                        className="mt-1 block w-full"
                                        placeholder="e.g. 90"
                                        min="1"
                                        onChange={(e) =>
                                            setData('duration_days', e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.duration_days}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Scientific Name */}
                                <div>
                                    <InputLabel
                                        htmlFor="scientific_name"
                                        value="Scientific Name"
                                    />

                                    <TextInput
                                        id="scientific_name"
                                        type="text"
                                        value={data.scientific_name}
                                        className="mt-1 block w-full"
                                        placeholder="e.g. Oryza sativa"
                                        autoComplete="off"
                                        onChange={(e) =>
                                            setData('scientific_name', e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.scientific_name}
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
                                            Active Crop
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
                                        placeholder="Enter crop description"
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
                            <Link href={route('crops.index')}>
                                <SecondaryButton type="button">
                                    <i className="fa fa-times me-1"></i>
                                    Cancel
                                </SecondaryButton>
                            </Link>

                            <PrimaryButton disabled={processing}>
                                <i className="fa fa-save me-1"></i>
                                {processing ? 'Saving...' : 'Save Crop'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}