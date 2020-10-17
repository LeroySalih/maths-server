import React, {useContext} from 'react'
import AppContext from '../app/app-context';

export default () => {
  const app = useContext(AppContext);
return <div>{app && app.user && app.user.displayName}</div>
}