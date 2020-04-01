import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/autenticacion/authContext';

const Barra = () => {

    //State de la autenticacion
    const authContext = useContext(AuthContext);
    //Extraemos los datos desde el authContext
    const { usuario, usuarioAutenticado, cerrarSesion  } = authContext;

    //Obtenemos el usuario autenticado desde la API, cada vez que hay alguna actualizacion
    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);

    return ( 
        <header className='app-header'>
            {usuario ? <p className='nombre-usuario'>Hola <span>{usuario.nombre} </span> </p> : null}

            <nav className='nav-principal'>
                <button 
                    className='btn btn-blank cerrar-sesion'
                    onClick={() => cerrarSesion() } 
                >Cerrar Sesión</button>
            </nav>>
        </header>
     );
}
 
export default Barra;