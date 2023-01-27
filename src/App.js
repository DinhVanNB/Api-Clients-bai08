import {HashRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Infomation from './components/Infomation';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/edit/:bookId' element={<Infomation/>}/>
        <Route path='/add' element={<Infomation/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
