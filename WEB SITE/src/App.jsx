  // src/App.jsx
  import React, { useEffect, useState } from "react";
  import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
  import Lander from "./login/Lander";
  import Dashboard_victim from "./dashboard/Dashboard_victim";
  import Dashboard_police from "./dashboard/Dashboard_police";
  import Dashboard_bank from "./dashboard/Dashboard_bank";
  import Dashboard_court from "./dashboard/Dashboard_court";
  import { post } from "./Rest";

  const App = () => {
    const [cookie, setCookie] = useState(document.cookie);
    const [isAuthenticated, setIsAuthenticated] = useState(!!cookie);
    const [role, setRole] = useState(false);
    
    useEffect(() => {
      (async()=>setRole(await post('findusertype')))()
      setIsAuthenticated(!!cookie);
    }, [cookie]);

    return (  
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Lander changecookie={setCookie} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <>
                {role == "Victim" && <Dashboard_victim />}
                {role == "Police" && <Dashboard_police />}
                {role == "Bank" &&   <Dashboard_bank />}
                {role == "Court" &&  <Dashboard_court />}
              </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<>Not Found</>} />
        </Routes>
      </Router>
    );
  };

  export default App;
