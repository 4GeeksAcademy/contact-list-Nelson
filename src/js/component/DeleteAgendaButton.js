import React, { useContext } from "react";
import { Context } from "../store/appContext";

const DeleteAgendaButton = () => {
  const { actions } = useContext(Context);

  const handleDeleteAgenda = () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta agenda?")) {
      actions.deleteAgenda();
    }
  };

  return (
    <button className="btn btn-danger ms-5" onClick={handleDeleteAgenda}>
      Eliminar Agenda
    </button>
  );
};

export default DeleteAgendaButton;