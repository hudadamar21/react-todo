import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const Dasboard =  lazy(() => import("./page/dashboard"))
const Detail =  lazy(() => import("./page/detail"))

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/detail/:id">
            <Detail />
          </Route>
          <Route path="/">
            <Dasboard />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
