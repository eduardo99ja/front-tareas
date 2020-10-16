import React, { useReducer } from "react";
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";
import clienteAxios from "../../config/axios";

import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from "../../types";

const TareaState = (props) => {
  const initialState = {
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null,
  };

  //crear dispatch y state

  const [state, dispatch] = useReducer(TareaReducer, initialState);

  //crear las funciones

  //obtener las tareas de un proyecto
  const obtenerTareas = async (proyecto) => {
    console.log(proyecto);
    try {
      const resultado = await clienteAxios.get("/api/tareas", {
        params: { proyecto },
      });
      console.log(resultado.data.tareas);
      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //agregar una tarea al proyecto seleccionado

  const agregarTarea = async (tarea) => {
    try {
      const resultado = await clienteAxios.post("/api/tareas", tarea);
      dispatch({
        type: AGREGAR_TAREA,
        payload: resultado.data.tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Valida y muestra un error en caso de que sea necesario
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  //eliminar tarea por id

  const eliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //cambia el estado de la tarea

 // const cambiarEstadoTarea = (tarea) => {
   // dispatch({
     // type: ESTADO_TAREA,
      //payload: tarea,
    //});
  //};

  //eDITA o modifica la tarea

  const actualizarTarea = async (tarea) => {
    try {
      const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`,tarea);
      console.log("editar",resultado);
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data.tarea,
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  //extrae una tarea para edicion

  const guardarTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };
  

  //elimina la tarea seleccionada
  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA,
    });
  };
  return (
    <TareaContext.Provider
      value={{
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTarea,
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
