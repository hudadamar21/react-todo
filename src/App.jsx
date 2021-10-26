import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Dashboard from './page/dashboard'
import Detail from './page/detail'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/detail/:id" component={Detail} />
        <Route path="/" component={Dashboard} />
      </Switch>
    </Router>
  )
}

export default App
