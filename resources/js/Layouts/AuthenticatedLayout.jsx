import { useEffect, useRef, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import SuccessToast from '@/Components/SuccessToast';
import ErrorAlert from '@/Components/ErrorAlert';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    const isItemActive = (pattern) => {
        if (!pattern || pattern.startsWith('#')) return false;
        return route().current(pattern);
    };

    const menuItems = [
        { name: 'Dashboard', href: route('dashboard'), activePattern: 'dashboard', icon: '📊' },
        { name: 'Farms', href: route('farms.index'), activePattern: 'farms.*', icon: '🌾' },
        { name: 'Fields', href: route('fields.index'), activePattern: 'fields.*', icon: '🗺️' },
        { name: 'Crops', href: route('crops.index'), activePattern: 'crops.*', icon: '🌱' },
        { name: 'Field Crops', href: route('field-crops.index'), activePattern: 'field-crops.*', icon: '🌱' },
        { name: 'Crop Activity', href: route('crop-activities.index'), activePattern: 'crop-activities.*', icon: '🌱' },
        {
            name: 'Labour',
            icon: '👨‍🌾',
            children: [
                { name: 'Labour', href: route('labours.index'), activePattern: 'labours.*' },
                { name: 'Labour Attendance', href: '#', activePattern: 'labour-attendances.*' },
                { name: 'Labour Payment', href: '#', activePattern: 'labour-payments.*' },
            ],
        },
        { name: 'Income', href: '#', activePattern: 'income.*', icon: '💰' },
        { name: 'Expenses', href: '#', activePattern: 'expenses.*', icon: '💸' },
        { name: 'Production', href: '#', activePattern: 'production.*', icon: '📦' },
        { name: 'Sales', href: '#', activePattern: 'sales.*', icon: '🛒' },
        { name: 'Reports', href: '#', activePattern: 'reports.*', icon: '📈' },
    ];

    const isAnyLabourActive =
        isItemActive('labours.*') ||
        isItemActive('labour-attendances.*') ||
        isItemActive('labour-payments.*');

    const [openDropdown, setOpenDropdown] = useState(isAnyLabourActive ? 'Labour' : null);

    const toggleDropdown = (name) => {
        setOpenDropdown((prev) => (prev === name ? null : name));
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setProfileMenuOpen(false);
            }
        };

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setProfileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const getInitials = (name = '') =>
        name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part[0]?.toUpperCase() || '')
            .join('') || 'U';

    return (
        <div className="min-h-screen bg-gray-100">
            <SuccessToast />
            <ErrorAlert />

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 overflow-y-auto
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0`}
            >
                {/* Logo */}
                <div className="flex items-center justify-between h-16 px-5 border-b">
                    <Link href={route('dashboard')} className="flex items-center gap-3">
                        <ApplicationLogo className="block h-9 w-auto fill-current text-green-600" />
                        <span className="text-lg font-bold text-gray-800">
                            Farm Manager
                        </span>
                    </Link>

                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-1.5 rounded-md text-gray-500 hover:bg-gray-100"
                        aria-label="Close sidebar"
                    >
                        ✕
                    </button>
                </div>

                {/* Menu */}
                <nav className="p-4 space-y-1">
                    {menuItems.map((item) => {
                        if (item.children) {
                            const hasActiveChild = item.children.some((child) =>
                                isItemActive(child.activePattern)
                            );
                            const isOpen = openDropdown === item.name;

                            return (
                                <div key={item.name} className="space-y-1">
                                    <button
                                        type="button"
                                        onClick={() => toggleDropdown(item.name)}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${hasActiveChild
                                                ? 'bg-green-100 text-green-800 font-semibold'
                                                : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                                            }`}
                                    >
                                        <span className="flex items-center gap-3">
                                            <span className="text-lg">{item.icon}</span>
                                            <span>{item.name}</span>
                                        </span>
                                        <svg
                                            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>

                                    {isOpen && (
                                        <div className="pl-9 pr-2 space-y-1">
                                            {item.children.map((subItem) => {
                                                const isSubActive = isItemActive(subItem.activePattern);
                                                return (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        aria-current={isSubActive ? 'page' : undefined}
                                                        onClick={() => setSidebarOpen(false)}
                                                        className={`block px-3 py-2 text-sm rounded-lg transition ${isSubActive
                                                                ? 'bg-green-600 text-white font-medium'
                                                                : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
                                                            }`}
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        const isActive = isItemActive(item.activePattern);

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                aria-current={isActive ? 'page' : undefined}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive
                                        ? 'bg-green-100 text-green-800 font-semibold'
                                        : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                                    }`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Area */}
            <div className="lg:ml-64">

                {/* Topbar */}
                <header className="h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6">

                    {/* Mobile Hamburger + App Name */}
                    <div className="flex items-center gap-3 lg:hidden">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
                            aria-label="Open sidebar"
                        >
                            ☰
                        </button>

                        <Link href={route('dashboard')} className="flex items-center gap-2">
                            <ApplicationLogo className="block h-7 w-auto fill-current text-green-600" />
                            <span className="text-base font-bold text-gray-800">
                                Farm Manager
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Page Header */}
                    <div className="hidden lg:block">
                        {header}
                    </div>

                    {/* User Dropdown */}
                    <div className="relative ml-auto" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setProfileMenuOpen((prev) => !prev)}
                            aria-expanded={profileMenuOpen}
                            aria-haspopup="menu"
                            className="flex items-center gap-3 px-2.5 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-green-500/30"
                        >
                            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-green-600 text-white text-sm font-semibold">
                                {getInitials(user.name)}
                            </span>

                            <div className="text-left hidden sm:block leading-tight">
                                <div className="text-sm font-semibold text-gray-800">
                                    {user.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                    Farm Manager
                                </div>
                            </div>

                            <svg
                                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${profileMenuOpen ? 'rotate-180' : ''
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {profileMenuOpen && (
                            <div
                                role="menu"
                                className="absolute right-0 mt-2 w-60 rounded-xl bg-white shadow-lg ring-1 ring-black/5 border border-gray-100 py-1.5 z-50"
                            >
                                {/* User Summary */}
                                <div className="px-4 py-2.5 border-b border-gray-100">
                                    <p className="text-sm font-semibold text-gray-900 truncate">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {user.email}
                                    </p>
                                </div>

                                {/* Profile */}
                                <Link
                                    role="menuitem"
                                    href={route('profile.edit')}
                                    onClick={() => setProfileMenuOpen(false)}
                                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                                >
                                    <span>👤</span>
                                    <span>Profile</span>
                                </Link>

                                {/* View */}
                                <Link
                                    role="menuitem"
                                    href={route('profile.edit')}
                                    onClick={() => setProfileMenuOpen(false)}
                                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                                >
                                    <span>👁️</span>
                                    <span>View</span>
                                </Link>

                                <div className="my-1 border-t border-gray-100" />

                                {/* Logout */}
                                <Link
                                    role="menuitem"
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    onClick={() => setProfileMenuOpen(false)}
                                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition text-left"
                                >
                                    <span>🚪</span>
                                    <span>Logout</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </header>

                {/* Mobile Page Header */}
                {header && (
                    <div className="lg:hidden bg-white border-b px-4 py-3">
                        {header}
                    </div>
                )}

                {/* Page Content */}
                <main>
                    {children}
                </main>

            </div>
        </div>
    );
}