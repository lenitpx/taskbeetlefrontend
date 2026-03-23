type EmailProps = {
    email: string;
    setEmail: (value: string) => void;
}

export const EmailInput = ({email, setEmail}: EmailProps) => {
    return (
        <>
            <label className="label">
                Email:
            </label>
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input"
                placeholder="Enter email"
            />
        </>
    );
}