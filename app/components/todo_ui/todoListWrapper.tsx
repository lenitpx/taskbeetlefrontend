export const TodoListWrapper = (props: any) => {
    return (
       <ul className="list bg-base-100 rounded-box p-10 tab-content">{props.children}</ul>
    )
}