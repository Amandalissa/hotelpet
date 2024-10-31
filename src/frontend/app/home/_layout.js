import React from "react";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./index";
import ClienteHub from "./ClienteHub";

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Reservations':
              iconName = 'search';
              break;
            case 'Support':
              iconName = 'help-outline';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#D09D68',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#4B2508',
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
        headerShown: false
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name="Reservations" component={ClienteHub}/>
      <Tab.Screen name="Support" component={ClienteHub}/>
      <Tab.Screen name="Profile" component={ClienteHub}/>
    </Tab.Navigator>
  );
}