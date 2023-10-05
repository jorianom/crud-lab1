import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">CRUD</span>

                    <Link to={"/"} style={{ color: "white" }} className=" btn btn-outline-dark btn-sm navbar-btn">
                        {"Persona"}
                    </Link>
                    <Link to={"/vivienda"} style={{ color: "white" }} className=" btn btn-outline-dark btn-sm navbar-btn">
                        {"Vivienda"}
                    </Link>
                    <Link to={"/municipio"} style={{ color: "white" }} className=" btn btn-outline-dark btn-sm navbar-btn">
                        {"Municipio"}
                    </Link>
                    <Link to={"/departamento"} style={{ color: "white" }} className=" btn btn-outline-dark btn-sm navbar-btn">
                        {"Departamento"}
                    </Link>

                    <li className="nav-item dropdown dropstart" style={{ color: "white", display: "block" }}>
                        <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Listas
                        </a>
                        <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
                            <li>
                                <a className="dropdown-item" href="/lista-personas">
                                    Lista Personas
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="/lista-viviendas">
                                    Lista Viviendas
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="/lista-municipios">
                                    Lista Municipios
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="/lista-departamentos">
                                    Lista Departamentos
                                </a>
                            </li>
                        </ul>
                    </li>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
