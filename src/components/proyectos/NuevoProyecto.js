import React, { Fragment, useState, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext'

const NuevoProyecto = () => {

    //State de lo proyectos
    const proyectosContext = useContext(proyectoContext);

    //Extraemos los datos desde el proyectoContext
    const { formulario, mostrarFormulario } = proyectosContext;

    //state para actualizar los datos del usuario desde el input
    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });
    
    //extraemos el nombre del proyecto desde el state
    const { nombre } = proyecto;
    
    //obtenemos todo lo ingresado por el usuario desde el input y lo actualizamos en el state
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }    

    //Mostrar el formulario
    const onClickFormulario = () => {
        mostrarFormulario();
    }
     
    return ( 
        <Fragment>
            <button 
                type="button"
                className="btn btn-block btn-primario" 
                onClick={onClickFormulario}
            >Nuevo Proyecto</button>

            { formulario ? 
                (
                        <form
                            className="formulario-nuevo-proyecto"
                        >
                            <input 
                                type="text"
                                className="input-text"
                                placeholder="Nombre Proyecto"
                                name="nombre"
                                value={nombre}
                                onChange={onChangeProyecto}
                            />

                            <input 
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Agregar Proyecto"
                            />

                        </form>
                ) : null 
            }
 
        </Fragment>
     );
}
 
export default NuevoProyecto;