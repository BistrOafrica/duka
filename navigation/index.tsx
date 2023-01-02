/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { AntDesign, FontAwesome, Foundation, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { BottomTabBarProps, BottomTabHeaderProps, BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, View, Text, Platform } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/Home';
import { RootStackParamList, RootTabParamList, RootTabScreenProps, TabDataType } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Home from '../screens/Home';
import Explore from '../screens/Orders';
import Cart from '../screens/Cart';
import Orders from '../screens/Orders';
import Search from '../screens/Search';
import Account from '../screens/Account';
import { useCallback, useMemo } from 'react';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        header: (props: BottomTabHeaderProps) => {
          return (
            <View style={{
              backgroundColor: Colors[colorScheme].primary,
              height: Platform.OS === 'ios' ? 150 : 300,
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingTop: Platform.OS === 'ios' ? 100 : 100,
            }}
            >
              <Text style={{ color: Colors[colorScheme].text, fontSize: 20 }}>{props.route.name}</Text>
            </View>
          )
        },
        headerBackgroundContainerStyle: {
          backgroundColor: "red",
        },
        tabBarActiveTintColor: Colors[colorScheme].primary,
        tabBarInactiveTintColor: Colors[colorScheme].inactiveTintColor,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].shade,
          borderTopColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabel(props) {
          return <Text style={{ color: props.focused ? Colors[colorScheme].primary : Colors[colorScheme].inactiveTintColor, fontSize: 12 }}>{props.children}</Text>
        },
      }}
    >
      <BottomTab.Screen
        name="Search"
        component={Search}
        options={({ navigation }: RootTabScreenProps<'Search'>) => ({
          title: 'Search',
          tabBarIcon: ({ color }) => <Octicons name="search" size={24} color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Cart"
        component={Cart}
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => <AntDesign name="shoppingcart" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Foundation name="home" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Orders"
        component={Orders}
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => <Octicons name="list-ordered" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={Account}
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <AntDesign name="setting" size={24} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
