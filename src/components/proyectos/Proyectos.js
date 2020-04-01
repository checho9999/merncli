import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormTarea from '../tareas/FormTarea'
import ListadoTareas from '../tareas/ListadoTareas';
import AuthContext from '../../context/autenticacion/authContext';

const Proyectos = () => {

    //State de la autenticacion
    const authContext = useContext(AuthContext);
    //Extraemos los datos desde el authContext
    const { usuarioAutenticado } = authContext;

    //Obtenemos el usuario autenticado desde la API, cada vez que hay alguna actualizacion
    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])
    
    return ( 
        <div className="contenedor-app">
            <Sidebar />

            <div className="seccion-principal">
                <Barra />

                <main>
                    <FormTarea />

                    <div className="contenedor-tareas">
                        <ListadoTareas />
                    </div>

                </main>
            </div>
        </div>
     );
}
 
export default Proyectos;