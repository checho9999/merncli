import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';

//Aqui utilizamos Higher Order Component
//el component: Component especifica que el componente RutaPrivada va a contener otro componente
const RutaPrivada = ( { component: Component, ...props  } ) => {

    //State de la autenticacion
    const authContext = useContext(AuthContext);
    //Extraemos los datos desde el authContext
    const { autenticado, cargando, usuarioAutenticado } = authContext;

    //Obtenemos el usuario autenticado desde la API, cada vez que hay alguna actualizacion
    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);

    //Si el usuario no esta autenticado lo enviamos a la pagina principal, si no lo enviamos 
    //al componente
    //cargando permite, ya sea la primera vez que se ejecuta RutaPrivada o cuando se hace
    //refresh(porque en RutaPrivada el usuario se autentica solo cuando hay una actualizacion 
    //en el useEffect), que Proyectos no haga una transicion visual primero hacia a Login, 
    //para despues volver hacia Proyectos nuevamente
    return ( 
        <Route { ...props } render={ props => !autenticado && !cargando ?  (
            <Redirect to="/" />
        )  : (
            <Component {...props} />
        ) } />

     );
}
 
export default RutaPrivada;