import React, { Fragment, useContext, useState } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  //obtener el state del formulario

  const proyectosContext = useContext(proyectoContext);
  const {
    formulario,
    errorformulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
  } = proyectosContext;
  //state para proyecto

  const [proyecto, guardarProyecto] = useState({
    nombre: "",
  });

  //extraer nombre del proyecto

  const { nombre } = proyecto;

  //leermos contenidos del input
  const onChangeProyecto = (e) => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  //Cuando el usuario envia proyecto
  const onSubmitProyecto = (e) => {
    e.preventDefault();
    //Validar el proyecto
    if (nombre === "") {
      mostrarError();
      return;
    }

    //agregar al state

    agregarProyecto(proyecto);

    //reiniciar el form
    guardarProyecto({
      nombre: "",
    });
  };

  //Mostrar el formulario

  const onClickFormulario = () => {
    mostrarFormulario();
  };
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={onClickFormulario}
      >
        Nuevo Proyecto
      </button>
      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre del proyecyo"
            name="nombre"
            value={nombre}
            onChange={onChangeProyecto}
          />
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar proyecto"
          />
        </form>
      ) : null}
      {errorformulario ? <p className="mensaje error">El nombre es obligatorio</p> :null}
    </Fragment>
  );
};

export default NuevoProyecto;
