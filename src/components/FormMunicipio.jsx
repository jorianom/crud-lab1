import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import clienteAxios from "../config/clienteAxios";

const FormMunicipio = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const [error, setError] = React.useState(true);
    const [departamentos, setDepartamentos] = React.useState([]);
    const [personas, setPersonas] = React.useState([]);

    const onSubmit = async (data) => {
        console.log(data);
        try {
            
            for (let clave in data) {
                // eslint-disable-next-line no-prototype-builtins
                if (data.hasOwnProperty(clave)) {
                    if (data[clave] === "") {
                        data[clave] = null;
                    }
                }
            }
            await clienteAxios.post("municipios", data);
            setError(false);
            clean();
        } catch (err) {
            console.log(err);
        }
    };
    const getData = async () => {
        try {
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
    useEffect(() => {
        getData();
    }, []);
    const clean = () => {
        document.getElementById("form1").reset();
        setTimeout(() => {
            setError(true);
        }, 3000);
    };
    return (
        <>
            <div className="container-fluid mt-5 post">
                <h2 className="my-5">Agregar Municipio</h2>
                {!error ? <div className="alert alert-success">Enviado</div> : null}
                <form id="form1" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">
                            Nombre Municipio:
                        </label>
                        <input required type="text" className="form-control" placeholder="Nombre Municipio" {...register("nombre", { required: true })} />
                        {errors.name && <span className="valid">Este campo es obligatorio</span>}
                    </div>
                    <div className="row g-3 mb-3">
                        <div className="col-auto">
                            <label htmlFor="telefono" className="form-label">
                                Area (km^2):
                            </label>
                            <input required type="number" {...register("area")} className="form-control" id="area" name="area" placeholder="Area" />
                        </div>
                        <div className="col-auto">
                            <label htmlFor="presupuesto" className="form-label">
                                Presupuesto (B):
                            </label>
                            <input
                                type="number"
                                {...register("presupuesto")}
                                className="form-control"
                                id="presupuesto"
                                name="presupuesto"
                                placeholder="Presupuesto"
                            />
                        </div>
                    </div>
                    <div className="row g-3 mb-3">
                        <div className="col">
                            <label htmlFor="departamento" className="form-label">
                                Departamento :
                            </label>
                            <select required className="form-select mb-3" {...register("departamento_id")}>
                                <option value={""} defaultValue={""}>
                                    Selecciona una opción
                                </option>
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
                                Alcalde :
                            </label>
                            <select className="form-select mb-3" {...register("gobernador_id")}>
                                <option value={""} defaultValue={""}>
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
                        <input type="submit" className="btn btn-primary mb-3" value="Enviar" />
                    </div>
                </form>
            </div>
        </>
    );
};

export default FormMunicipio;
