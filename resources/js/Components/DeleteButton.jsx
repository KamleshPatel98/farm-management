import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';

export default function DeleteButton({
    url,
    title = 'Delete?',
    text = 'Are you sure you want to delete this record? This action cannot be undone.',
    successTitle = 'Deleted!',
    successText = 'Record has been deleted successfully.',
    children = '🗑️ Delete',
    className = '',
}) {
    const handleDelete = () => {
        Swal.fire({
            title,
            text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            focusCancel: true,
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(url, {
                    preserveScroll: true,

                    onSuccess: () => {
                        Swal.fire({
                            title: successTitle,
                            text: successText,
                            icon: 'success',
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    },
                });
            }
        });
    };

    return (
        <button
            type="button"
            onClick={handleDelete}
            className={
                `inline-flex items-center justify-center gap-1.5
                 px-3.5 py-2
                 bg-red-600 text-white
                 text-sm font-medium
                 rounded-lg
                 hover:bg-red-700
                 focus:outline-none
                 focus:ring-2
                 focus:ring-red-500
                 focus:ring-offset-2
                 transition ` + className
            }
        >
            {children}
        </button>
    );
}