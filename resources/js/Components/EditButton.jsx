
import { Link } from '@inertiajs/react';

export default function EditButton({
    href,
    children = '✏️ Edit',
    className = '',
}) {
    return (
        <Link
            href={href}
            className={
                `inline-flex items-center justify-center gap-1.5
                 px-3.5 py-2
                 bg-blue-600 text-white
                 text-sm font-medium
                 rounded-lg
                 hover:bg-blue-700
                 focus:outline-none focus:ring-2
                 focus:ring-blue-500 focus:ring-offset-2
                 transition ` + className
            }
        >
            {children}
        </Link>
    );
}