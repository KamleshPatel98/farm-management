
import { Link } from '@inertiajs/react';

export default function EditButton({
    href,
    children = <i className="fa fa-edit"></i>,
    className = '',
}) {
    return (
        <Link
            href={href}
            title="Edit"
            className={
                `inline-flex items-center justify-center
                 w-8 h-8
                 border border-yellow-500
                 text-yellow-500
                 rounded-md
                 hover:bg-yellow-500 hover:text-white
                 focus:outline-none focus:ring-2
                 focus:ring-yellow-400
                 transition ` + className
            }
        >
            {children}
        </Link>
    );
}
