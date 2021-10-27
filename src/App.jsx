import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from './page/dashboard'
import Detail from './page/detail'

function App() {
  return (
    <MainLayout>
      <Router>
        <Switch>
          <Route path="/detail/:id" component={Detail} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </Router>
    </MainLayout>
  )
}

export default App
