import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext'

const ListadoProyectos = () => {

    //State de los proyectos
    const proyectosContext = useContext(proyectoContext);

    //Extraemos los datos desde el proyectoContext
    const { proyectos, obtenerProyectos } = proyectosContext;

    //Obtenemos los proyectos cuando se carga el componente
    useEffect(() => {
    
        obtenerProyectos();

    }, []);    

    //Si no tiene contenido no muestra nada
    if (proyectos.length === 0) return null;

    return ( 
        <ul className="listado-proyectos">
                {proyectos.map(proyecto => (
                        <Proyecto 
                            key={proyecto.id}
                            proyecto={proyecto}
                        />
                ))}
        </ul>
     );
}
 
export default ListadoProyectos;