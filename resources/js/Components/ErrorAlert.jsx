
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function ErrorAlert() {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: flash.error,
                confirmButtonText: 'OK',
                confirmButtonColor: '#dc2626',
                allowOutsideClick: false,
            });
        }
    }, [flash?.error]);

    return null;
}