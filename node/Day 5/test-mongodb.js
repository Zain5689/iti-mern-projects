// Simple test to check MongoDB connection
const mongoose = require('mongoose');

async function testConnection() {
  const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/taskboard";
  
  console.log('Testing MongoDB connection...');
  console.log('Connection URI:', MONGODB_URI);
  
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });
    
    console.log('✅ MongoDB connection successful!');
    
    // Test basic operations
    const Task = require('./models/Task');
    
    // Create a test task
    const testTask = new Task({
      title: 'Test Task from Connection Test',
      done: false
    });
    
    await testTask.save();
    console.log('✅ Test task created:', testTask._id);
    
    // Read tasks
    const tasks = await Task.find();
    console.log(`✅ Found ${tasks.length} tasks in database`);
    
    // Clean up test task
    await Task.findByIdAndDelete(testTask._id);
    console.log('✅ Test task cleaned up');
    
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('\nTroubleshooting tips:');
    console.log('1. Make sure MongoDB is running');
    console.log('2. Check your connection string');
    console.log('3. For local MongoDB, run: mongod');
    console.log('4. For macOS with Homebrew: brew services start mongodb-community');
    process.exit(1);
  }
}

testConnection();