import React from 'react';
import { Link } from 'react-router-dom'

const NotFound = () =>
  <div>
      <h3>UPS...</h3>
    <h3>Pagina no encontrada</h3>
    <p>
      <Link to={`/`}>
        Regresar a Inicio
      </Link>
    </p>
  </div>

export default NotFound;