//options={{ drawerItemStyle: { display: 'none' } }}

import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { Login } from './src/components/Login';
import { UsuarioTelaPrincipal } from './src/components/UsuarioTelaPrincipal';
import { AdmCadastroProduto } from './src/components/AdmCadastroProduto';
import { AdmCadastroUsuario } from './src/components/AdmCadastroUsuario';
import { AdmListagemUsuario } from './src/components/AdmListagemUsuario';
import { AdmExcluirUsuario } from './src/components/AdmExcluirUsuario';
import { AdmEditarUsuario } from './src/components/AdmEditarUsuario';
import { AdmRegistrarTroca } from './src/components/AdmRegistrarTroca';

const Drawer = createDrawerNavigator()

export default function App() {
  return (    
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login" >
        <Drawer.Screen name="Pontuação" options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} component={UsuarioTelaPrincipal}/>
        <Drawer.Screen name="Novo Produto" options={{headerStyle: {backgroundColor: 'rgb(57, 73, 88)'}, headerTintColor: 'white'}} component={AdmCadastroProduto}/>
        <Drawer.Screen name="Novo Usuario" options={{headerStyle: {backgroundColor: 'rgb(57, 73, 88)'}, headerTintColor: 'white'}} component={AdmCadastroUsuario}/>
        <Drawer.Screen name="Listar Usuarios" options={{headerStyle: {backgroundColor: 'rgb(57, 73, 88)'}, headerTintColor: 'white'}} component={AdmListagemUsuario}/>
        <Drawer.Screen name="Excluir Usuario" options={{headerStyle: {backgroundColor: 'rgb(57, 73, 88)'}, headerTintColor: 'white'}} component={AdmExcluirUsuario}/>
        <Drawer.Screen name="Editar Usuario" options={{headerStyle: {backgroundColor: 'rgb(57, 73, 88)'}, headerTintColor: 'white'}} component={AdmEditarUsuario}/>
        <Drawer.Screen name="Registrar Troca" options={{headerStyle: {backgroundColor: 'rgb(57, 73, 88)'}, headerTintColor: 'white'}} component={AdmRegistrarTroca}/>
        <Drawer.Screen name="Login" component={Login} options={{ headerShown: false, drawerLabel: 'Exit' }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  )
}