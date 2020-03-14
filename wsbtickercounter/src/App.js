import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import {LoadingBar} from './Components/LoadingBar'
import {OptionsCounters} from './Components/OptionsCounters'
import {wsb} from './scripts/wsb'
import './App.css';

var puts = 0;
var calls = 0;

function App() {
  return (
    <div className="App">
      <Jumbotron>
        <Container>
          <Title emoji="🐻"/>
          <UrlBar data=""/>
          <OptionsCounters/>
          <LoadingBar percent="60"/>
        </Container>
      </Jumbotron>
    </div>
  );
}

function Title(props) {
  return <h1>WSB Ticker Counter {props.emoji}</h1>;
}



function UrlBar(props) {
  return <div>
      <label htmlFor="basic-url">URL</label>
  <InputGroup className="mb-3">
    <FormControl id="basic-url" aria-describedby="basic-addon3" defaultValue="https://old.reddit.com/r/wallstreetbets/comments/fi5jtz/weekend_discussion_thread_march_1315_2020/"/>
    <UpdateButton/>
  </InputGroup>
</div>;
}
 
function UpdateButton(props) {

  function handleClick(e) {
    //e.preventDefault();
    console.log('The link was clicked.');
    wsb.getTickers("https://old.reddit.com/r/wallstreetbets/comments/fi5jtz/weekend_discussion_thread_march_1315_2020/")
    .then(() => {
      console.log("total comments parsed: " + wsb.comment_ids.length);
      debugger;
      //Update some labels
      OptionsCounters.update(wsb.puts, wsb.calls);
      OptionsCounters.render();

  });
  }

  return <div>
    <Button variant="primary" onClick={handleClick}>Update</Button>{' '}
</div>;
}

export default App;
