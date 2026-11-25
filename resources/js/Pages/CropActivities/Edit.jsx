import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';

import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ cropActivity, fieldCrops = [] }) {
    const { data, setData, put, processing, errors } = useForm({
        field_crop_id: cropActivity?.field_crop_id ?? '',
        name: cropActivity?.name ?? '',
        date: cropActivity?.date ?? '',
        notes: cropActivity?.notes ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('crop-activities.update', cropActivity.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Crop Activity" />

            <div className="p-4 sm:p-6">
                {/* Page Header */}
                <div className="bg-white shadow-sm mb-2">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-6 py-4 border-b">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                Crop Activity Management
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Record, edit, and track field crop activities.
                            </p>
                        </div>

                        <Link
                            href={route('crop-activities.index')}
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
                                Edit Crop Activity
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                Update the details for this crop activity.
                            </p>
                        </div>

                        {/* Form Body */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Field Crop */}
                                <div>
                                    <InputLabel
                                        htmlFor="field_crop_id"
                                        value="Field Crop"
                                    />

                                    <select
                                        id="field_crop_id"
                                        name="field_crop_id"
                                        value={data.field_crop_id}
                                        onChange={(e) => {
                                            setData('field_crop_id', e.target.value);
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    >
                                        <option value="" disabled>
                                            Select a field crop
                                        </option>
                                        {fieldCrops.map((fieldCrop) => (
                                            <option
                                                key={fieldCrop.id}
                                                value={fieldCrop.id}
                                            >
                                                {[
                                                    fieldCrop?.field?.farm?.name,
                                                    fieldCrop?.field?.name,
                                                    fieldCrop?.crop?.name,
                                                ]
                                                    .filter(Boolean)
                                                    .join(' / ')}
                                            </option>
                                        ))}
                                    </select>

                                    <InputError
                                        message={errors.field_crop_id}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Activity Name */}
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="Activity Name"
                                    />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        placeholder="e.g. Irrigation, Fertilizing, Weeding"
                                        autoComplete="off"
                                        onChange={(e) => {
                                            setData('name', e.target.value);
                                        }}
                                        required
                                    />

                                    <InputError
                                        message={errors.name}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Activity Date */}
                                <div className="md:col-span-2">
                                    <InputLabel
                                        htmlFor="date"
                                        value="Date"
                                    />

                                    <TextInput
                                        id="date"
                                        name="date"
                                        type="date"
                                        value={data.date}
                                        className="mt-1 block w-full md:w-1/2"
                                        onChange={(e) => {
                                            setData('date', e.target.value);
                                        }}
                                        required
                                    />

                                    <InputError
                                        message={errors.date}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Notes */}
                                <div className="md:col-span-2">
                                    <InputLabel
                                        htmlFor="notes"
                                        value="Notes"
                                    />

                                    <TextArea
                                        id="notes"
                                        name="notes"
                                        rows={4}
                                        value={data.notes}
                                        className="mt-1 block w-full"
                                        placeholder="Enter activity notes or observations"
                                        onChange={(e) => {
                                            setData('notes', e.target.value);
                                        }}
                                        required
                                    />

                                    <InputError
                                        message={errors.notes}
                                        className="mt-1"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Form Footer */}
                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 px-6 py-4 border-t border-gray-300 bg-gray-50">
                            <Link href={route('crop-activities.index')}>
                                <SecondaryButton type="button" disabled={processing}>
                                    <i className="fa fa-times me-1"></i>
                                    Cancel
                                </SecondaryButton>
                            </Link>

                            <PrimaryButton type="submit" disabled={processing}>
                                <i className="fa fa-save me-1"></i>
                                {processing ? 'Updating...' : 'Update Activity'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}