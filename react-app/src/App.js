import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import { useSelector } from "react-redux";
import SplashPage from "./components/SplashPage";
import FeedPage from "./components/FeedPage";
import Card from "./components/Card";

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(authenticate()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <>
            {sessionUser && <Navigation isLoaded={isLoaded} />}
            {isLoaded && (
                <Switch>
                    <Route path="/">
                        {/* {!sessionUser ? <SplashPage /> : <FeedPage/>} */}
                        <Card/>
                    </Route>
                    <Route path="/login">
                        <LoginFormPage />
                    </Route>
                    <Route path="/signup">
                        <SignupFormPage />
                    </Route>
                </Switch>
            )}
        </>
    );
}

export default App;
