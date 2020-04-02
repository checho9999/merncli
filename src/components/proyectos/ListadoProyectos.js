import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext'
import AlertaContext from '../../context/alertas/alertaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ListadoProyectos = () => {

    //State de los proyectos
    const proyectosContext = useContext(proyectoContext);
    //Extraemos los datos desde el proyectoContext
    const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

    //State de las alertas
    const alertaContext = useContext(AlertaContext);
    //Extraemos los datos desde el alertaContext
    const { alerta, mostrarAlerta } = alertaContext;

    //Obtenemos los datos de los proyectos cuando se actualiza el componente
    useEffect(() => {        
        //Llamamos al dispatch para informar la correspondiente alerta
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        
        obtenerProyectos();
        // eslint-disable-next-line
    }, [ mensaje ] ); 

    //Si no tiene contenido no muestra nada
    if(proyectos.length === 0 ) return <p>No hay proyectos, comienza creando uno</p>;

    return ( 
        <ul className="listado-proyectos">
        { alerta ? ( <div className={`alerta ${alerta.categoria} `}>{alerta.msg}</div> ) : null }
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition 
                        key={proyecto._id}
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