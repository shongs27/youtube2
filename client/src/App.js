import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Auth from "./hoc/hoc";
import Footer from "./components/Footer/Footer";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import NavBar from "./components/NavBar/NavBar";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import UploadVideoPage from "./components/UploadVideoPage/UploadVideoPage";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <NavBar />
        {/*****css 자리잡게 하는 꽃과 같은 코드 */}
        <div style={{ paddingTop: "120px", minHeight: "calc(100vh - 80px)" }}>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route
              exact
              path="/register"
              component={Auth(RegisterPage, false)}
            />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route
              exact
              path="/video"
              component={Auth(UploadVideoPage, true)}
            />
          </Switch>
        </div>
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
