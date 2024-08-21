import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MarkAttendanceScreen from './src/screen/Attendance';
import AddStudentScreen from './src/screen/AddingStudent';
import ViewAttendanceScreen from './src/screen/ViewAttendance';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="MarkAttendance" >
        <Drawer.Screen name="MarkAttendance" component={MarkAttendanceScreen} options={{ title: 'Mark Attendance' ,headerStyle:{
          backgroundColor:'#FFF9D0'
        }}} />
        <Drawer.Screen name="AddStudent" component={AddStudentScreen} options={{ title: 'Add Student',headerStyle:{
          backgroundColor:'#FFF9D0'
        } }} />
        <Drawer.Screen name="ViewAttendance" component={ViewAttendanceScreen} options={{ title: 'View Attendance',headerStyle:{
          backgroundColor:'#FFF9D0'
        } }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
