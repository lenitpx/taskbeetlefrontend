import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../lib/api";
import { setToken } from "../lib/auth";
import { NavBar } from "~/components/page_layout/navbar";
import { Footer } from "~/components/page_layout/footer";
import { EmailInput } from "~/components/user_access/emailInput";
import { PasswordInput } from "~/components/user_access/passwordInput";
import { PageBody } from "~/components/page_layout/pageBody";
import { SubmitButton } from "~/components/user_access/submitButton";
import { SignInError } from "~/components/user_access/signInError";
import { AccessPageTitle } from "~/components/user_access/accessPageTitle";
import { UserAccessFieldBody } from "~/components/user_access/userAccessFieldBody";

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const title = "Sign In"

    const errorMessage = "Something's not right; please check your email and password and try again"

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await api.post("/login", { email, password });
            setToken(res.data.token);
            navigate("/tasks");
        } catch (err: any) {
            setError(errorMessage);
        }
    };

    return (
        <>
            <NavBar />
            <PageBody>
                <UserAccessFieldBody>
                   <AccessPageTitle title={title}/>
                    <form onSubmit={handleSubmit}>
                            <EmailInput email={email} setEmail={setEmail}/>
                            <PasswordInput password={password} setPassword={setPassword}/>
                            <SubmitButton title={title}/>
                            <div className="pt-5">
                                <p>Not a TaskBeetle user yet?</p>
                                <a className="link link-success" href="/register">Sign up here</a>
                            </div>
                        </form>
                    {error && <SignInError message={error}/>}
                </UserAccessFieldBody>
            </PageBody>
            <Footer />
        </>
    );
}