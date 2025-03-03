"use client"

import { usePathname } from "next/navigation"
import { Question, QuestionInterface, VariantQuestion } from "./Question.component"
import Image from "next/image"

export interface WrapperProps {
    children: React.ReactNode
    withTopHr?: boolean
    withBottomHr?: boolean
}


export const IndexQuestion: QuestionInterface[] = [
    { href: "#", question: "Inicio", variant: VariantQuestion.SECONDARY },
    { href: "#", question: "Tienda", variant: VariantQuestion.SECONDARY },
    { href: "#", question: "Categorías", variant: VariantQuestion.SECONDARY },
    { href: "#", question: "Magazine", variant: VariantQuestion.SECONDARY },
    { href: "#", question: "Términos y condiciones", variant: VariantQuestion.SECONDARY },
    { href: "#", question: "Política de privacidad", variant: VariantQuestion.SECONDARY }
]

export const Wrapper: React.FC<WrapperProps> = ({
    children,
    withTopHr = true,
    withBottomHr = true,
}) => {
    const pathname = usePathname()
    return (
        <>
            {pathname === "/login" ? (
                <div className="bg-primary  mx-auto py-14">
                    {/* <figure className="flex justify-center">
                        <Image src={"LogoInk3d.webp"} alt={"Logo ink3d"} width={145} height={85}/>
                    </figure> */}
                    
                    {withTopHr && <hr className="my-4 border-transparent"/>}
                    {children}
                    {withBottomHr && <hr className="my-4 border-transparent"/>}
                    
                    <div className="flex justify-center flex-wrap gap-4 text-white text-sm mt-12 px-4">{IndexQuestion.map(question => <Question key={question.question} href={question.href} question={question.question} variant={question.variant}/> )}</div>
                </div>
            ): (
                <div className="bg-primary  mx-auto">
                    {children}
                    {withBottomHr && <hr className="my-4 border-transparent"/>}
                    
                    <div className="flex justify-center flex-wrap gap-4 text-white text-sm mt-12 px-4"> {IndexQuestion.map(question => <Question key={question.question} href={question.href} question={question.question} variant={question.variant}/> )}</div>
                </div> 
            )}
        </>
       
    )
}

export default Wrapper