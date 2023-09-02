import React, { useEffect } from "react";
import clienteAxios from "../config/clienteAxios";

const List = () => {
    const [personas, setPersonas] = React.useState([]);
    var i = 1;
    const getData = async () => {
        try {
            const rta = await clienteAxios.get("personas?select=*");
            
            console.log(rta);
            setPersonas(rta.data);
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
    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <div className="container-fluid mt-5">
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
