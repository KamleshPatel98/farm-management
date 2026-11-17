import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';

import DeleteButton from '@/Components/DeleteButton';
import EditButton from '@/Components/EditButton';
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ fieldCrops, filters = {} }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || '');

    const handleSearch = (e) => {
        e.preventDefault();

        router.get(
            route('field-crops.index'),
            {
                search: search,
                status: status,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const handleReset = () => {
        setSearch('');
        setStatus('');

        router.get(
            route('field-crops.index'),
            {},
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const getStatusBadge = (itemStatus) => {
        switch (itemStatus) {
            case 'harvested':
                return 'bg-green-600 text-white';
            case 'growing':
                return 'bg-blue-600 text-white';
            case 'sown':
                return 'bg-amber-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Field Crop Management" />

            <div className="p-4 sm:p-6">
                {/* Page Header */}
                <div className="bg-white shadow-sm mb-2">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 px-6 py-4 border-b">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                Field Crop Management
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Create, edit, and manage crops planted in your fields.
                            </p>
                        </div>

                        <Link
                            href={route('field-crops.create')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0c0b32] text-white rounded-md hover:bg-[#17154d] transition"
                        >
                            <i className="fa fa-plus"></i>
                            Add Field Crop
                        </Link>
                    </div>
                </div>

                {/* Field Crop List Card */}
                <div className="bg-white shadow-md">
                    {/* Search Header */}
                    <div className="px-6 py-4 border-b border-gray-300">
                        <form onSubmit={handleSearch}>
                            <div className="flex flex-col xl:flex-row xl:items-center gap-3">
                                {/* Title */}
                                <div className="xl:w-1/4">
                                    <h3 className="text-xl font-semibold text-gray-800 whitespace-nowrap">
                                        🌾 Field Crop List
                                    </h3>
                                </div>

                                {/* Search */}
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search by crop, field, or farm..."
                                        className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                {/* Status Filter */}
                                <div className="flex-1">
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    >
                                        <option value="">All Status</option>
                                        <option value="planned">Planned</option>
                                        <option value="sown">Sown</option>
                                        <option value="growing">Growing</option>
                                        <option value="harvested">Harvested</option>
                                    </select>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-2">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0c0b32] text-white rounded-md hover:bg-[#17154d] transition text-sm"
                                    >
                                        <i className="fa fa-search"></i>
                                        Search
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-400 text-gray-600 rounded-md hover:bg-gray-100 transition text-sm"
                                    >
                                        <i className="fa fa-refresh"></i>
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Field Crops Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead className="bg-gray-100 text-gray-900">
                                <tr className="border-b border-gray-300">
                                    <th className="px-4 py-3 border border-gray-300 text-right">
                                        SN.
                                    </th>
                                    <th className="px-4 py-3 border border-gray-300">
                                        Field
                                    </th>
                                    <th className="px-4 py-3 border border-gray-300">
                                        Farm
                                    </th>
                                    <th className="px-4 py-3 border border-gray-300">
                                        Crop
                                    </th>
                                    <th className="px-4 py-3 border border-gray-300">
                                        Season
                                    </th>
                                    <th className="px-4 py-3 border border-gray-300">
                                        Area
                                    </th>
                                    <th className="px-4 py-3 border border-gray-300">
                                        Sowing Date
                                    </th>
                                    <th className="px-4 py-3 border border-gray-300">
                                        Expected Harvest
                                    </th>
                                    <th className="px-4 py-3 border border-gray-300 text-center">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 border border-gray-300 text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {fieldCrops.data.length > 0 ? (
                                    fieldCrops.data.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="border-b border-gray-200 hover:bg-gray-50 transition"
                                        >
                                            <td className="px-4 py-3 border border-gray-200 text-right">
                                                {fieldCrops.from + index}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200 font-medium text-gray-800">
                                                {item.field?.name || '-'}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200">
                                                {item.field?.farm?.name || '-'}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200 font-medium text-gray-800">
                                                {item.crop?.name || '-'}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200">
                                                {item.season || '-'}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200">
                                                {item.area ?? '-'}
                                                {item.area != null && item.field?.area_unit
                                                    ? ` ${item.field.area_unit}`
                                                    : ''}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200">
                                                {item.sowing_date
                                                    ? new Date(item.sowing_date).toLocaleDateString('en-GB')
                                                    : '-'}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200">
                                                {item.expected_harvest_date
                                                    ? new Date(item.expected_harvest_date).toLocaleDateString('en-GB')
                                                    : '-'}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200 text-center">
                                                <span
                                                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-md ${getStatusBadge(
                                                        item.status
                                                    )}`}
                                                >
                                                    {item.status
                                                        ? item.status.charAt(0).toUpperCase() +
                                                        item.status.slice(1)
                                                        : '-'}
                                                </span>
                                            </td>

                                            <td className="px-4 py-2 border border-gray-200">
                                                <div className="flex justify-center items-center gap-2">
                                                    <EditButton
                                                        href={route('field-crops.edit', item.id)}
                                                    />

                                                    <DeleteButton
                                                        url={route('field-crops.destroy', item.id)}
                                                        title="Delete Field Crop?"
                                                        text="Are you sure you want to delete this crop record? This action cannot be undone."
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
                                            className="px-4 py-10 text-center text-gray-500 border border-gray-200"
                                        >
                                            No Field Crops Found!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-4 py-3">
                        <Pagination links={fieldCrops.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}