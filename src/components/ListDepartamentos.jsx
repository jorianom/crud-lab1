import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import clienteAxios from "../config/clienteAxios";

const ListDepartamentos = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const [error, setError] = React.useState(true);
    const [departamentoEdit, setdepartamentoEdit] = React.useState({});
    const [departamentos, setDepartamentos] = React.useState([]);
    var i = 1;

    const addId = (id) => {
        var departamentoEditar = departamentos.filter((pers) => pers.id_dpto == id);
        setdepartamentoEdit(departamentoEditar[0]);
    };

    const onSubmit = async (data) => {
        console.log(data);
        try {
            for (let clave in data) {
                // eslint-disable-next-line no-prototype-builtins
                if (data.hasOwnProperty(clave)) {
                    if (data[clave] === "") {
                        data[clave] = departamentoEdit[clave];
                    }
                }
            }
            await clienteAxios.patch("departamentos?id_dpto=eq." + departamentoEdit.id_dpto, data);
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
            const rtaD = await clienteAxios.get("departamentos?select=*");
            setDepartamentos(rtaD.data);
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
            await clienteAxios.delete("departamentos?id_dpto=eq." + id);
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
                            <h1>Departamentos</h1>
                        </blockquote>
                    </figure>
                    <table className="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Población (M)</th>
                                <th scope="col">Area (km^2)</th>
                                <th scope="col">Presupuesto (B)</th>
                                <th scope="col"> </th>
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
                                            onClick={() => addId(item.id_dpto)}
                                            type="button"
                                            className="btn btn-success mb-3"
                                            value="Editar"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            onClick={() => removeItem(item.id_dpto)}
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
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Editar Persona
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="container-fluid post">
                                    {!error ? <div className="alert alert-success">Enviado</div> : null}
                                    <form id="form1" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-3">
                                            <label htmlFor="nombre" className="form-label">
                                                Nombre Municipio:
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                defaultValue={departamentoEdit.nombre}
                                                {...register("nombre", { required: false })}
                                            />
                                            {errors.name && <span className="valid">Este campo es obligatorio</span>}
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col">
                                                <label htmlFor="poblacion" className="form-label">
                                                    Población (M):
                                                </label>
                                                <input
                                                    type="number"
                                                    {...register("poblacion")}
                                                    className="form-control"
                                                    id="poblacion"
                                                    name="poblacion"
                                                    defaultValue={departamentoEdit.poblacion}
                                                />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="area" className="form-label">
                                                    Area (km^2):
                                                </label>
                                                <input
                                                    required
                                                    type="number"
                                                    {...register("area")}
                                                    className="form-control"
                                                    id="area"
                                                    name="area"
                                                    defaultValue={departamentoEdit.area}
                                                />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="presupuesto" className="form-label">
                                                    Presupuesto (B):
                                                </label>
                                                <input
                                                    type="number"
                                                    {...register("presupuesto")}
                                                    className="form-control"
                                                    id="presupuesto"
                                                    name="presupuesto"
                                                    defaultValue={departamentoEdit.presupuesto}
                                                />
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

export default ListDepartamentos;
