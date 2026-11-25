import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ labour }) {
    const { data, setData, put, processing, errors } = useForm({
        name: labour?.name ?? '',
        mobile: labour?.mobile ?? '',
        address: labour?.address ?? '',
        default_daily_wage: labour?.default_daily_wage ?? '',
        is_active: Boolean(labour?.is_active),
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('labours.update', labour.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Labour" />

            <div className="p-4 sm:p-6">
                {/* Page Header */}
                <div className="bg-white shadow-sm mb-2">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-6 py-4 border-b">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                Labour Management
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Create, edit, and manage your farm labours and daily wages.
                            </p>
                        </div>

                        <Link
                            href={route('labours.index')}
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
                                Edit Labour
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                Update the details for this labour record.
                            </p>
                        </div>

                        {/* Form Body */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Labour Name */}
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="Name"
                                    />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        placeholder="Enter full name"
                                        autoComplete="off"
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />

                                    <InputError
                                        message={errors.name}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Mobile */}
                                <div>
                                    <InputLabel
                                        htmlFor="mobile"
                                        value="Mobile"
                                    />

                                    <TextInput
                                        id="mobile"
                                        name="mobile"
                                        type="text"
                                        maxLength={15}
                                        value={data.mobile}
                                        className="mt-1 block w-full"
                                        placeholder="e.g. 9876543210"
                                        autoComplete="off"
                                        onChange={(e) => setData('mobile', e.target.value)}
                                    />

                                    <InputError
                                        message={errors.mobile}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Default Daily Wage */}
                                <div>
                                    <InputLabel
                                        htmlFor="default_daily_wage"
                                        value="Default Daily Wage"
                                    />

                                    <TextInput
                                        id="default_daily_wage"
                                        name="default_daily_wage"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.default_daily_wage}
                                        className="mt-1 block w-full"
                                        placeholder="0.00"
                                        onChange={(e) => setData('default_daily_wage', e.target.value)}
                                        required
                                    />

                                    <InputError
                                        message={errors.default_daily_wage}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Status */}
                                <div>
                                    <InputLabel
                                        htmlFor="is_active"
                                        value="Status"
                                    />

                                    <select
                                        id="is_active"
                                        name="is_active"
                                        value={data.is_active ? '1' : '0'}
                                        onChange={(e) => setData('is_active', e.target.value === '1')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>

                                    <InputError
                                        message={errors.is_active}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Address */}
                                <div className="md:col-span-2">
                                    <InputLabel
                                        htmlFor="address"
                                        value="Address"
                                    />

                                    <TextInput
                                        id="address"
                                        name="address"
                                        type="text"
                                        value={data.address}
                                        className="mt-1 block w-full"
                                        placeholder="Village, taluka, or street address"
                                        autoComplete="off"
                                        onChange={(e) => setData('address', e.target.value)}
                                    />

                                    <InputError
                                        message={errors.address}
                                        className="mt-1"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Form Footer */}
                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 px-6 py-4 border-t border-gray-300 bg-gray-50">
                            <Link href={route('labours.index')}>
                                <SecondaryButton type="button" disabled={processing}>
                                    <i className="fa fa-times me-1"></i>
                                    Cancel
                                </SecondaryButton>
                            </Link>

                            <PrimaryButton type="submit" disabled={processing}>
                                <i className="fa fa-save me-1"></i>
                                {processing ? 'Updating...' : 'Update Labour'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}