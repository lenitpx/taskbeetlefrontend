export const PageBody = (props: any) => {
    return (
        <div className="flex flex-col md:flex-row md:justify-center p-10 min-h-[80vh]">{props.children}</div>
    )
}