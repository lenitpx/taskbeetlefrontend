import { FaMailBulk } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="footer md:footer-horizontal bg-accent text-accent-content items-center p-4 min-h-[10vh]">
            <aside className="grid-flow-col items-center">
                <p>TaskBeetle
                <br />
                Copyright © {new Date().getFullYear()} - All rights reserved</p>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <h6 className="footer-title">Contact Us</h6>
                <FaMailBulk />
            </nav>
        </footer>
    )
}