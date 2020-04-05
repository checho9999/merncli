import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    //State de los proyectos
    const proyectosContext = useContext(proyectoContext);
    //Extraemos los datos desde el proyectoContext
    const { proyecto } = proyectosContext;

    //State de las tareas
    const tareasContext = useContext(tareaContext);
    //Extraemos los datos desde el tareaContext
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    //Detectamos si una tarea fue seleccionada o no para ser editada
    useEffect(() => {
        //si hay una tarea seleccionada
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada);
        } else{ 
            //caso contrario reseatemos el nombre para que no se muestre nada en el formulario
            guardarTarea({
                nombre: ''
            })
        }

    }, [ tareaseleccionada ])

    //state para actualizar los datos del usuario desde el input
    const [ tarea, guardarTarea ] = useState({
        nombre: ''
    })

    //extraemos el nombre del proyecto desde el state
    const { nombre } = tarea;   

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

    //Si el usuario quiere crear una nueva tarea o editarla
    const onSubmit = e => {
        //para que no se envie el query string en la parte superior, ni se recarge la pagina
        e.preventDefault();

        //validamos el nombre de la tarea
        if (nombre === ''){
            //Llamamos al dispatch para informar el error
            validarTarea();
            return;
        }

        //Determinamos si es una nueva tarea o si es una tarea para edicion
        if (tareaseleccionada === null){
            //La tarea es nueva
            ////Agregamos una nueva tarea al state////
            //asignamos el proyecto actual...en mongo DB es proyecto y su id es _id
            //tarea.proyectoId = proyectoActual.id;
            tarea.proyecto =  proyectoActual._id;
            //seteamos el estado en false para que arranque en incompleto...ya no es necesario, lo crea MongoDB
            //tarea.estado = false;
                    
            //llamamos al dispatch para agregar la nueva tarea
            agregarTarea(tarea);
        } else {
            //Es una tarea existente para edicion, asi que llamamos al dispatch para actualizarla
            actualizarTarea(tarea);
            //llamamos al dispatch para limpiar la tareaseleccionada
            limpiarTarea();
        }

        //Filtramos las tareas asociadas al proyecto actualizadas con la nueva que se agrego
        //obtenerTareas(proyectoActual.id)...esto lo saque porque es undefined
        obtenerTareas(proyectoActual._id);

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
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            { errortarea ? <p className='mensaje error'>El nombre de la Tarea es obligatorio</p> : null }
        </div>
     );
}
 
export default FormTarea;