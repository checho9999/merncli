import React, { useContext, useState } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    //state para actualizar los datos del usuario desde el input
    const [ tarea, guardarTarea ] = useState({
        nombre: ''
    })

    //extraemos el nombre del proyecto desde el state
    const { nombre } = tarea;   

    //State de los proyectos
    const proyectosContext = useContext(proyectoContext);
    //Extraemos los datos desde el proyectoContext
    const { proyecto } = proyectosContext;

    //State de las tareas
    const tareasContext = useContext(tareaContext);
    //Extraemos los datos desde el tareaContext
    const { errortarea, agregarTarea, validarTarea, obtenerTareas } = tareasContext;

    // Si no hay un proyecto seleccionado no mostramos nada
    if(!proyecto) return null;

    // Array destructuring para extraer el proyecto actual
    const [ proyectoActual ] =  proyecto;

    //obtenemos todo lo ingresado por el usuario desde el input y lo actualizamos en el state
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        //para que no se envie el query string en la parte superior, ni se recarge la pagina
        e.preventDefault();

        //validamos el nombre de la tarea
        if (nombre === ''){
            //Llamamos al dispatch para informar el error
            validarTarea();
            return;
        }

        ////Agregamos una nueva tarea al state////
        //asignamos el proyecto actual
        tarea.proyectoId = proyectoActual.id;
        //seteamos el estado en false para que arranque en incompleto
        tarea.estado = false;

        agregarTarea(tarea);

        //Filtramos las tareas asociadas al proyecto actualizadas con la nueva que se agrego
        obtenerTareas(proyectoActual.id)  

        //reiniciamos el nombre de la tarea en el formulario
        guardarTarea({
            nombre: ''
        })

    }

    return ( 
        <div className='formulario'>
            <form
                onSubmit={onSubmit}
            >
                <div className='contenedor-input'>
                    <input 
                        type='text'
                        className='input-text'
                        placeholder='Nombre Tarea...'
                        name='nombre'
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className='contenedor-input'>
                    <input 
                        type='submit'
                        className='btn btn-primario btn-submit btn-block'
                    />
                </div>
            </form>
            { errortarea ? <p className='mensaje error'>El nombre de la Tarea es obligatorio</p> : null }
        </div>
     );
}
 
export default FormTarea;