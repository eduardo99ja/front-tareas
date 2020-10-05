import React from "react";
import NuevoProyecto from "../proyectos/NuevoProyecto"
import ListadoProyectos from "../proyectos/ListadoProyectos"
const Sidebar = () => {
  return (
    <aside>
      <h1>
        MERN<span>Task</span>
        <NuevoProyecto/>
      </h1>
      <div className="proyectos">
          <h2>Tus proyectos</h2>
          <ListadoProyectos />
      </div>

    </aside>
  );
};

export default Sidebar;
