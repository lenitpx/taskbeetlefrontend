type PasswordProps = {
    password: string;
    setPassword: (value: string) => void;
}

export const PasswordInput = ({ password, setPassword }: PasswordProps) => {
    return (
        <>
            <label className="label">
                Password:
            </label>
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input"
                placeholder="Enter password"
            />
        </>
    );
}