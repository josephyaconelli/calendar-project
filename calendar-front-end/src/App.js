import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  Switch,
  Route
} from 'react-router-dom'
import { Main } from './components/calendar/Calendar'
import { CreateEvent } from './components/createEvent/CreateEvent'
import { Header } from './components/Header/Header'
import { Login } from './components/login/Login'
import { Register } from './components/register/Register'
import { SearchResults } from './components/searchResults/SearchResults'
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
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

        <Switch>
          <Route path='/search'>
            <SearchResults loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </Route>

          <Route path='/login'>
            <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </Route>

          <Route path='/register'>
            <Register loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </Route>

          <Route path='/edit'>
            <CreateEvent loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          </Route>


          <Route path ='/'>
            <Main />
          </Route>

        </Switch>

      </Router>
    </div>
  );
}

export default App;
