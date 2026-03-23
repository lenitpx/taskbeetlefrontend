type ErrorProps = {
    message: string;
}

export const SignInError = ({message}: ErrorProps) => {
    return (
        <p style={{color: "red"}}>{message}</p>
    )
}