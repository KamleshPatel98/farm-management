import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    const cards = [
        {
            title: 'Total Income',
            value: '₹0',
            icon: '💰',
        },
        {
            title: 'Total Expense',
            value: '₹0',
            icon: '💸',
        },
        {
            title: 'Net Profit',
            value: '₹0',
            icon: '📈',
        },
        {
            title: 'Labour Expense',
            value: '₹0',
            icon: '👨‍🌾',
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="p-4 sm:p-6">

                {/* Welcome */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Farm Dashboard 🌾
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Manage your farm income, expenses, crops and production.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                    {cards.map((card) => (
                        <div
                            key={card.title}
                            className="bg-white rounded-xl shadow-sm border p-5"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        {card.title}
                                    </p>

                                    <h3 className="text-2xl font-bold text-gray-800 mt-2">
                                        {card.value}
                                    </h3>
                                </div>

                                <div className="text-3xl">
                                    {card.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Production / Sales */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">

                    <div className="bg-white rounded-xl shadow-sm border p-5">
                        <h3 className="font-semibold text-lg text-gray-800">
                            Crop Production
                        </h3>

                        <div className="py-10 text-center text-gray-400">
                            No production records yet.
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border p-5">
                        <h3 className="font-semibold text-lg text-gray-800">
                            Recent Sales
                        </h3>

                        <div className="py-10 text-center text-gray-400">
                            No sales records yet.
                        </div>
                    </div>

                </div>

            </div>
        </AuthenticatedLayout>
    );
    
}