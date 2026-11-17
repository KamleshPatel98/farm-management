import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ fieldCrop, fields, crops }) {
    const { data, setData, put, processing, errors } = useForm({
        field_id: String(fieldCrop.field_id ?? ''),
        crop_id: String(fieldCrop.crop_id ?? ''),
        season: fieldCrop.season ?? 'Kharif',
        sowing_date: fieldCrop.sowing_date ?? '',
        expected_harvest_date: fieldCrop.expected_harvest_date ?? '',
        area: fieldCrop.area ?? '',
        status: fieldCrop.status ?? 'planned',
    });

    const selectedField = fields.find(
        (field) => String(field.id) === String(data.field_id)
    );

    const submit = (e) => {
        e.preventDefault();
        put(route('field-crops.update', fieldCrop.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Field Crop" />

            <div className="p-4 sm:p-6">
                {/* Page Header */}
                <div className="bg-white shadow-sm mb-2">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-6 py-4 border-b">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                Field Crop Management
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Assign and manage crops planted in your fields.
                            </p>
                        </div>

                        <Link
                            href={route('field-crops.index')}
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
                                Edit Field Crop
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                Update the crop, field, season, and cultivation details.
                            </p>
                        </div>

                        {/* Form Body */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Field */}
                                <div>
                                    <InputLabel htmlFor="field_id" value="Field" />

                                    <select
                                        id="field_id"
                                        name="field_id"
                                        value={data.field_id}
                                        onChange={(e) => {
                                            const fieldId = e.target.value;
                                            const field = fields.find(
                                                (item) =>
                                                    String(item.id) === fieldId
                                            );

                                            setData((previous) => ({
                                                ...previous,
                                                field_id: fieldId,
                                                area: field?.area
                                                    ? String(field.area)
                                                    : '',
                                            }));
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    >
                                        <option value="">Select Field</option>

                                        {fields.map((field) => (
                                            <option
                                                key={field.id}
                                                value={field.id}
                                            >
                                                {field.name}
                                                {field.farm?.name
                                                    ? ` - ${field.farm.name}`
                                                    : ''}
                                            </option>
                                        ))}
                                    </select>

                                    <InputError
                                        message={errors.field_id}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Crop */}
                                <div>
                                    <InputLabel htmlFor="crop_id" value="Crop" />

                                    <select
                                        id="crop_id"
                                        name="crop_id"
                                        value={data.crop_id}
                                        onChange={(e) =>
                                            setData('crop_id', e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    >
                                        <option value="">Select Crop</option>

                                        {crops.map((crop) => (
                                            <option
                                                key={crop.id}
                                                value={crop.id}
                                            >
                                                {crop.name}
                                            </option>
                                        ))}
                                    </select>

                                    <InputError
                                        message={errors.crop_id}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Season */}
                                <div>
                                    <InputLabel htmlFor="season" value="Season" />

                                    <select
                                        id="season"
                                        name="season"
                                        value={data.season}
                                        onChange={(e) =>
                                            setData('season', e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    >
                                        <option value="Kharif">Kharif</option>
                                        <option value="Rabi">Rabi</option>
                                        <option value="Zaid">Zaid</option>
                                        <option value="Perennial">Perennial</option>
                                    </select>

                                    <InputError
                                        message={errors.season}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Area */}
                                <div>
                                    <InputLabel
                                        htmlFor="area"
                                        value={`Cultivation Area${selectedField?.area_unit
                                                ? ` (${selectedField.area_unit})`
                                                : ''
                                            }`}
                                    />

                                    <TextInput
                                        id="area"
                                        type="number"
                                        name="area"
                                        value={data.area}
                                        className="mt-1 block w-full"
                                        placeholder="e.g. 1.50"
                                        min="0.01"
                                        max={selectedField?.area || undefined}
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

                                    {selectedField && (
                                        <p className="mt-1 text-xs text-gray-500">
                                            Total field area: {selectedField.area}{' '}
                                            {selectedField.area_unit}
                                        </p>
                                    )}
                                </div>

                                {/* Sowing Date */}
                                <div>
                                    <InputLabel
                                        htmlFor="sowing_date"
                                        value="Sowing Date"
                                    />

                                    <TextInput
                                        id="sowing_date"
                                        type="date"
                                        name="sowing_date"
                                        value={data.sowing_date}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData('sowing_date', e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.sowing_date}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Expected Harvest Date */}
                                <div>
                                    <InputLabel
                                        htmlFor="expected_harvest_date"
                                        value="Expected Harvest Date"
                                    />

                                    <TextInput
                                        id="expected_harvest_date"
                                        type="date"
                                        name="expected_harvest_date"
                                        value={data.expected_harvest_date}
                                        min={data.sowing_date || undefined}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                'expected_harvest_date',
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.expected_harvest_date}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Status */}
                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="status" value="Status" />

                                    <select
                                        id="status"
                                        name="status"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData('status', e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    >
                                        <option value="planned">Planned</option>
                                        <option value="sown">Sown</option>
                                        <option value="growing">Growing</option>
                                        <option value="harvested">Harvested</option>
                                    </select>

                                    <InputError
                                        message={errors.status}
                                        className="mt-1"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Form Footer */}
                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 px-6 py-4 border-t border-gray-300 bg-gray-50">
                            <Link href={route('field-crops.index')}>
                                <SecondaryButton type="button">
                                    <i className="fa fa-times me-1"></i>
                                    Cancel
                                </SecondaryButton>
                            </Link>

                            <PrimaryButton disabled={processing}>
                                <i className="fa fa-save me-1"></i>
                                {processing
                                    ? 'Updating...'
                                    : 'Update Field Crop'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}