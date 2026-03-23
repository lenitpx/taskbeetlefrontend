import { clearToken } from "~/lib/auth";
import { useNavigate } from "react-router";

export const LogoutButton = () => {
    const navigate = useNavigate();

    return (
        <div className="navbar-end pr-10">
            <button
                className="btn btn-outline"
                    onClick={() => {
                        clearToken();
                        navigate("/login");
                    }}>
                Logout
            </button>
        </div>
    )
}