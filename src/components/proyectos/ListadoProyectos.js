import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ListadoProyectos = () => {

    //State de los proyectos
    const proyectosContext = useContext(proyectoContext);
    //Extraemos los datos desde el proyectoContext
    const { proyectos, obtenerProyectos } = proyectosContext;

    //Obtenemos los proyectos cuando se carga el componente
    useEffect(() => {    
        obtenerProyectos();
        // eslint-disable-next-line
    }, [] ); 

    //Si no tiene contenido no muestra nada
    if(proyectos.length === 0 ) return <p>No hay proyectos, comienza creando uno</p>;

    return ( 
        <ul className="listado-proyectos">
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition 
                        key={proyecto.id}
                        timeout={200}
                        classNames='proyecto'
                    >
                        <Proyecto                            
                            proyecto={proyecto}
                        />
                    </CSSTransition>    
                ))}
            </TransitionGroup>            
        </ul>
     );
}
 
export default ListadoProyectos;