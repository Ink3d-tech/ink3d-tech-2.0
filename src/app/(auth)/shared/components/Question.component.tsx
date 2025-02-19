import Link from "next/link"

export enum VariantQuestion {
    PRIMARY = "text-blue-500 text-left ",
    SECONDARY = "text-[#7C7C7C] text-center",
}

export interface QuestionInterface {
    href: string
    question: string
    variant: VariantQuestion
}

export const Question: React.FC<QuestionInterface> = ({href, question, variant}) => {
    return (
        <Link className={`${variant} text-[14px] font-medium mb-3 mt-[1px]`} href={href}>
            {question}
        </Link>
    )
}