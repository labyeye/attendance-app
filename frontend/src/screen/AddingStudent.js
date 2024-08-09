import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const AddStudentScreen = ({ navigation }) => {
  const [name, setName] = useState('');

  const handleAddStudent = async () => {
    try {
      await axios.post('http://localhost:5005/students', { name });
      Alert.alert('Success', 'Student added');
      setName('');
      navigation.navigate('MarkAttendance');
    } catch (error) {
      Alert.alert('Error', 'Failed to add student');
      console.error('Error adding student:', error);
    }
  };

  return (
    <View style={{ padding: 20,backgroundColor: '#4C3D3D', flex: 1 }}>
      <TextInput
        placeholder="Student Register Number"
        value={name}
        onChangeText={setName}
        style={{ marginBottom: 20,marginTop:20
          ,backgroundColor:'#FFD95A',height:"10%",borderRadius:5,padding:20}}
      />
      <Button title="Add Student" onPress={handleAddStudent} />
    </View>
  );
};

export default AddStudentScreen;
