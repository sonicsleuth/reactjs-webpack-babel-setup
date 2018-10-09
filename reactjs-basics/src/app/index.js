import React from 'react';
import ReactDOM from 'react-dom';

function Welcome(props) {
    return <h1>Hello, {props.firstName + ' ' + props.lastName}</h1>
  }

function Confirmation() {
    return <p>It's working if you are seeing this output from ReactJS.</p>
}

function App() {
    return (
    <div>
      <Welcome firstName="Robert" lastName="Smith" />
      <Confirmation />
    </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
