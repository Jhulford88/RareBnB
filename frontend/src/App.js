import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage/index";
import CreateSpotPage from "./components/CreateSpotPage/index";
import SpotDetailPage from "./components/SpotDetailPage";
import ManageSpotsPage from "./components/ManageSpotsPage/index";
import UpdateSpotPage from "./components/UpdateSpotPage/index";
import MyBookingsPage from "./components/MyBookingsPage";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import SpotBookingsPage from "./components/SpotBookingsPage";
import Footer from "./components/Footer";
import CategoriesPage from "./components/CategoriesPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/spots/new" component={CreateSpotPage} />
          <Route
            exact
            path="/spots/categories/:category"
            component={CategoriesPage}
          />
          <Route exact path="/spots/current" component={ManageSpotsPage} />
          <Route
            exact
            path="/spots/bookings/:spotId"
            component={SpotBookingsPage}
          />
          <Route exact path="/spots/:id/edit" component={UpdateSpotPage} />
          <Route exact path="/spots/:id" component={SpotDetailPage} />
          <Route exact path="/bookings/:id" component={MyBookingsPage} />
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
