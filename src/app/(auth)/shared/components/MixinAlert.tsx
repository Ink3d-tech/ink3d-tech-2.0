import Swal from "sweetalert2";

export const Mixin = Swal.mixin({
    toast: true,
    position: 'center',
    timer: 3000,
    timerProgressBar: true
})