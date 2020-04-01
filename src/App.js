import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';
import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';
import tokenAuth from './config/token';
import RutaPrivada from './components/rutas/RutaPrivada';

function App() {
   
  //console.log(process.env.REACT_APP_BACKEND_URL);

  //Revisamos si ya teniamos un token auth
  const token = localStorage.getItem('token');

  //Si el token existe, lo incluimos en el defaults headers del clienteAxios
  if (token) {
    tokenAuth(token);
  }

  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                  <Route exact path='/' component={Login} />
                  <Route exact path='/nueva-cuenta' component={NuevaCuenta} />                   
                  <RutaPrivada exact path='/proyectos' component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
