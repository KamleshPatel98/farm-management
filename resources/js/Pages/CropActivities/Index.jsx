import { Head, Link, router } from '@inertiajs/react';
import DeleteButton from '@/Components/DeleteButton';
import EditButton from '@/Components/EditButton';
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';
import { userDateFormat } from '@/helper';

export default function Index({ cropActivities, filters = {} }) {
    const [name, setName] = useState(filters.name || '');
    const [date, setDate] = useState(filters.date || '');

    const handerSearch = (e) => {
        e.preventDefault();

        router.get(
            route('crop-activities.index'),
            {
                name: name,
                date: date,
            },
            {
                preserveState: true,
                replace: true,
            }
        )
    }

    const handleReset = () => {
        setName('');
        setDate('');

        router.get(
            route('crop-activities.index'),
            {},
            {
                preserveState: true,
            }
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="Crop Activities Management" />

            <div className="p-4 sm:p-6">
                {/* Page Header */}
                <div className="bg-white shadow-sm mb-2">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 px-6 py-4 border-b">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                Crop Activities Management
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Track field-wise crop cycles, sowing dates, and harvest schedules.
                            </p>
                        </div>

                        <Link
                            href={route('crop-activities.create')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0c0b32] text-white rounded-md hover:bg-[#17154d] transition"
                        >
                            <i className="fa fa-plus"></i>
                            Add Crop Activity
                        </Link>
                    </div>
                </div>

                {/* List Card */}
                <div className="bg-white shadow-md">
                    {/* Search & Filter Header (Aap apna onSubmit yahan laga sakte hain) */}
                    <div className="px-6 py-4 border-b border-gray-300">
                        <form onSubmit={handerSearch} >
                            <div className="flex flex-col xl:flex-row xl:items-center gap-3">
                                {/* Title */}
                                <div className="xl:w-1/4">
                                    <h3 className="text-xl font-semibold text-gray-800 whitespace-nowrap">
                                        🌾 Activity List
                                    </h3>
                                </div>

                                {/* Search Input */}
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Search by farm, field or crop..."
                                        className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                {/* Status Filter */}
                                <div className="flex-1">
                                    <TextInput
                                        id="date"
                                        name="date"
                                        type="date"
                                        className="mt-1 block w-full md:w-1/2"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
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

                    {/* Data Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead className="bg-gray-100 text-gray-900">
                                <tr className="border-b border-gray-300">
                                    <th className="px-4 py-3 border border-gray-300 text-right">SN.</th>
                                    <th className="px-4 py-3 border border-gray-300">Farm / Field Name</th>
                                    <th className="px-4 py-3 border border-gray-300">Crop</th>
                                    <th className="px-4 py-3 border border-gray-300">Activity</th>
                                    <th className="px-4 py-3 border border-gray-300">Date</th>
                                    <th className="px-4 py-3 border border-gray-300 text-center">Notes</th>
                                    <th className="px-4 py-3 border border-gray-300 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {cropActivities?.data && cropActivities.data.length > 0 ? (
                                    cropActivities.data.map((item, index) => (
                                        <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                            <td className="px-4 py-3 border border-gray-200 text-right">
                                                {cropActivities.from + index}
                                            </td>
                                            <td className="px-4 py-3 border border-gray-200 font-medium text-gray-800">
                                                {item.fieldcrop?.field?.farm?.name || '-'} / {item.fieldcrop?.field?.name || '-'}
                                            </td>
                                            <td className="px-4 py-3 border border-gray-200">
                                                {item.fieldcrop?.crop?.name || '-'}
                                            </td>
                                            <td className="px-4 py-3 border border-gray-200">
                                                {item.name || '-'}
                                            </td>
                                            <td className="px-4 py-3 border border-gray-200">
                                                {userDateFormat(item.date || '-')}
                                            </td>
                                            <td className="px-4 py-3 border border-gray-200">
                                                {item.notes || '-'}
                                            </td>
                                            <td className="px-4 py-2 border border-gray-200">
                                                <div className="flex justify-center items-center gap-2">
                                                    <EditButton href={route('crop-activities.edit', item.id)} />
                                                    <DeleteButton
                                                        url={route('crop-activities.destroy', item.id)}
                                                        title="Delete Activity?"
                                                        text="Are you sure you want to delete this season record?"
                                                        successText="Deleted successfully."
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-4 py-10 text-center text-gray-500 border border-gray-200">
                                            No Crop Activities Found!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-4 py-3">
                        {cropActivities?.links && <Pagination links={cropActivities.links} />}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}