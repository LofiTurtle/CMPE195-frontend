import {Outlet} from "react-router-dom";
import Navbar from "./Navbar";

const NavbarWrapper = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>
            <main className="flex-1 p-4">
                <Outlet/>
            </main>
        </div>
    );
}

export default NavbarWrapper;