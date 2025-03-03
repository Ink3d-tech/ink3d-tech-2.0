import Swal from "sweetalert2";

export const getAlert = (confirmButtonText?: string, action?: () => void) => {
    return (
        Swal.fire({
            title: "Estás seguro?",
            text: "Esta acción no es reversible!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: confirmButtonText ?? "Cerrar sesion!"
        }).then((result) => {
            if (result.isConfirmed && action) {
                action();
            }
        })
    )
}

export const Fire = (title: string) => {
    return Swal.fire(title, "", "success")
}