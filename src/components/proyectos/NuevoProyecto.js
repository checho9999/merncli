import React, { Fragment, useState } from 'react';

const NuevoProyecto = () => {

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
 
    return ( 
        <Fragment>
            <button 
                type="button"
                className="btn btn-block btn-primario" 
            >Nuevo Proyecto</button>

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
 
        </Fragment>
     );
}
 
export default NuevoProyecto;