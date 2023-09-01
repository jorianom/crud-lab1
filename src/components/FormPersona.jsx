import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import clienteAxios from "../config/clienteAxios";


const FormPersona = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const [error, setError] = React.useState(true);

    const [viviendas, setViviendas] = React.useState([]);
    const [departamentos, setDepartamentos] = React.useState([]);
    const [municipios, setMunicipios] = React.useState([]);
    const onSubmit = async (data) => {
        console.log(data);
        try {
            await clienteAxios.post("api/crud/add", data);
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
            const rta = await clienteAxios.get("api/crud/viviendas");
            console.log(rta.data.viviendas);
            setViviendas(rta.data.viviendas);
            setMunicipios(rta.data.viviendas);
            setDepartamentos(rta.data.viviendas);
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
                <h2 className="my-5">Agregar Persona</h2>
                {!error ? <div className="alert alert-success">Enviado</div> : null}
                <form id="form1" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">
                            Nombre Completo :
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombres y apellidos"
                            {...register("nombre", { required: true })}
                        />
                        {errors.name && (
                            <span className="valid">Este campo es obligatorio</span>
                        )}
                    </div>
                    <div className="row g-3 mb-3">
                        <div className="col">
                            <label htmlFor="Documento" className="form-label">
                                Numero de Documento :
                            </label>
                            <input
                                type="text"
                                {...register("Documento")}
                                className="form-control"
                                id="Documento"
                                name="Documento"
                                placeholder="# Documento"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="telefono" className="form-label">
                                Telefono :
                            </label>
                            <input
                                type="text"
                                {...register("telefono")}
                                className="form-control"
                                id="telefono"
                                name="telefono"
                                placeholder="# Telefono"
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="edad" className="form-label">
                                Edad :
                            </label>
                            <input
                                type="number"
                                {...register("edad")}
                                className="form-control"
                                id="edad"
                                name="edad"
                                placeholder="Edad"
                            />
                        </div>
                    </div>
                    <div className="row g-3 mb-3">
                        <div className="col">
                            <label htmlFor="sexo" className="form-label">
                                Sexo
                            </label>
                            <select className="form-select mb-3" {...register("sexo")}>
                                <option defaultValue={"Otro"}>
                                    Selecciona una opción
                                </option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        <div className="col">
                            <label htmlFor="vivienda" className="form-label">
                                Vivienda :
                            </label>
                            <select
                                className="form-select mb-3"
                                {...register("viviendaId")}
                            >
                                {viviendas.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.direccion}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col">
                            <label htmlFor="municipio" className="form-label">
                                Municipio :
                            </label>
                            <select
                                className="form-select mb-3"
                                {...register("municipioId")}
                            >
                                {municipios.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.direccion}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col">
                            <label htmlFor="departamento" className="form-label">
                                Departamento :
                            </label>
                            <select
                                className="form-select mb-3"
                                {...register("departamentoId")}
                            >
                                {departamentos.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.direccion}
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

export default FormPersona;