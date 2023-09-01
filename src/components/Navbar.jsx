
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">CRUD</span>

                    <Link
                        to={"/"}
                        style={{color: "white"}}
                        className=" btn btn-outline-dark btn-sm navbar-btn"
                    >
                        {"Persona"}
                    </Link>
                    <Link
                        to={"/vivienda"}
                        style={{color: "white"}}
                        className=" btn btn-outline-dark btn-sm navbar-btn"
                    >
                        {"Vivienda"}
                    </Link>
                    <Link
                        to={"/municipio"}
                        style={{color: "white"}}
                        className=" btn btn-outline-dark btn-sm navbar-btn"
                    >
                        {"Municipio"}
                    </Link>
                    <Link
                        to={"/view"}
                        style={{color: "white"}}
                        className=" btn btn-outline-dark btn-sm navbar-btn"
                    >
                        {"Lista Personas"}
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default Navbar;