import React, {useState} from 'react';
import './App.css';
import Footer from 'layouts/Footer';

function App() {

  const [value, setValue] = useState<string>('');

  return (
    <>
      <Footer />    
    </>
  );
}

export default App;
