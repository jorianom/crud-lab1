import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import clienteAxios from "../config/clienteAxios";

const FormVivienda = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const [error, setError] = React.useState(true);
    const [municipios, setMunicipios] = React.useState([]);
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
            await clienteAxios.post("viviendas", data);
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
            const rta = await clienteAxios.get("municipios?select=*");
            console.log(rta);
            setMunicipios(rta.data);
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
    return (
        <>
            <div className="container-fluid mt-5 post">
                <h2 className="my-5">Agregar Vivienda</h2>
                {!error ? <div className="alert alert-success">Enviado</div> : null}
                <form id="form1" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="direccion" className="form-label">
                            Dirección :
                        </label>
                        <input required type="text" className="form-control" placeholder="Dirección" {...register("direccion", { required: true })} />
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
                                placeholder="Capacidad"
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
                                placeholder="Niveles"
                            />
                        </div>
                        <div className="col-auto">
                            <label htmlFor="municipio" className="form-label">
                                Municipio :
                            </label>
                            <select required className="form-select mb-3" {...register("municipio_id")}>
                                <option value={""} defaultValue={""}>
                                    Selecciona una opción
                                </option>
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
                                <option value={""} defaultValue={""}>
                                    Selecciona una opción
                                </option>
                                {personas.map((item) => (
                                    <option key={item.id_mun} value={item.id}>
                                        {item.nombre}
                                    </option>
                                ))}
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

export default FormVivienda;
