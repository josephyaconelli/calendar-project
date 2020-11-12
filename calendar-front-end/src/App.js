import { Main } from './components/calendar/Calendar'
import React from 'react'

var d = new Date(2020, 10, 24)
const myEvent1 = {
  start: new Date(2020,10, 24, 10),
  end: new Date(2020,10, 24, 12),
  title: 'Birthday',
  info: 'birthday part time!'
}
const myEvent2 = {
  start: new Date(2020,10, 24, 13),
  end: new Date(2020,10, 24, 15),
  title: 'Holidy',
  info: 'Fun fun fun'
}

const myEvent3 = {
  start: new Date(2020,10,8),
  end: new Date(2020,10,8),
  title: 'Party',
  info: 'Fun fun fun'
}

const myEvent4 = {
  start: new Date(2020,10,1,12,30),
  end: new Date(2020,10,4,18,25),
  title: 'Vacation',
  info: 'Fun fun fun'
}

function App() {
  return (
    <div className="App">
      <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
            integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
            crossorigin="anonymous"
            />
      <Main events={[myEvent1, myEvent2, myEvent3, myEvent4]} />
    </div>
  );
}

export default App;
