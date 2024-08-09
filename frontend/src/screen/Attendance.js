import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MarkAttendanceScreen = ({navigation}) => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://attendance-app-ku25.onrender.com/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleSubmit = async () => {
    try {
      await Promise.all(
        Object.entries(attendance).map(([studentId, status]) => {
          const student = students.find(s => s.id === studentId);
          return axios.post('https://attendance-app-ku25.onrender.com/attendance', {
            studentId,
            name: student.name,
            date,
            status: status ? 'present' : 'absent',
          });
        }),
      );
      Alert.alert('Success', 'Attendance recorded');
    } catch (error) {
      Alert.alert('Error', 'Failed to record attendance');
      console.error('Error recording attendance:', error);
    }
  };

  const toggleAttendance = studentId => {
    setAttendance(prev => ({...prev, [studentId]: !prev[studentId]}));
  };

  const renderItem = ({item}) => (
    <View
      style={{
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFD95A',
        width: '100%',
        height: '75%',
        borderRadius:5
      }}>
      <Text style={{flex: 1,marginLeft:10,fontWeight:'bold'}}>{item.name}</Text>
      <TouchableOpacity style={{marginRight:10}}onPress={() => toggleAttendance(item.id)}>
        <MaterialIcons
          name={attendance[item.id] ? 'check-box' : 'check-box-outline-blank'}
          size={30}
          color={attendance[item.id] ? '#4CAF50' : '#757575'}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{padding: 20, backgroundColor: '#4C3D3D', flex: 1}}>
      <TextInput
        placeholder="Enter the Date"
        
        value={date}
        onChangeText={setDate}
        style={{marginBottom: 20,backgroundColor:'#C07F00',height:"8%",borderRadius:5,padding:20}}
      />
      <Text style={{marginBottom:10,textAlign:'center',fontWeight:'bold',color:'white',fontSize:30}}>Student List</Text>
      <FlatList
        data={students}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
      <Button title="Submit Attendance" onPress={handleSubmit} />
    </View>
  );
};

export default MarkAttendanceScreen;
