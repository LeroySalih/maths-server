import React, {useContext, useState, useEffect} from 'react';
import AppContext from '../app/app-context';

import FirebaseContext from '../firebase';

export default () => {

  const [connected, setConnected] = useState(false);

  const firebase = useContext(FirebaseContext);
  const app = useContext(AppContext);

  useEffect(()=>{

    firebase.messages().on('value', (snapshot) => {

      setConnected(true);
    })
  }, [firebase])
  
return <div>
  {connected && <span>Connected <span>{app.test}</span></span>}
  {!connected && <span>Not Connected</span>}
</div>
}