import React, { Fragment, useState } from "react";

const NuevoProyecto = () => {
  //state para proyecto

  const[proyecto, guardarProyecto] = useState({
    nombre: "",
  });

  //extraer nombre del proyecto

  const{nombre} = proyecto;

  //leermos contenidos del input
  const onChangeProyecto = (e) => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  //Cuando el usuario envia proyecto
  const onSubmitProyecto =e=>{
    e.preventDefault();
    //Validar el proyecto

    //agregar al state


    //reiniciar el form
  }
  return (
    <Fragment>
      <button type="button" className="btn btn-block btn-primario">
        Nuevo Proyecto
      </button>
      <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto} >

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
    </Fragment>
  );
};

export default NuevoProyecto;
