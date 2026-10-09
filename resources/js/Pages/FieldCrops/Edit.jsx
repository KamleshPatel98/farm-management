
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
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Edit Field Crop
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Update your field crop information.
                    </p>
                </div>
            }
        >
            <Head title="Edit Field Crop" />

            <div className="py-8">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
                        <form onSubmit={submit}>
                            <div className="border-b border-gray-200 px-6 py-5">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Field Crop Information
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Update the crop, field, season and cultivation details.
                                </p>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                                            value={`Cultivation Area${
                                                selectedField?.area_unit
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
                                    <div>
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

                            <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                                <Link href={route('field-crops.index')}>
                                    <SecondaryButton type="button">
                                        Cancel
                                    </SecondaryButton>
                                </Link>

                                <PrimaryButton disabled={processing}>
                                    {processing
                                        ? 'Updating...'
                                        : 'Update Field Crop'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}