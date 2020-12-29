import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  Switch,
  Route
} from 'react-router-dom'
import CalendarContainer from './components/calendar/CalendarContainer'
import CreateEventContainer from './components/createEvent/CreateEventContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import LoginContainer from './components/login/LoginContainer'
import { Register } from './components/register/Register'
import SearchResultsContainer from './components/searchResults/SearchResultsContainer'
import { getCookie, setCookie } from './utils/utils'

const myEvent4 = {
  start: new Date(2020,10,1,12,30),
  end: new Date(2020,10,4,18,25),
  title: 'Vacation',
  info: 'Fun fun fun'
}

// const useQuery = () => {
//   return new URLSearchParams(useLocation().search);
// }

function App() {
  //let query = useQuery()

  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        crossOrigin="anonymous"
        />
      <Router>
        <HeaderContainer />

        <Switch>
          <Route path='/search'>
            <SearchResultsContainer />
          </Route>

          <Route path='/login'>
            <LoginContainer />
          </Route>

          <Route path='/register'>
            <Register loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </Route>

          <Route path='/edit'>
            <CreateEventContainer />
          </Route>

          <Route path ='/'>
            <CalendarContainer />
          </Route>

        </Switch>

      </Router>
    </div>
  );
}

export default App;
