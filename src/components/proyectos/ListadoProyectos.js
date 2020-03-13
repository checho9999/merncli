import React from 'react';
import Proyecto from './Proyecto';

const ListadoProyectos = () => {

    //Simulamos proyectos
    const proyectos = [
        {nombre: 'Tienda Virtual'},
        {nombre: 'Intranet'},
        {nombre: 'Diseño Sitio Web'}
    ]

    return ( 
        <ul className="listado-proyectos">
                {proyectos.map(proyecto => (
                        <Proyecto 
                            proyecto={proyecto}
                        />
                ))}
        </ul>
     );
}
 
export default ListadoProyectos;