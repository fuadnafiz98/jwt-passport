import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import { AuthProvider } from "./context/AuthContext";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Magic from "./pages/Magic";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import SignOut from "./pages/Signout";

function App() {
  return (
    <div className="grid h-screen font-sans font-medium place-content-center">
      <div className="text-4xl font-black">🧁 React Starter</div>
      <TaskProvider>
        <Router>
          <AuthProvider>
            <div className="flex justify-center space-x-4 font-medium text-blue-400 ">
              <Link to="/">Home</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/magic">Magic</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/signin">Sign In</Link>
              <Link to="/signout">Sign Out</Link>
            </div>
            <Switch>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/magic">
                <Magic />
              </Route>
              <Route path="/signin">
                <SignIn />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/signout">
                <SignOut />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </AuthProvider>
        </Router>
      </TaskProvider>
    </div>
  );
}

export default App;
