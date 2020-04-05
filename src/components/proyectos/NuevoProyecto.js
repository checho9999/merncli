import React, { Fragment, useState, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext'

const NuevoProyecto = () => {

    //State de los proyectos
    const proyectosContext = useContext(proyectoContext);
    //Extraemos los datos desde el proyectoContext
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

    //state para actualizar los datos del usuario desde el input
    const [ proyecto, guardarProyecto ] = useState({
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
    
    //Cuando el usuario submite un nuevo proyecto
    const onSubmitProyecto = e => {
        //para que no se envie el query string en la parte superior, ni se recarge la pagina
        e.preventDefault();

        //validamos el nombre del proyecto
        if (nombre === ''){
            //Llamamos al dispatch para informar el error
            mostrarError();
            return;
        }

        //agregamos el proyecto desde el state validado
        agregarProyecto(proyecto);

        //reiniciamos el nombre del proyecto en el formulario
        guardarProyecto({
            nombre: ''
        })

    }

    //llamamos el dispatch para mostrar el formulario al crear un nuevo proyecto
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
                            onSubmit={onSubmitProyecto}
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
 
            { errorformulario ? <p className='mensaje error'>El Nombre del Proyecto es Obligatorio</p> : null }

        </Fragment>
     );
}
 
export default NuevoProyecto;