import React, { useEffect } from "react";
import clienteAxios from "../config/clienteAxios";

const List = () => {
    const [personas, setPersonas] = React.useState([]);
    const [departamentos, setDepartamentos] = React.useState([]);
    const [municipios, setMunicipios] = React.useState([]);
    const [viviendas, setViviendas] = React.useState([]);
    var i = 1;
    const getData = async () => {
        try {
            const rta = await clienteAxios.get("personas?select=*");
            setPersonas(rta.data);
            const rtaD = await clienteAxios.get("departamentos?select=*");
            setDepartamentos(rtaD.data);
            const rtaM = await clienteAxios.get("municipios?select=*");
            setMunicipios(rtaM.data);
            const rtaV = await clienteAxios.get("viviendas?select=*");
            setViviendas(rtaV.data);
        } catch (err) {
            console.log(err);
        }
    };
    const removeItem = async (id) => {
        try {
            await clienteAxios.delete("personas?id=eq." + id);
            getData();
        } catch (err) {
            console.log(err);
        }
    }
    const removeItemD = async (id) => {
        try {
            await clienteAxios.delete("departamentos?id_dpto=eq." + id);
            getData();
        } catch (err) {
            console.log(err);
        }
    }
    const removeItemM = async (id) => {
        try {
            await clienteAxios.delete("municipios?id_mun=eq." + id);
            getData();
        } catch (err) {
            console.log(err);
        }
    }
    const removeItemV = async (id) => {
        try {
            await clienteAxios.delete("viviendas?id_viv=eq." + id);
            getData();
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <div className="container-fluid mt-5">
                <figure className="text-center">
                    <blockquote className="blockquote">
                        <h1>Departamentos</h1>
                    </blockquote>
                </figure>
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Población </th>
                            <th scope="col">Area </th>
                            <th scope="col">Presupuesto </th>
                            <th scope="col"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {departamentos.map((item) => (
                            <tr key={item.id_dpto}>
                                <th scope="row">{i++}</th>
                                <td>{item.nombre}</td>
                                <td>{item.poblacion}</td>
                                <td>{item.area}</td>
                                <td>{item.presupuesto}</td>

                                <td>
                                    <input
                                        onClick={() => removeItemD(item.id_dpto)}
                                        type="button"
                                        className="btn btn-danger mb-3"
                                        value="Borrar"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <figure className="text-center">
                    <blockquote className="blockquote">
                        <h1>Municipios</h1>
                    </blockquote>
                </figure>
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Area</th>
                            <th scope="col">Presupuesto</th>
                            <th scope="col">Departamento</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {municipios.map((item) => (
                            <tr key={item.id_mun}>
                                <th scope="row">{i++}</th>
                                <td>{item.nombre}</td>
                                <td>{item.area}</td>
                                <td>{item.presupuesto}</td>
                                <td>{item.departamento_id}</td>
                                <td>
                                    <input
                                        onClick={() => removeItemM(item.id_mun)}
                                        type="button"
                                        className="btn btn-danger mb-3"
                                        value="Borrar"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <figure className="text-center">
                    <blockquote className="blockquote">
                        <h1>Viviendas</h1>
                    </blockquote>
                </figure>
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Direccion</th>
                            <th scope="col">Capacidad</th>
                            <th scope="col">Niveles</th>
                            <th scope="col">Municipio</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {viviendas.map((item) => (
                            <tr key={item.id_viv}>
                                <th scope="row">{i++}</th>
                                <td>{item.direccion}</td>
                                <td>{item.capacidad}</td>
                                <td>{item.niveles}</td>
                                <td>{item.municipio_id}</td>
                                <td>
                                    <input
                                        onClick={() => removeItemV(item.id_viv)}
                                        type="button"
                                        className="btn btn-danger mb-3"
                                        value="Borrar"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <figure className="text-center">
                    <blockquote className="blockquote">
                        <h1>Personas</h1>
                    </blockquote>
                </figure>
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Sexo</th>
                            <th scope="col">Vivienda</th>
                            <th scope="col">Municipio</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {personas.map((item) => (
                            <tr key={item.id}>
                                <th scope="row">{i++}</th>
                                <td>{item.nombre}</td>
                                <td>{item.telefono}</td>
                                <td>{item.sexo}</td>
                                <td>{item.direccion}</td>
                                <td>{item.viviendaId}</td>
                                <td>
                                    <input
                                        onClick={() => removeItem(item.id)}
                                        type="button"
                                        className="btn btn-danger mb-3"
                                        value="Borrar"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
        </>
    );
};

export default List;
