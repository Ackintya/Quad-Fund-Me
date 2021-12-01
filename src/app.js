import React, {useEffect} from 'react';
import {init} from './Web3Client'

function App(){
  //const providerUrl = process.env.PROVIDER_URL || 'http://localhost:8545';
  useEffect(() => {
    init();
  }, []);

  return <div className="App"></div>
}

export default App;