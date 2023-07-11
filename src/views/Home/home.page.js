import '../../App.css';
import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { changeName } from '../../redux/app/appSlice';

const App = () => { 
    const {name} = useSelector((state)=>state.app);
    const dispatch = useDispatch();
    return (
      <>
      <input type="text" onChange={(e)=>dispatch(changeName(e.target.value))}/>
      <button className='btn btn-primary btn-sm'>{name}</button>
      </>
    );
}
 
export default App;