"use client"

import Swal from "sweetalert2";

export const getAlert = (confirmButtonText?: string, action?: () => void, route?: string, text?: string) => {
    return (
        Swal.fire({
            title: `${confirmButtonText ?? "Estás seguro?"}`,
            text: `${text ?? "Esta acción no es reversible!"}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: confirmButtonText ?? "Cerrar sesion!"
        }).then((result) => {
            if(result.isConfirmed && action && route) {
                // window.location.replace("/login")
                action();
            }
            if (result.isConfirmed && action) {
                action();
            }
        })
    )
}

export const Fire = (title: string) => {
    return Swal.fire(title, "", "success")
}