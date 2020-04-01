import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

//Agregamos props para poder acceder el props.history a traves de react-router-dom
const Login = ( props ) => {

    //State de las alertas
    const alertaContext = useContext(AlertaContext);
    //Extraemos los datos desde el alertaContext
    const { alerta, mostrarAlerta } = alertaContext;

    //State de la autenticacion
    const authContext = useContext(AuthContext);
    //Extraemos los datos desde el authContext
    const { mensaje, autenticado, iniciarSesion } = authContext;

    //Monitoreamos si el usuario ya estaba autenticado(inicio de sesion correcto), o si el email o el password ingresados son incorrectos
    useEffect(() => {
        //Si el usuario ya estaba autenticado(acaba de iniciar sesion), lo redirigimos hacia sus proyectos
        if (autenticado) {
            props.history.push('/proyectos');
        }

        //Llamamos al dispatch para informar la correspondiente alerta
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);

    //state para actualizar los datos del usuario desde el input
    const [ usuario, guardarUsuario ] = useState({
        email: '',
        password: ''
    });

    //extraemos los datos del usuario desde el state
    const { email, password } = usuario;

    //obtenemos todo lo ingresado por el usuario desde el input y lo actualizamos en el state
    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [ e.target.name ] : e.target.value
        })

    }

    //
    const onSubmit = e => {
        //para que no se envie el query string en la parte superior, ni se recarge la pagina
        e.preventDefault();

        //validamos el email y el password ingresado por el usuario
        if(email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }

        //Una vez que la validacion es correcta, pasamos el Login de usuario al action
        iniciarSesion({ email, password });
    }

    return ( 
        <div className='form-usuario'>
        { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> )  : null }

            <div className='contenedor-form sombra-dark'>
                <h1>Iniciar Sesión</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className='campo-form'>
                        <label htmlFor='email'>Email</label>
                        <input 
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Tu Email'
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <label htmlFor='password'>Password</label>
                        <input 
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Tu Password'
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className='campo-form'>
                        <input type='submit' className='btn btn-primario btn-block' value='Iniciar Sesión' />
                    </div>
                </form>

                <Link to={'/nueva-cuenta'} className='enlace-cuenta'>
                    Obtener Cuenta
                </Link>

            </div>
        </div>
     );
}
 
export default Login;