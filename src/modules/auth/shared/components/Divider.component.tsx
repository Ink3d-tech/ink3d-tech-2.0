export const Divider = ({letter}: {letter?: string}) => {
    return (
        !letter ? (
            <hr className="my-6"/>
        ) : (
            <div className="grid grid-cols-11 items-center my-6">
                <hr className="col-span-5 border-[#727070]"/>
                <span className="text-bg text-[14px] text-center text-secondary">
                    {letter}
                </span>
                <hr className="col-span-5 border-[#727070]"/>
            </div>
        )
    )
}