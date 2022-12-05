import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuPrincipal from './Componentes/MenuPrincipal/MenuPrincipal';
import LoginBancarizado from './Componentes/Login/LoginBancarizado';
import LoginNoBancarizado from './Componentes/Login/LoginNoBancarizado';
import HomeBanking from './Componentes/HomeBanking/HomeBanking';
import Cartera from './Componentes/HomeUsuario/Cartera/Cartera';
import Tabs from './Componentes/Navegacion/FooterNav';
import { ContextoProvider } from './Storage/ContextoProvider';
import deshabilitarHeader from './Utilidades/DeshabilitarHeader';



const Stack = createStackNavigator();

export default function App() {

  return (
   
      <ContextoProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Menu Principal" component={MenuPrincipal} options={{ headerShown: false }} />
            <Stack.Screen name="Login Bancarizado" component={LoginBancarizado} options={{ headerShown: false }} />
            <Stack.Screen name="Login No Bancarizado" component={LoginNoBancarizado} options={{ headerShown: false }} />
            <Stack.Screen name="Cartera" component={Cartera} options={{ headerShown: false }} />
            <Stack.Screen name="Home Banking" component={HomeBanking} />
            <Stack.Screen name="Home Usuario" component={Tabs} options={({ route }) => ({ headerShown: deshabilitarHeader(route, ['Cartera', 'Librar', 'Home']) })} />
          </Stack.Navigator>
        </NavigationContainer>
      </ContextoProvider>
  

  );
};
