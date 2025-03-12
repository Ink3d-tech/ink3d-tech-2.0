import Link from "next/link"

export enum VariantQuestion {
    PRIMARY = "text-blue-500 text-left",
    SECONDARY = "text-[#7C7C7C] text-center",
    TERCIARY = "text-blue-500 text-center"
}

export interface QuestionInterface {
    href?: string
    question: string
    variant: VariantQuestion
}

export const Question = ({href, question, variant}: {href?: string, question: string, variant: VariantQuestion}) => {
    return (
        href ? 
        <Link className={`${variant} text-[14px] font-medium mb-3 mt-[1px]`} href={href}>
            {question}
        </Link>
        :
        <span className={`${variant} text-[14px] font-medium mb-3 mt-[1px] cursor-pointer`}>{question}</span>
      
    )
}