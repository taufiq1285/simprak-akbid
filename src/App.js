import { auth } from './firebase/config/firebase';

function App() {
  console.log('Firebase Auth initialized:', auth ? 'Success' : 'Failed');
  
  return (
    <div>
      <h1>SIMPRAK AKBID</h1>
      <p>Firebase setup completed</p>
    </div>
  );
}

export default App;