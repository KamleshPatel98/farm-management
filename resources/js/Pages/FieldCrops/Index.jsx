
import DeleteButton from '@/Components/DeleteButton';
import EditButton from '@/Components/EditButton';
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ fieldCrops }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Field Crops
                </h2>
            }
        >
            <Head title="Field Crops" />

            <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Field Crops
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Manage crops planted in your fields
                        </p>
                    </div>

                    <Link
                        href={route('field-crops.create')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 whitespace-nowrap"
                    >
                        + Add Field Crop
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-4">#</th>
                                    <th className="px-6 py-4">Field</th>
                                    <th className="px-6 py-4">Farm</th>
                                    <th className="px-6 py-4">Crop</th>
                                    <th className="px-6 py-4">Season</th>
                                    <th className="px-6 py-4">Area</th>
                                    <th className="px-6 py-4">Sowing Date</th>
                                    <th className="px-6 py-4">Expected Harvest</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {fieldCrops.data.length > 0 ? (
                                    fieldCrops.data.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-2">
                                                {fieldCrops.from + index}
                                            </td>

                                            <td className="px-6 py-2 font-medium text-gray-800">
                                                {item.field?.name || '-'}
                                            </td>

                                            <td className="px-6 py-2">
                                                {item.field?.farm?.name || '-'}
                                            </td>

                                            <td className="px-6 py-2">
                                                {item.crop?.name || '-'}
                                            </td>

                                            <td className="px-6 py-2">
                                                {item.season || '-'}
                                            </td>

                                            <td className="px-6 py-2">
                                                {item.area ?? '-'}
                                                {item.area != null && item.field?.area_unit
                                                    ? ` ${item.field.area_unit}`
                                                    : ''}
                                            </td>

                                            <td className="px-6 py-2">
                                                {item.sowing_date
                                                    ? new Date(item.sowing_date).toLocaleDateString('en-GB')
                                                    : '-'}
                                            </td>

                                            <td className="px-6 py-2">
                                                {item.expected_harvest_date
                                                    ? new Date(item.expected_harvest_date).toLocaleDateString('en-GB')
                                                    : '-'}
                                            </td>

                                            <td className="px-6 py-2">
                                                <span
                                                    className={`px-2 py-1 text-xs rounded-full ${
                                                        item.status === 'harvested'
                                                            ? 'bg-green-100 text-green-700'
                                                            : item.status === 'growing'
                                                              ? 'bg-blue-100 text-blue-700'
                                                              : item.status === 'sown'
                                                                ? 'bg-yellow-100 text-yellow-700'
                                                                : 'bg-gray-100 text-gray-700'
                                                    }`}
                                                >
                                                    {item.status
                                                        ? item.status.charAt(0).toUpperCase() +
                                                          item.status.slice(1)
                                                        : '-'}
                                                </span>
                                            </td>

                                            <td className="px-6 py-2 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <EditButton
                                                        href={route(
                                                            'field-crops.edit',
                                                            item.id
                                                        )}
                                                    />

                                                    <DeleteButton
                                                        url={route(
                                                            'field-crops.destroy',
                                                            item.id
                                                        )}
                                                        title="Delete Field Crop?"
                                                        text={`Are you sure you want to delete this crop record?`}
                                                        successText="Field crop has been deleted successfully."
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="10"
                                            className="px-6 py-10 text-center text-gray-500"
                                        >
                                            No field crops found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <Pagination links={fieldCrops.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}