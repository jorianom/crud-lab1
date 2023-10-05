import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import clienteAxios from "../config/clienteAxios";

const ListMunicipios = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const [error, setError] = React.useState(true);
    const [municipiopEdit, setmunicipiopEdit] = React.useState({});
    const [municipios, setMunicipios] = React.useState([]);
    const [departamentos, setDepartamentos] = React.useState([]);
    const [personas, setPersonas] = React.useState([]);
    var i = 1;

    const addId = (id) => {
        var municipiopEditar = municipios.filter((pers) => pers.id_mun == id);
        setmunicipiopEdit(municipiopEditar[0]);
        console.log(municipiopEditar[0]);
    };

    const onSubmit = async (data) => {
        console.log(data);
        try {
            for (let clave in data) {
                // eslint-disable-next-line no-prototype-builtins
                if (data.hasOwnProperty(clave)) {
                    if (data[clave] === "") {
                        data[clave] = municipiopEdit[clave];
                    }
                }
            }
            await clienteAxios.patch("municipios?id_mun=eq." + municipiopEdit.id_mun, data);
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
            const rtaM = await clienteAxios.get("municipios?select=*");
            setMunicipios(rtaM.data);
            const rtaD = await clienteAxios.get("departamentos?select=*");
            setDepartamentos(rtaD.data);
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
            await clienteAxios.delete("municipios?id_mun=eq." + id);
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
                                            onClick={() => addId(item.id_mun)}
                                            type="button"
                                            className="btn btn-success mb-3"
                                            value="Editar"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                        />
                                    </td>
                                    <td>
                                        <input onClick={() => removeItem(item.id_mun)} type="button" className="btn btn-danger mb-3" value="Borrar" />
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
                                    Editar Municipio
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
                                                defaultValue={municipiopEdit.nombre}
                                                {...register("nombre", { required: false })}
                                            />
                                            {errors.name && <span className="valid">Este campo es obligatorio</span>}
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-auto">
                                                <label htmlFor="telefono" className="form-label">
                                                    Area (km^2):
                                                </label>
                                                <input
                                                    required
                                                    type="number"
                                                    {...register("area")}
                                                    className="form-control"
                                                    id="area"
                                                    name="area"
                                                    defaultValue={municipiopEdit.area}
                                                />
                                            </div>
                                            <div className="col-auto">
                                                <label htmlFor="presupuesto" className="form-label">
                                                    Presupuesto (B):
                                                </label>
                                                <input
                                                    required
                                                    type="number"
                                                    {...register("presupuesto")}
                                                    className="form-control"
                                                    id="presupuesto"
                                                    name="presupuesto"
                                                    defaultValue={municipiopEdit.presupuesto}
                                                />
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col">
                                                <label htmlFor="departamento" className="form-label">
                                                    Departamento :
                                                </label>
                                                <select required className="form-select mb-3" {...register("departamento_id")}>
                                                    {departamentos
                                                        ? departamentos.map((item) => (
                                                              <option key={item.id_dpto} value={item.id_dpto}>
                                                                  {item.nombre}
                                                              </option>
                                                          ))
                                                        : null}
                                                </select>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="departamento" className="form-label">
                                                    Gobernador :
                                                </label>
                                                <select required className="form-select mb-3" {...register("gobernador_id")}>
                                                    {personas
                                                        ? personas.map((item) => (
                                                              <option key={item.id} value={item.id}>
                                                                  {item.nombre}
                                                              </option>
                                                          ))
                                                        : null}
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

export default ListMunicipios;
