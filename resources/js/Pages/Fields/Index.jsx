
import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';

import DeleteButton from '@/Components/DeleteButton';
import EditButton from '@/Components/EditButton';
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ fields, farms = [], filters = {} }) {

    const [name, setName] = useState(filters.name || '');
    const [farmId, setFarmId] = useState(filters.farm_id || '');
    const [status, setStatus] = useState(filters.status ?? '');

    const handleSearch = (e) => {
        e.preventDefault();

        router.get(
            route('fields.index'),
            {
                name: name,
                farm_id: farmId,
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
        setFarmId('');
        setStatus('');

        router.get(
            route('fields.index'),
            {},
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    return (
        <AuthenticatedLayout>

            <Head title="Field Management" />

            <div className="p-4 sm:p-6">

                {/* Page Header */}
                <div className="bg-white shadow-sm mb-2">

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 px-6 py-4 border-b">

                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                Field Management
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Create, edit, and manage your farm fields.
                            </p>
                        </div>

                        <Link
                            href={route('fields.create')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0c0b32] text-white rounded-md hover:bg-[#17154d] transition"
                        >
                            <i className="fa fa-plus"></i>
                            Add Field
                        </Link>

                    </div>

                </div>


                {/* Field List Card */}
                <div className="bg-white shadow-md">

                    {/* Search Header */}
                    <div className="px-6 py-4 border-b border-gray-300">

                        <form onSubmit={handleSearch}>

                            <div className="flex flex-col xl:flex-row xl:items-center gap-3">

                                {/* Title */}
                                <div className="xl:w-1/4">
                                    <h3 className="text-xl font-semibold text-gray-800 whitespace-nowrap">
                                        🎯 Field List
                                    </h3>
                                </div>

                                {/* Search */}
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Search by field name..."
                                        className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                {/* Farm Filter */}
                                <div className="flex-1">
                                    <select
                                        value={farmId}
                                        onChange={(e) => setFarmId(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    >
                                        <option value="">All Farms</option>

                                        {farms.map((farm) => (
                                            <option key={farm.id} value={farm.id}>
                                                {farm.name}
                                            </option>
                                        ))}
                                    </select>
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


                    {/* Field Table */}
                    <div className="overflow-x-auto">

                        <table className="w-full text-sm text-left border-collapse">

                            <thead className="bg-gray-100 text-gray-900">

                                <tr className="border-b border-gray-300">

                                    <th className="px-4 py-3 border border-gray-300 text-right">
                                        SN.
                                    </th>

                                    <th className="px-4 py-3 border border-gray-300">
                                        Field Name
                                    </th>

                                    <th className="px-4 py-3 border border-gray-300">
                                        Farm Name
                                    </th>

                                    <th className="px-4 py-3 border border-gray-300">
                                        Area
                                    </th>

                                    <th className="px-4 py-3 border border-gray-300">
                                        Soil Type
                                    </th>

                                    <th className="px-4 py-3 border border-gray-300">
                                        Water Source
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

                                {fields.data.length > 0 ? (

                                    fields.data.map((field, index) => (

                                        <tr
                                            key={field.id}
                                            className="border-b border-gray-200 hover:bg-gray-50 transition"
                                        >

                                            <td className="px-4 py-3 border border-gray-200 text-right">
                                                {fields.from + index}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200 font-medium text-gray-800">
                                                {field.name}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200">
                                                {field.farm?.name || '-'}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200">
                                                {field.area} {field.area_unit}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200">
                                                {field.soil_type || '-'}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200">
                                                {field.water_source || '-'}
                                            </td>

                                            <td className="px-4 py-3 border border-gray-200 text-center">

                                                {field.status ? (
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
                                            className="px-4 py-10 text-center text-gray-500 border border-gray-200"
                                        >
                                            No Fields Found!
                                        </td>
                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>


                    {/* Pagination */}
                    <div className="px-4 py-3">
                        <Pagination links={fields.links} />
                    </div>

                </div>

            </div>

        </AuthenticatedLayout>
    );
}
