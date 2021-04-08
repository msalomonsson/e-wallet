import React from "react";
import { Route, Switch } from "react-router";
import "./App.scss";
import AddCard from "./components/addcard/AddCard";
import Home from "./components/home/Home";
import { getUser } from "./components/card/cardSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <div className="App"></div>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/addcard">
          <AddCard />
        </Route>
      </Switch>
    </>
  );
};

export default App;
