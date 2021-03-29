import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <ul>
          <li>
            <Link to="/">랜딩</Link>
          </li>
          <li>
            <Link to="/register">회원가입</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
