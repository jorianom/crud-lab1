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

    const onSubmit = async (data) => {
        console.log(data);
        try {
            await clienteAxios.post("api/crud/addVivienda", data);
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
            const rta = await clienteAxios.get("api/crud/municipios");
            setMunicipios(rta.data.municipios);
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
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Dirección"
                            {...register("direccion", { required: true })}
                        />
                        {errors.name && (
                            <span className="valid">Este campo es obligatorio</span>
                        )}
                    </div>
                    <div className="row g-3 mb-3">
                        <div className="col-auto">
                            <label htmlFor="capacidad" className="form-label">
                                Capacidad :
                            </label>
                            <input
                                type="number"
                                {...register("capacidad")}
                                className="form-control"
                                id="capacidad"
                                name="capacidad"
                                placeholder="Capacidad"
                            />
                        </div>
                        <div class="col-auto">
                            <label htmlFor="niveles" className="form-label">
                                Niveles :
                            </label>
                            <input
                                type="number"
                                {...register("niveles")}
                                className="form-control"
                                id="niveles"
                                name="niveles"
                                placeholder="Niveles"
                            />
                        </div>
                        <div class="col-auto">
                            <label htmlFor="municipio" className="form-label">
                                Municipio :
                            </label>
                            <select
                                className="form-select mb-3"
                                {...register("municipioId")}
                            >
                                {municipios.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-auto">
                        <input
                            type="submit"
                            className="btn btn-primary mb-3"
                            value="Enviar"
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default FormVivienda;
