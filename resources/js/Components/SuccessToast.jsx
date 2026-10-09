import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function SuccessToast() {
const { flash } = usePage().props;

useEffect(() => {
    if (flash?.success) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: flash.success,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: '#ffffff',
            color: '#166534',
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
        });
    }
}, [flash?.success]);

return null;

}
