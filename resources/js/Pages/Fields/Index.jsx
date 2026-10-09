
import DeleteButton from '@/Components/DeleteButton';
import EditButton from '@/Components/EditButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ fields }) {
    return (
        
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Fields
                </h2>
            }
        >
            <Head title="Fields" />

            <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Fields
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Manage your farm fields
                        </p>
                    </div>

                    <Link
                        href={route('fields.create')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        + Add Field
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-4">#</th>
                                    <th className="px-6 py-4">Field Name</th>
                                    <th className="px-6 py-4">Farm</th>
                                    <th className="px-6 py-4">Area</th>
                                    <th className="px-6 py-4">Soil Type</th>
                                    <th className="px-6 py-4">Water Source</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {fields.data.length > 0 ? (
                                    fields.data.map((field, index) => (
                                        <tr
                                            key={field.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4">
                                                {fields.from + index}
                                            </td>

                                            <td className="px-6 py-4 font-medium text-gray-800">
                                                {field.name}
                                            </td>

                                            <td className="px-6 py-4">
                                                {field.farm?.name || '-'}
                                            </td>

                                            <td className="px-6 py-4">
                                                {field.area} {field.area_unit}
                                            </td>

                                            <td className="px-6 py-4">
                                                {field.soil_type || '-'}
                                            </td>

                                            <td className="px-6 py-4">
                                                {field.water_source || '-'}
                                            </td>

                                            <td className="px-6 py-4">
                                                {field.status ? (
                                                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">
                                                        Inactive
                                                    </span>
                                                )}
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <EditButton
                                                        href={route('fields.edit', field.id)}
                                                    />

                                                    <DeleteButton
                                                        url={route('fields.destroy', field.id)}
                                                        title="Delete Field?"
                                                        text={`Are you sure you want to delete "${field.name}"? This action cannot be undone.`}
                                                        successText="Field has been deleted successfully."
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="8"
                                            className="px-6 py-10 text-center text-gray-500"
                                        >
                                            No fields found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {fields.links.length > 3 && (
                        <div className="flex flex-wrap gap-1 p-4 border-t">
                            {fields.links.map((link, index) => (
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