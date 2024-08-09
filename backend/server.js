const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

// Load service account key from environment variable
const serviceAccountPath = path.resolve(__dirname, process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
app.use(bodyParser.json());


// Get all students
app.get('/students', async (req, res) => {
  try {
    const snapshot = await db.collection('students').get();
    const students = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).send(error.message);
  }
});

// Create attendance record
app.post('/attendance', async (req, res) => {
  const { studentId, date, status } = req.body;
  try {
    if (!studentId || !date || !status) {
      return res.status(400).send('Missing required fields');
    }
    
    // Fetch the student's name based on the studentId
    const studentDoc = await db.collection('students').doc(studentId).get();
    if (!studentDoc.exists) {
      return res.status(404).send('Student not found');
    }
    const studentData = studentDoc.data();
    const name = studentData.name;

    // Record the attendance with the student's name
    const docRef = await db.collection('attendance').add({ studentId, name, date, status });
    res.status(201).send({ id: docRef.id });
  } catch (error) {
    console.error('Error creating attendance record:', error);
    res.status(500).send(error.message);
  }
});

// Create a new student
app.post('/students', async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).send('Missing required fields');
    }
    const docRef = await db.collection('students').add({ name });
    res.status(201).send({ id: docRef.id, name });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).send(error.message);
  }
});

// Get attendance records for a student by name
app.get('/attendance/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const snapshot = await db.collection('attendance').where('name', '==', name).get();
    if (snapshot.empty) {
      return res.status(404).send('No records found for this student');
    }
    const records = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(records);
  } catch (error) {
    console.error('Error retrieving attendance records:', error);
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
