
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import Checkbox from '@/Components/Checkbox';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ crop }) {
    const { data, setData, put, processing, errors } = useForm({
        name: crop.name || '',
        crop_type: crop.crop_type || 'Cereal',
        duration_days: crop.duration_days ?? '',
        scientific_name: crop.scientific_name || '',
        description: crop.description || '',
        status: Boolean(crop.status),
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('crops.update', crop.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Crops</h2>
                    <p className="mt-1 text-sm text-gray-500">Update crop information</p>
                </div>
            }
        >
            <Head title="Edit Crop" />

            <div className="py-8">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
                        <div className="border-b border-gray-200 px-6 py-5">
                            <h3 className="text-lg font-semibold text-gray-800">Edit Crop</h3>
                            <p className="mt-1 text-sm text-gray-500">Update the crop details below.</p>
                        </div>

                        <form onSubmit={submit}>
                            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                                <div>
                                    <InputLabel htmlFor="name" value="Crop Name *" />
                                    <TextInput
                                        id="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-1" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="crop_type" value="Crop Type *" />
                                    <select
                                        id="crop_type"
                                        value={data.crop_type}
                                        onChange={(e) => setData('crop_type', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    >
                                        {['Cereal', 'Pulse', 'Vegetable', 'Fruit', 'Oilseed', 'Spice', 'Other'].map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                    <InputError message={errors.crop_type} className="mt-1" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="duration_days" value="Duration (Days)" />
                                    <TextInput
                                        id="duration_days"
                                        type="number"
                                        min="1"
                                        value={data.duration_days}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('duration_days', e.target.value)}
                                    />
                                    <InputError message={errors.duration_days} className="mt-1" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="scientific_name" value="Scientific Name" />
                                    <TextInput
                                        id="scientific_name"
                                        value={data.scientific_name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('scientific_name', e.target.value)}
                                    />
                                    <InputError message={errors.scientific_name} className="mt-1" />
                                </div>

                                <div className="flex items-center pt-6">
                                    <Checkbox
                                        id="status"
                                        checked={data.status}
                                        onChange={(e) => setData('status', e.target.checked)}
                                    />
                                    <InputLabel htmlFor="status" value="Active Crop" className="ms-2" />
                                </div>

                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="description" value="Description" />
                                    <TextArea
                                        id="description"
                                        rows={4}
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError message={errors.description} className="mt-1" />
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                                <Link href={route('crops.index')}>
                                    <SecondaryButton type="button">Cancel</SecondaryButton>
                                </Link>
                                <PrimaryButton disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Crop'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}