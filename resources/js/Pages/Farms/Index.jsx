
import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';

import DeleteButton from '@/Components/DeleteButton';
import EditButton from '@/Components/EditButton';
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ farms, filters = {} }) {

    const [name, setName] = useState(filters.name || '');
    const [status, setStatus] = useState(filters.status ?? '');

    const handleSearch = (e) => {
        e.preventDefault();

        router.get(
            route('farms.index'),
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
            route('farms.index'),
            {},
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    return (
        <AuthenticatedLayout>

            <Head title="Farm Management" />

            <div className="p-4 sm:p-6">

                {/* Page Header */}
                <div className="bg-white shadow-sm mb-2">

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 px-6 py-4 border-b">

                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                Farm Management
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Create, edit, and manage your farms.
                            </p>
                        </div>

                        <Link
                            href={route('farms.create')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0c0b32] text-white rounded-md hover:bg-[#17154d] transition"
                        >
                            <i className="fa fa-plus"></i>
                            Add Farm
                        </Link>

                    </div>

                </div>


                {/* Farm List Card */}
                <div className="bg-white shadow-md">

                    {/* Search Header */}
                    <div className="px-6 py-4 border-b border-gray-300">

                        <form onSubmit={handleSearch}>

                            <div className="flex flex-col xl:flex-row xl:items-center gap-3">

                                {/* Title */}
                                <div className="xl:w-1/4">
                                    <h3 className="text-xl font-semibold text-gray-800 whitespace-nowrap">
                                        🎯 Farm List
                                    </h3>
                                </div>

                                {/* Search */}
                                <div className="flex-1">

                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Search by farm name..."
                                        className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />

                                </div>

                                {/* Status */}
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


                    {/* Farm Table */}
                    <div className="overflow-x-auto">

                        <table className="w-full text-sm text-left border-collapse">

                            <thead className="bg-gray-100 text-gray-900">

                                <tr className="border-b border-gray-300">

                                    <th className="px-4 py-3 border border-gray-300 text-right">
                                        SN.
                                    </th>

                                    <th className="px-4 py-3 border border-gray-300">
                                        Farm Name
                                    </th>

                                    <th className="px-4 py-3 border border-gray-300">
                                        Total Area
                                    </th>

                                    <th className="px-4 py-3 border border-gray-300">
                                        Location
                                    </th>

                                    <th className="px-4 py-3 border border-gray-300 text-center">
                                        Is Active
                                    </th>

                                    <th className="px-4 py-3 border border-gray-300 text-center">
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {farms.data.length > 0 ? (

                                    farms.data.map((farm, index) => (

                                        <tr
                                            key={farm.id}
                                            className="border-b border-gray-200 hover:bg-gray-50 transition"
                                        >

                                            <td className="px-4 py-3 border border-gray-200 text-right">
                                                {farms.from + index}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200 font-medium text-gray-800">
                                                {farm.name}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200">
                                                {farm.total_area} {farm.area_unit}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200">
                                                {farm.location || '-'}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200 text-center">

                                                {farm.status ? (
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
                                            className="px-4 py-10 text-center text-gray-500 border border-gray-200"
                                        >
                                            No Farms Found!
                                        </td>
                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>


                    {/* Pagination */}
                    <div className="px-4 py-3">

                        <Pagination links={farms.links} />

                    </div>

                </div>

            </div>

        </AuthenticatedLayout>
    );
}
