import react from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Addstudent from './pages/Addstudent';
import Student from './pages/Student';
import EditStudent from './pages/EditStudent';

function App() {
  return (

    <Router>
      <Switch>
        <Route exact path="/" component={Student}/>
        <Route path="/add-student" component={Addstudent}/>
        <Route path="/edit-student/:id" component={EditStudent}/>
      </Switch>
    </Router>
  );
}

export default App;
