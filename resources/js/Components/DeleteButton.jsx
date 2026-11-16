
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';

export default function DeleteButton({
    url,
    title = 'Delete?',
    text = 'Are you sure you want to delete this record? This action cannot be undone.',
    successTitle = 'Deleted!',
    successText = 'Record has been deleted successfully.',
    children = <i className="fa fa-trash"></i>,
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
                            toast: true,
                            position: 'top-end',
                            title: successText,
                            icon: 'success',
                            timer: 1500,
                            timerProgressBar: true,
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
            title="Delete"
            className={
                `inline-flex items-center justify-center
                 w-8 h-8
                 border border-red-500
                 text-red-500
                 rounded-md
                 hover:bg-red-500 hover:text-white
                 focus:outline-none
                 focus:ring-2 focus:ring-red-400
                 transition
                 ` + className
            }
        >
            {children}
        </button>
    );
}
