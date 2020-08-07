import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';
import PropTypes from 'prop-types';

function App() {

// Citas en local storage
let citasIniciales = JSON.parse(localStorage.getItem('citas'));
 if (!citasIniciales) {
   citasIniciales = [];
 }

// areglo principal de citas
const [citas, guardarCitas] = useState([])

// use Effect para realizar ciertas operaciones cuando el state cambia
useEffect(() => {
  if (citasIniciales) {
    localStorage.setItem('citas', JSON.stringify(citas))
  }else {
    localStorage.setItem('citas', JSON.stringify([]))
  }
}, [citas]);

// funcion que tome las citas actuales y agregue la nueva
const crearCita = cita => {
  guardarCitas([
    ...citas,
    cita
  ])
  console.log("Citas agregadas")
}

// Funcion que elimina una cita por su ID
const eliminarCita = id => {
  const nuevasCitas = citas.filter(cita => cita.id !== id);
  guardarCitas(nuevasCitas)
}

// Mensaje condicional
const titulo = citas.length === 0 ?  'No hay citas' : 'Administra tus citas';

  return (
    <Fragment>
      <h1>Administrador de citas</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
          <Formulario
            crearCita={crearCita}
          />
          </div>
          <div className="one-half column">
              <h2>{titulo}</h2>
              {citas.map(cita => (
                <Cita
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
              ))}
          </div>
        </div>
      </div>
  </Fragment>
  );
}

// validar la entrada de o salida de datos en un componente
Cita.propTypes = {
  cita: PropTypes.object.isRequired,
  eliminarCita: PropTypes.func.isRequired
}


export default App;
