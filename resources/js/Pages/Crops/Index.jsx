
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteButton from '@/Components/DeleteButton';
import EditButton from '@/Components/EditButton';
import { Head, Link } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';

export default function Index({ crops }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Crops
                </h2>
            }
        >
            <Head title="Crops" />

            <div className="p-4 sm:p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Crops</h1>
                        <p className="mt-1 text-gray-500">Manage your crop master data</p>
                    </div>

                    <Link
                        href={route('crops.create')}
                        className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                    >
                        + Add Crop
                    </Link>
                </div>

                <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4">#</th>
                                    <th className="px-6 py-4">Crop Name</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Duration</th>
                                    <th className="px-6 py-4">Scientific Name</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {crops.data.length > 0 ? (
                                    crops.data.map((crop, index) => (
                                        <tr key={crop.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">{crops.from + index}</td>
                                            <td className="px-6 py-4 font-medium text-gray-800">{crop.name}</td>
                                            <td className="px-6 py-4">{crop.crop_type}</td>
                                            <td className="px-6 py-4">
                                                {crop.duration_days ? `${crop.duration_days} days` : '-'}
                                            </td>
                                            <td className="px-6 py-4">{crop.scientific_name || '-'}</td>
                                            <td className="px-6 py-4">
                                                {crop.status ? (
                                                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-700">
                                                        Inactive
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <EditButton href={route('crops.edit', crop.id)} />
                                                    <DeleteButton
                                                        url={route('crops.destroy', crop.id)}
                                                        title="Delete Crop?"
                                                        text={`Are you sure you want to delete "${crop.name}"? This action cannot be undone.`}
                                                        successTitle="Deleted!"
                                                        successText="Crop deleted successfully."
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                                            No crops found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <Pagination links={crops.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}