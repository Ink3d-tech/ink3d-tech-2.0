"use client"

import { usePathname } from "next/navigation"
import { QuestionInterface, VariantQuestion } from "./Question.component"
// import Image from "next/image"

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
}) => {
    const pathname = usePathname()
    return (
        <div 
            className="h-screen w-full flex items-center justify-center bg-black"
            style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=2000&auto=format")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {pathname === "/login" ? (
                <div className="max-w-md w-full mx-auto p-8 backdrop-blur-sm bg-black/70 rounded-xl border border-zinc-800">
                    {/* <figure className="flex justify-center">
                        <Image src={"LogoInk3d.webp"} alt={"Logo ink3d"} width={145} height={85}/>
                    </figure> */}
                    
                    {/* {withTopHr && <hr className="my-4 border-transparent"/>} */}
                    {children}
                    {/* {withBottomHr && <hr className="my-4 border-transparent"/>} */}
                    
                    {/* <div className="flex justify-center flex-wrap gap-4 text-white text-sm mt-12 px-4">{IndexQuestion.map(question => <Question key={question.question} href={question.href} question={question.question} variant={question.variant}/> )}</div> */}
                </div>
            ): (
                <div className="max-w-md w-full mx-auto p-8 backdrop-blur-sm bg-black/70 rounded-xl border border-zinc-800">
                    {children}
                    {/* {withBottomHr && <hr className="my-4 border-transparent"/>} */}
                    
                    {/* <div className="flex justify-center flex-wrap gap-4 text-white text-sm mt-12 px-4"> {IndexQuestion.map(question => <Question key={question.question} href={question.href} question={question.question} variant={question.variant}/> )}</div> */}
                </div> 
            )}
        </div>
       
    )
}

export default Wrapper