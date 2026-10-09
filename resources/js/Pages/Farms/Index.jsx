import DeleteButton from '@/Components/DeleteButton';
import EditButton from '@/Components/EditButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ farms }) {


    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Farms
                </h2>
            }
        >
            <Head title="Farms" />

            <div className="p-4 sm:p-6">

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Farms
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Manage your farms
                        </p>
                    </div>

                    <Link
                        href={route('farms.create')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        + Add Farm
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full text-sm text-left">

                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-4">#</th>
                                    <th className="px-6 py-4">Farm Name</th>
                                    <th className="px-6 py-4">Area</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">

                                {farms.data.length > 0 ? (
                                    farms.data.map((farm, index) => (
                                        <tr key={farm.id} className="hover:bg-gray-50">

                                            <td className="px-6 py-4">
                                                {farms.from + index}
                                            </td>

                                            <td className="px-6 py-4 font-medium text-gray-800">
                                                {farm.name}
                                            </td>

                                            <td className="px-6 py-4">
                                                {farm.total_area} {farm.area_unit}
                                            </td>

                                            <td className="px-6 py-4">
                                                {farm.location || '-'}
                                            </td>

                                            <td className="px-6 py-4">
                                                {farm.status ? (
                                                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">
                                                        Inactive
                                                    </span>
                                                )}
                                            </td>

                                            <td className="px-6 py-4 text-right space-x-2">

                                                <div className="flex justify-end gap-2">

                                                    <EditButton
                                                        href={route('farms.edit', farm.id)} 
                                                    />

                                                    <DeleteButton
                                                        url={route('farms.destroy', farm.id)}
                                                        title="Delete Farm?"
                                                        text="Are you sure you want to delete this farm? This action cannot be undone."
                                                        successText="Farm has been deleted successfully."
                                                    />

                                                </div>

                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="px-6 py-10 text-center text-gray-500"
                                        >
                                            No farms found.
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </table>

                    </div>

                    {/* Pagination */}
                    {farms.links.length > 3 && (
                        <div className="flex flex-wrap gap-1 p-4 border-t">
                            {farms.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-1 rounded border text-sm ${
                                        link.active
                                            ? 'bg-green-600 text-white'
                                            : 'bg-white text-gray-700'
                                    } ${!link.url ? 'opacity-50 pointer-events-none' : ''}`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    )}

                </div>

            </div>
        </AuthenticatedLayout>
    );
}