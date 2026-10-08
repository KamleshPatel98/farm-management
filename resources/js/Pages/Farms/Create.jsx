import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
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
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800">
                    Add Farm
                </h2>
            }
        >
            <Head title="Add Farm" />

            <div className="p-4 sm:p-6">

                <div className="max-w-3xl mx-auto">

                    <div className="bg-white rounded-xl shadow-sm border p-6">

                        <h1 className="text-xl font-bold text-gray-800 mb-6">
                            Add New Farm
                        </h1>

                        <form onSubmit={submit} className="space-y-5">

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Farm Name
                                </label>

                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full rounded-lg border-gray-300"
                                    placeholder="Enter farm name"
                                />

                                {errors.name && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Total Area
                                    </label>

                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.total_area}
                                        onChange={e => setData('total_area', e.target.value)}
                                        className="w-full rounded-lg border-gray-300"
                                        placeholder="13"
                                    />

                                    {errors.total_area && (
                                        <p className="text-red-600 text-sm mt-1">
                                            {errors.total_area}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Unit
                                    </label>

                                    <select
                                        value={data.area_unit}
                                        onChange={e => setData('area_unit', e.target.value)}
                                        className="w-full rounded-lg border-gray-300"
                                    >
                                        <option value="acre">Acre</option>
                                        <option value="hectare">Hectare</option>
                                        <option value="decimal">Decimal</option>
                                    </select>
                                </div>

                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Location
                                </label>

                                <input
                                    type="text"
                                    value={data.location}
                                    onChange={e => setData('location', e.target.value)}
                                    className="w-full rounded-lg border-gray-300"
                                    placeholder="Enter location"
                                />

                                {errors.location && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.location}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Description
                                </label>

                                <textarea
                                    rows="4"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full rounded-lg border-gray-300"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={data.status}
                                        onChange={e => setData('status', e.target.checked)}
                                        className="rounded"
                                    />

                                    <span className="text-sm">
                                        Active
                                    </span>
                                </label>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4">
                                <Link
                                    href={route('farms.index')}
                                    className="inline-flex items-center justify-center px-4 py-2.5 bg-white text-gray-700 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </Link>

                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition"
                                >
                                    Save Farm
                                </button>
                            </div>

                        </form>

                    </div>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}