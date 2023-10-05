import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import clienteAxios from "../config/clienteAxios";

const ListPersonas = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const [error, setError] = React.useState(true);
    const [personaEdit, setpersonaEdit] = React.useState({});
    const [personas, setPersonas] = React.useState([]);
    const [viviendas, setViviendas] = React.useState([]);
    var i = 1;

    const addId = (id) => {
        var personaEditar = personas.filter((pers) => pers.id == id);
        setpersonaEdit(personaEditar[0]);
        console.log(personaEditar[0]);
    };

    const onSubmit = async (data) => {
        console.log(data);
        try {
            for (let clave in data) {
                // eslint-disable-next-line no-prototype-builtins
                if (data.hasOwnProperty(clave)) {
                    if (data[clave] === "") {
                        data[clave] = personaEdit[clave];
                    }
                }
            }
            data.id = personaEdit.id;
            await clienteAxios.patch("personas?id=eq." + personaEdit.id, data);
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
    const getCF = (id) => {
        var res = personas.filter((per) => per.id == id);
        if (res.length == 0) {
            res = "null";
        } else {
            res = res[0].nombre;
        }
        return res;
    };
    const getVivienda = (id) => {
        var res = viviendas.filter((viv) => viv.id_viv == id);
        if (res.length == 0) {
            res = "null";
        } else {
            res = res[0].direccion;
        }
        return res;
    };
    const removeItem = async (id) => {
        try {
            await clienteAxios.delete("personas?id=eq." + id);
            getData();
        } catch (err) {
            console.log(err);
        }
    };
    const onChange = (e) => {
        setPersonas(e.target.value);
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
                            <h1>Personas</h1>
                        </blockquote>
                    </figure>
                    <table className="table table-dark text-center">
                        <thead className="">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Telefono</th>
                                <th scope="col">Sexo</th>
                                <th scope="col">Vivienda</th>
                                <th scope="col">C.F</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody className="table-light">
                            {personas
                                ? personas.map((item) => (
                                      <tr key={item.id}>
                                          <th scope="row">{i++}</th>
                                          <td>{item.nombre}</td>
                                          <td>{item.telefono}</td>
                                          <td>{item.sexo}</td>
                                          <td>{getVivienda(item.vivienda_id)}</td>
                                          <td>{getCF(item.cabeza_de_familia)}</td>
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
                                              <input
                                                  onClick={() => removeItem(item.id)}
                                                  type="button"
                                                  className="btn btn-danger mb-3"
                                                  value="Borrar"
                                              />
                                          </td>
                                      </tr>
                                  ))
                                : null}
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
                                                Nombre Completo :
                                            </label>
                                            <input
                                                onChange={onChange}
                                                type="text"
                                                className="form-control"
                                                defaultValue={personaEdit.nombre}
                                                {...register("nombre", { required: false })}
                                            />
                                            {errors.name && <span className="valid">Este campo es obligatorio</span>}
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col">
                                                <label htmlFor="Documento" className="form-label">
                                                    Numero de Documento :
                                                </label>
                                                <input
                                                    type="number"
                                                    {...register("id")}
                                                    className="form-control"
                                                    id="id"
                                                    name="id"
                                                    defaultValue={personaEdit.id}
                                                />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="telefono" className="form-label">
                                                    Telefono :
                                                </label>
                                                <input
                                                    type="number"
                                                    {...register("telefono")}
                                                    className="form-control"
                                                    id="telefono"
                                                    name="telefono"
                                                    defaultValue={personaEdit.telefono}
                                                    min="1"
                                                    max="9999999999"
                                                />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="edad" className="form-label">
                                                    Edad :
                                                </label>
                                                <input
                                                    required
                                                    type="number"
                                                    {...register("edad")}
                                                    className="form-control"
                                                    id="edad"
                                                    name="edad"
                                                    defaultValue={personaEdit.edad}
                                                    min="1"
                                                    max="100"
                                                />
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col">
                                                <label htmlFor="sexo" className="form-label">
                                                    Sexo
                                                </label>
                                                <select className="form-select mb-3" {...register("sexo")}>
                                                    <option defaultValue={personaEdit.sexo}>{personaEdit.sexo}</option>
                                                    <option value="M">M</option>
                                                    <option value="F">F</option>
                                                </select>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="vivienda" className="form-label">
                                                    Vivienda :
                                                </label>
                                                <select className="form-select mb-3" {...register("vivienda_id")}>
                                                    <option value={personaEdit.vivienda_id} defaultValue={personaEdit.vivienda_id}>
                                                        Selecciona una opción
                                                    </option>
                                                    {viviendas
                                                        ? viviendas.map((item) => (
                                                              <option key={item.id_viv} value={item.id_viv}>
                                                                  {item.direccion}
                                                              </option>
                                                          ))
                                                        : null}
                                                </select>
                                            </div>

                                            <div className="col">
                                                <label htmlFor="familia" className="form-label">
                                                    Cabeza de familia:
                                                </label>
                                                <select className="form-select mb-3" {...register("cabeza_de_familia")}>
                                                    <option value={personaEdit.cabeza_de_familia} defaultValue={personaEdit.cabeza_de_familia}>
                                                        Selecciona una opción
                                                    </option>
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

export default ListPersonas;
