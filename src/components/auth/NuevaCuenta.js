import React, { useState,useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";
const NuevaCuenta = (props) => {
  //Extraer los valores del context

  const alertaContext = useContext(AlertaContext);
  const {alerta, mostrarAlerta} = alertaContext;

  const authContext = useContext(AuthContext);
  const {mensaje,autenticado,registrarUsuario} = authContext; 

  //En caso de que el usuarios e haya autenticado o sea regitro duplicado

  useEffect(()=>{
    if(autenticado){
      props.history.push("/proyectos");
    }
    if(mensaje){
      mostrarAlerta(mensaje.msg,mensaje.categoria);
    }

  },[mensaje,autenticado,props.history]);
  //state para iniciar sesion

  const [usuario, guardarUsuario] = useState({
    nombre:"",
    email: "",
    password: "",
    confirmar: ""
  });

  //extraer de usuario

  const { nombre, email, password, confirmar } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  //Cuando el usuario quire iniciar sesion

  const onSubmit = (e) => {
    e.preventDefault();

    //Validar que no haya campos vacions

    if(nombre.trim() == "" || email.trim() == "" || password.trim() == "" || confirmar.trim() == ""  ){
      mostrarAlerta("Todos los campos son obligatorios","alerta-error");
      return;
    }

    //passwors minimo 6 carcateres

    if(password.length<6){
      mostrarAlerta("El password debe de ser al menos 6 caracteres","alerta-error");
      return;
    }

    //los dos passwords son iguales
    if(password !== confirmar){
      mostrarAlerta("Las contraseñas no coinciden","alerta-error");
      return;
    }

    //Pasarlo al action

    registrarUsuario({
      nombre,
      email,
      password
    });
  };
  return (
    <div className="form-usuario">
      {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Obtener una cuenta</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu nombre"
              value={nombre}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              value={email}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu Password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="confirmar">Confirmar password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Confirmar password"
              value={confirmar}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrarme "
            />
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta">
          Volver  a iniciar sesion
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
