import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../lib/api";
import { NavBar } from "~/components/page_layout/navbar";
import { Footer } from "~/components/page_layout/footer";
import { PageBody } from "~/components/page_layout/pageBody";
import { SubmitButton } from "~/components/user_access/submitButton";
import { EmailInput } from "~/components/user_access/emailInput";
import { PasswordInput } from "~/components/user_access/passwordInput";
import { SignInError } from "~/components/user_access/signInError";
import { AccessPageTitle } from "~/components/user_access/accessPageTitle";
import { UserAccessFieldBody } from "~/components/user_access/userAccessFieldBody";

export async function loader() {
  return null;
}

export const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const title = "Register";

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await api.post("/register", { email, password });
      navigate("/login");
    } catch (err: any) {
      setError("Registration failed.");
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
                      
                      <label className="label">
                          Confirm password:
                      </label>
                      <input
                          type="password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          className="input"
                          placeholder="Enter password"
                      />

              <SubmitButton title={title}/>
              <div className="pt-5">
                <p>Already a TaskBeetle user?</p>
                <a className="link link-success" href="/login">Sign in here</a>
              </div>
            </form>
            {error && <SignInError message={error}/>}
          </UserAccessFieldBody>
      </PageBody>
      <Footer />
    </>
  );
}