import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Dasboard from "./page/dashboard"
import Detail from "./page/detail"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/detail/:id">
          <Detail />
        </Route>
        <Route path="/">
          <Dasboard />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
