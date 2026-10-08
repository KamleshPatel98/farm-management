import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const menuItems = [
        { name: 'Dashboard', href: route('dashboard'), icon: '📊' },
        { name: 'Farms', href: route('farms.index'), icon: '🌾' },
        { name: 'Fields', href: '#', icon: '🗺️' },
        { name: 'Crops', href: '#', icon: '🌱' },
        { name: 'Labour', href: '#', icon: '👨‍🌾' },
        { name: 'Income', href: '#', icon: '💰' },
        { name: 'Expenses', href: '#', icon: '💸' },
        { name: 'Production', href: '#', icon: '📦' },
        { name: 'Sales', href: '#', icon: '🛒' },
        { name: 'Reports', href: '#', icon: '📈' },
    ];

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0`}
            >
                {/* Logo */}
                <div className="flex items-center h-16 px-5 border-b">
                    <Link href={route('dashboard')} className="flex items-center gap-3">
                        <ApplicationLogo className="block h-9 w-auto fill-current text-green-600" />
                        <span className="text-lg font-bold text-gray-800">
                            Farm Manager
                        </span>
                    </Link>
                </div>

                {/* Menu */}
                <nav className="p-4 space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Area */}
            <div className="lg:ml-64">

                {/* Topbar */}
                <header className="h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6">

                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
                    >
                        ☰
                    </button>

                    <div className="hidden lg:block">
                        {header}
                    </div>

                    {/* User */}
                    <div className="flex items-center gap-4 ml-auto">
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-medium text-gray-800">
                                {user.name}
                            </div>
                            <div className="text-xs text-gray-500">
                                Farm Manager
                            </div>
                        </div>

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                        >
                            Logout
                        </Link>
                    </div>
                </header>

                {/* Mobile Header */}
                <div className="lg:hidden bg-white border-b px-4 py-3">
                    {header}
                </div>

                {/* Page Content */}
                <main>
                    {children}
                </main>

            </div>
        </div>
    );
}