type SubmitButtonProps = {
    title: string;
}

export const SubmitButton = ({title}: SubmitButtonProps) => {
    return (
        <button 
            type="submit" 
            className="btn btn-primary mt-4"
        >
            {title}
        </button>
    )
}