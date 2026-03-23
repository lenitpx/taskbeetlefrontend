type AccessPageTitleProps = {
    title: string;
}

export const AccessPageTitle = ({title}: AccessPageTitleProps) => {
    return (
        <legend className="fieldset-legend text-2xl">{title}</legend>
    )
}