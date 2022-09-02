import { Routes, Route} from 'react-router-dom'
import DetailMovie from './components/DetailMovie';
import Header from './components/Header';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/detail/:id' element={<DetailMovie/>}/>
      </Routes>
    </div>
  );
}

export default App;
