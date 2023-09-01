import React from "react";
import { useForm } from "react-hook-form";
import clienteAxios from "../config/clienteAxios";

const FormDepartamento = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const [error, setError] = React.useState(true);

    const onSubmit = async (data) => {
        console.log(data);
        try {
            await clienteAxios.post("api/crud/addMunicipio", data);
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
    return (
        <>
            <div className="container-fluid mt-5 post">
                <h2 className="my-5">Agregar Departamento</h2>
                {!error ? <div className="alert alert-success">Enviado</div> : null}
                <form id="form1" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">
                            Nombre Municipio:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre Municipio"
                            {...register("nombre", { required: true })}
                        />
                        {errors.name && (
                            <span className="valid">Este campo es obligatorio</span>
                        )}
                    </div>
                    <div className="row g-3 mb-3">
                        <div className="col">
                            <label htmlFor="poblacion" className="form-label">
                                Población :
                            </label>
                            <input
                                type="number"
                                {...register("area")}
                                className="form-control"
                                id="poblacion"
                                name="poblacion"
                                placeholder="Poblacion Municipio"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="telefono" className="form-label">
                                Area :
                            </label>
                            <input
                                type="number"
                                {...register("area")}
                                className="form-control"
                                id="area"
                                name="area"
                                placeholder="Area"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="presupuesto" className="form-label">
                                Presupuesto :
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

export default FormDepartamento;
