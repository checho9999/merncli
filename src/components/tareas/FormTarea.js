import React, { useState } from 'react';  

const FormTarea = () => {

    //state para actualizar los datos del usuario desde el input
    const [tarea, guardarTarea] = useState({
        nombre: ''
    })

    //extraemos el nombre del proyecto desde el state
    const { nombre } = tarea;   

    //obtenemos todo lo ingresado por el usuario desde el input y lo actualizamos en el state
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    return ( 
        <div className='formulario'>
            <form
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
            
        </div>
     );
}
 
export default FormTarea;