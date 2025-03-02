// "use client"

// import { useAuth } from "../shared/context/Auth.context"
// import { useForm } from "../shared/hooks/useForm.hook"
// import { SignupInterface } from "./shared/Signup.interface"
// import SignupForm from "./shared/Signup.component"
// import { formInitial, requiredFields } from "./shared/Signup.config"
// import { validateFormSignup } from "./shared/Signup.validate"
// import Wrapper from "../shared/components/Wrapper"
// import HeaderBackBtn from "../shared/components/HeaderBack.component"
// import { Routes } from "../shared/enums/Routes"


// export default function Signup() {
//     const { signup } = useAuth()
    
//     const {formErrors, form, handlerChange, handlerSubmit, isLoading} = useForm<SignupInterface>({
//         formInitial,
//         requiredFields,
//         messageSuccess: "Signup success",
//         authAction: signup,
//         validateForm: validateFormSignup,
//         redirectSuccessRoute: Routes.LOGIN
//     })

//     return (
//         <Wrapper>
//             <HeaderBackBtn name={"Registro"} route={Routes.LOGIN}/>
//             <SignupForm
//                 form={form}
//                 formErrors={formErrors}
//                 handlerChange={handlerChange}
//                 handlerSubmit={handlerSubmit}
//                 isLoading={isLoading}
//             />
//         </Wrapper>
//     )  
// }

"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../shared/context/Auth.context";
import { useForm } from "../shared/hooks/useForm.hook";
import { SignupInterface } from "./shared/Signup.interface";
import SignupForm from "./shared/Signup.component";
import { formInitial, requiredFields } from "./shared/Signup.config";
import { validateFormSignup } from "./shared/Signup.validate";
import Wrapper from "../shared/components/Wrapper";
import HeaderBackBtn from "../shared/components/HeaderBack.component";
import { useRouter } from "next/navigation";  // ✅ Usa useRouter para redirigir

export default function Signup() {
    const { signup } = useAuth();
    const [isSignedUp, setIsSignedUp] = useState(false);
    const router = useRouter(); // ✅ Hook para redirección

    const { formErrors, form, handlerChange, handlerSubmit, isLoading } = useForm<SignupInterface>({
        formInitial,
        requiredFields,
        messageSuccess: "Signup success",
        authAction: async (formData) => {
            await signup(formData);
            setIsSignedUp(true);
        },
        validateForm: validateFormSignup,
    });

    // ✅ Redirige automáticamente cuando isSignedUp es true
    useEffect(() => {
        if (isSignedUp) {
            router.push("http://localhost:3001/auth/login");  // 🔹 Usa router.push() con la URL completa
        }
    }, [isSignedUp, router]);

    return (
        <Wrapper>
            <HeaderBackBtn name={"Registro"} route={"/auth/login"} />
            <SignupForm
                form={form}
                formErrors={formErrors}
                handlerChange={handlerChange}
                handlerSubmit={handlerSubmit}
                isLoading={isLoading}
            />
        </Wrapper>
    );
}
