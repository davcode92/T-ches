import React, { useEffect } from "react";

function Alert({type, msg, removeAlert, list}) { // chaque fois que les accessoires vont changer, nous aurons un nouveau délai d'attente
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert()
    },2000) // après 2 secondes, invoquez RemoveAlert, puis masquez l'alerte
    return () => clearTimeout(timeout)
  },[list])
  return <p className={`alert alert-${type}`}>{msg}</p>; // selon le type il sera alerté avec les options danger ou succès
}

export default Alert;
