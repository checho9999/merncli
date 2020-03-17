import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

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

    }

    return ( 
        <div className='form-usuario'>
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