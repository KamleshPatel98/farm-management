import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';

import DeleteButton from '@/Components/DeleteButton';
import EditButton from '@/Components/EditButton';
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ crops, filters = {} }) {
    const [name, setName] = useState(filters.name || '');
    const [status, setStatus] = useState(filters.status ?? '');

    const handleSearch = (e) => {
        e.preventDefault();

        router.get(
            route('crops.index'),
            {
                name: name,
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
        setName('');
        setStatus('');

        router.get(
            route('crops.index'),
            {},
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="Crop Management" />

            <div className="p-4 sm:p-6">
                {/* Page Header */}
                <div className="bg-white shadow-sm mb-2">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 px-6 py-4 border-b">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                Crop Management
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Create, edit, and manage your crop master data.
                            </p>
                        </div>

                        <Link
                            href={route('crops.create')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0c0b32] text-white rounded-md hover:bg-[#17154d] transition"
                        >
                            <i className="fa fa-plus"></i>
                            Add Crop
                        </Link>
                    </div>
                </div>

                {/* Crop List Card */}
                <div className="bg-white shadow-md">
                    {/* Search Header */}
                    <div className="px-6 py-4 border-b border-gray-300">
                        <form onSubmit={handleSearch}>
                            <div className="flex flex-col xl:flex-row xl:items-center gap-3">
                                {/* Title */}
                                <div className="xl:w-1/4">
                                    <h3 className="text-xl font-semibold text-gray-800 whitespace-nowrap">
                                        🌱 Crop List
                                    </h3>
                                </div>

                                {/* Search by Name */}
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Search by crop name..."
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
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
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

                    {/* Crops Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead className="bg-gray-100 text-gray-900">
                                <tr className="border-b border-gray-300">
                                    <th className="px-4 py-3 border border-gray-300 text-right">
                                        SN.
                                    </th>
                                    <th className="px-4 py-3 border border-gray-300">
                                        Crop Name
                                    </th>
                                    <th className="px-4 py-3 border border-gray-300">
                                        Type
                                    </th>
                                    <th className="px-4 py-3 border border-gray-300">
                                        Duration
                                    </th>
                                    <th className="px-4 py-3 border border-gray-300">
                                        Scientific Name
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
                                {crops.data.length > 0 ? (
                                    crops.data.map((crop, index) => (
                                        <tr
                                            key={crop.id}
                                            className="border-b border-gray-200 hover:bg-gray-50 transition"
                                        >
                                            <td className="px-4 py-3 border border-gray-200 text-right">
                                                {crops.from + index}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200 font-medium text-gray-800">
                                                {crop.name}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200">
                                                {crop.crop_type || '-'}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200">
                                                {crop.duration_days ? `${crop.duration_days} days` : '-'}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200 italic text-gray-600">
                                                {crop.scientific_name || '-'}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200 text-center">
                                                {crop.status ? (
                                                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-md bg-green-600 text-white">
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-md bg-gray-500 text-white">
                                                        Inactive
                                                    </span>
                                                )}
                                            </td>

                                            <td className="px-4 py-2 border border-gray-200">
                                                <div className="flex justify-center items-center gap-2">
                                                    <EditButton
                                                        href={route('crops.edit', crop.id)}
                                                    />

                                                    <DeleteButton
                                                        url={route('crops.destroy', crop.id)}
                                                        title="Delete Crop?"
                                                        text={`Are you sure you want to delete "${crop.name}"? This action cannot be undone.`}
                                                        successText="Crop has been deleted successfully."
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="px-4 py-10 text-center text-gray-500 border border-gray-200"
                                        >
                                            No Crops Found!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-4 py-3">
                        <Pagination links={crops.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}