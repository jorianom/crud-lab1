import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import clienteAxios from "../config/clienteAxios";

const ListViviendas = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const [error, setError] = React.useState(true);
    const [viviendaEdit, setviviendaEdit] = React.useState({});
    const [personas, setPersonas] = React.useState([]);
    const [municipios, setMunicipios] = React.useState([]);
    const [viviendas, setViviendas] = React.useState([]);
    var i = 1;

    const addId = (id) => {
        var viviendaEditar = viviendas.filter((pers) => pers.id == id);
        setviviendaEdit(viviendaEditar[0]);
        console.log(viviendaEditar[0]);
    };

    const onSubmit = async (data) => {
        console.log(data);
        try {
            for (let clave in data) {
                // eslint-disable-next-line no-prototype-builtins
                if (data.hasOwnProperty(clave)) {
                    if (data[clave] === "") {
                        data[clave] = viviendaEdit[clave];
                    }
                }
            }
            await clienteAxios.patch("viviendas?id_viv=eq." + viviendaEdit.id_viv, data);
            getData();
            setError(false);
            clean();
        } catch (err) {
            console.log(err);
        }
    };
    const clean = () => {
        document.getElementById("form1").reset();
        setTimeout(() => {
            setError(true);
        }, 3000);
    };
    const getData = async () => {
        try {
            const rtaV = await clienteAxios.get("viviendas?select=*");
            setViviendas(rtaV.data);
            const rtaM = await clienteAxios.get("municipios?select=*");
            setMunicipios(rtaM.data);
            const rtaP = await clienteAxios.get("personas?select=*");
            setPersonas(rtaP.data);
        } catch (err) {
            console.log(err);
            setError({
                error: true,
                msg: "Error al obtener los datos",
            });
            setTimeout(() => {
                setError({
                    error: false,
                    msg: "",
                });
            }, 5000);
        }
    };
    const removeItem = async (id) => {
        try {
            await clienteAxios.delete("viviendas?id_viv=eq." + id);
            getData();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <div className="container mt-5">
                <div className="tables">
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
                                            onClick={() => addId(item.id)}
                                            type="button"
                                            className="btn btn-success mb-3"
                                            value="Editar"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                        />
                                    </td>
                                    <td>
                                        <input onClick={() => removeItem(item.id_viv)} type="button" className="btn btn-danger mb-3" value="Borrar" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Editar Vivienda
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="container-fluid post">
                                    {!error ? <div className="alert alert-success">Enviado</div> : null}
                                    <form id="form1" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-3">
                                            <label htmlFor="direccion" className="form-label">
                                                Dirección :
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                defaultValue={viviendaEdit.direccion}
                                                {...register("direccion", { required: false })}
                                            />
                                            {errors.name && <span className="valid">Este campo es obligatorio</span>}
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-auto">
                                                <label htmlFor="capacidad" className="form-label">
                                                    Capacidad (#Personas):
                                                </label>
                                                <input
                                                    required
                                                    type="number"
                                                    {...register("capacidad")}
                                                    className="form-control"
                                                    id="capacidad"
                                                    name="capacidad"
                                                    defaultValue={viviendaEdit.capacidad}
                                                />
                                            </div>
                                            <div className="col-auto">
                                                <label htmlFor="niveles" className="form-label">
                                                    Niveles (Pisos):
                                                </label>
                                                <input
                                                    required
                                                    type="number"
                                                    {...register("niveles")}
                                                    className="form-control"
                                                    id="niveles"
                                                    name="niveles"
                                                    defaultValue={viviendaEdit.niveles}
                                                />
                                            </div>
                                            <div className="col-auto">
                                                <label htmlFor="municipio" className="form-label">
                                                    Municipio :
                                                </label>
                                                <select required className="form-select mb-3" {...register("municipio_id")}>
                                                    {municipios.map((item) => (
                                                        <option key={item.id_mun} value={item.id_mun}>
                                                            {item.nombre}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-auto">
                                                <label htmlFor="municipio" className="form-label">
                                                    Propietario :
                                                </label>
                                                <select className="form-select mb-3" {...register("propietario_id")}>
                                                    {personas.map((item) => (
                                                        <option key={item.id_mun} value={item.id_mun}>
                                                            {item.nombre}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <input type="submit" className="btn btn-primary mb-3" value="Actualizar" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListViviendas;
