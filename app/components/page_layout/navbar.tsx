import { LogoutButton } from "./logoutButton";
import { getToken } from "~/lib/auth";

const token = getToken();

export const NavBar = () => {
    return (
    <div className="navbar bg-primary shadow-sm text-neutral-content min-h-[10vh]">
        <div className="navbar-start pl-10">
            <img src="public/favicon.ico" className="max-h-10"/>
                <h2 className="text-2xl">TaskBeetle</h2>
        </div>
        {!!token && <LogoutButton />}
    </div>
    )
}