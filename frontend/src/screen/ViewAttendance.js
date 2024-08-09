import React, {useState} from 'react';
import {View, Text, TextInput, Button, FlatList, Alert} from 'react-native';
import axios from 'axios';

const ViewAttendanceScreen = ({navigation}) => {
  const [studentName, setStudentName] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const fetchAttendanceRecords = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5005/attendance/${studentName}`,
      );
      setAttendanceRecords(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch attendance records');
      console.error('Error fetching attendance records:', error);
    }
  };

  return (
    <View style={{padding: 20, backgroundColor: '#4C3D3D', flex: 1}}>
      <TextInput
        placeholder="Student Name"
        
        value={studentName}
        onChangeText={setStudentName}
        style={{
          marginBottom: 20,
          backgroundColor: '#FFD95A',
          height: '10%',
          borderRadius: 5,
          padding:20
        }}
      />
      <Button color={"#C07F00"} title="Fetch Attendance" onPress={fetchAttendanceRecords} />
      <FlatList
        data={attendanceRecords}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={{marginBottom: 10}}>
            <Text style={{marginTop:5,color:"#FFF7D4"}}>Date: {item.date}</Text>
            <Text style={{color:"#FFF7D4"}}>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ViewAttendanceScreen;
