import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';

import DeleteButton from '@/Components/DeleteButton';
import EditButton from '@/Components/EditButton';
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ labours, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    const handleSearch = (e) => {
        e.preventDefault();

        router.get(
            route('labours.index'),
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
            route('labours.index'),
            {},
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const formatWage = (amount) => {
        const num = Number(amount ?? 0);
        return num.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Labour Management" />

            <div className="p-4 sm:p-6">
                {/* Page Header */}
                <div className="bg-white shadow-sm mb-2">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 px-6 py-4 border-b">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                Labour Management
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Create, edit, and manage your farm labours and daily wages.
                            </p>
                        </div>

                        <Link
                            href={route('labours.create')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0c0b32] text-white rounded-md hover:bg-[#17154d] transition"
                        >
                            <i className="fa fa-plus"></i>
                            Add Labour
                        </Link>
                    </div>
                </div>

                {/* Labour List Card */}
                <div className="bg-white shadow-md">
                    {/* Search Header */}
                    <div className="px-6 py-4 border-b border-gray-300">
                        <form onSubmit={handleSearch}>
                            <div className="flex flex-col xl:flex-row xl:items-center gap-3">
                                {/* Title */}
                                <div className="xl:w-1/4">
                                    <h3 className="text-xl font-semibold text-gray-800 whitespace-nowrap">
                                        👷 Labour List
                                    </h3>
                                </div>

                                {/* Search */}
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search by name, mobile, or address..."
                                        className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                {/* Status */}
                                <div className="xl:w-48">
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    >
                                        <option value="">All Status</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
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

                    {/* Labour Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead className="bg-gray-100 text-gray-900">
                                <tr className="border-b border-gray-300">
                                    <th className="px-4 py-3 border border-gray-300 text-right">
                                        SN.
                                    </th>

                                    <th className="px-4 py-3 border border-gray-300">
                                        Name
                                    </th>

                                    <th className="px-4 py-3 border border-gray-300">
                                        Mobile
                                    </th>

                                    <th className="px-4 py-3 border border-gray-300">
                                        Address
                                    </th>

                                    <th className="px-4 py-3 border border-gray-300 text-right">
                                        Default Daily Wage
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
                                {labours.data.length > 0 ? (
                                    labours.data.map((labour, index) => (
                                        <tr
                                            key={labour.id}
                                            className="border-b border-gray-200 hover:bg-gray-50 transition"
                                        >
                                            <td className="px-4 py-3 border border-gray-200 text-right">
                                                {labours.from + index}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200 font-medium text-gray-800">
                                                {labour.name}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200">
                                                {labour.mobile || '-'}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200">
                                                {labour.address || '-'}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200 text-right">
                                                {formatWage(labour.default_daily_wage)}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200 text-center">
                                                {labour.is_active ? (
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
                                                        href={route('labours.edit', labour.id)}
                                                    />

                                                    <DeleteButton
                                                        url={route('labours.destroy', labour.id)}
                                                        title="Delete Labour?"
                                                        text={`Are you sure you want to delete "${labour.name}"? This action cannot be undone.`}
                                                        successText="Labour has been deleted successfully."
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
                                            No Labours Found!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-4 py-3">
                        <Pagination links={labours.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}