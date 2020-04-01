import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

//Agregamos props para poder acceder el props.history a traves de react-router-dom
const NuevaCuenta = ( props ) => {

    //State de las alertas
    const alertaContext = useContext(AlertaContext);
    //Extraemos los datos desde el alertaContext
    const { alerta, mostrarAlerta } = alertaContext;

    //State de la autenticacion
    const authContext = useContext(AuthContext);
    //Extraemos los datos desde el authContext
    const { mensaje, autenticado, registrarUsuario } = authContext;
    
    //Monitoreamos si el usuario ya estaba autenticado(registro correcto), o si es un registro duplicado
    useEffect(() => {
        //Si el usuario ya estaba autenticado(se acaba de registrar), lo redirigimos hacia sus proyectos
        if ( autenticado ) {
            props.history.push('/proyectos');
        }

        //Llamamos al dispatch para informar la correspondiente alerta
        if ( mensaje ) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [ mensaje, autenticado, props.history ]);

    //state para actualizar los datos del usuario desde el input
    const [ usuario, guardarUsuario ] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    //extraemos los datos del nuevo usuario desde el state
    const { nombre, email, password, confirmar } = usuario;

    //obtenemos todo lo ingresado por el usuario desde el input y lo actualizamos en el state
    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [ e.target.name ] : e.target.value
        })

    }

    const onSubmit = e => {
        //para que no se envie el query string en la parte superior, ni se recarge la pagina
        e.preventDefault();

        //validamos el nombre, el email, el password y la confirmacion del password ingresado por el usuario
        if( nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '' ) {
            //Llamamos al dispatch para informar la alerta
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        //Validamos que el password no sea menor a 6 caracteres
        if(password.length < 6) {
            //Llamamos al dispatch para informar la alerta
            mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error');
            return;
        }

        //Validamos que el password y la confirmacion del mismo sean iguales
        if(password !== confirmar) {
            //Llamamos al dispatch para informar la alerta
            mostrarAlerta('Los passwords no son iguales', 'alerta-error');
            return;
        }

        //Una vez que la validacion es correcta, pasamos la NuevaCuenta de usuario al action
        registrarUsuario({
            nombre, 
            email, 
            password
        });

    }

    return ( 
        <div className="form-usuario">
        { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> )  : null }
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu Nombre"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input 
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repite tu Password"
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Registrarme" />
                    </div>
                </form>

                <Link to={'/'} className="enlace-cuenta">
                    Volver a Iniciar Sesión
                </Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;