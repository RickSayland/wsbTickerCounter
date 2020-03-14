import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import {LoadingBar} from './Components/LoadingBar'
import './App.css';

function App() {
  return (
    <div className="App">
      <Jumbotron fluid>
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

function OptionsCounters(props) {
    return <h3>
      <span><Badge variant="danger">PUTS: {props.puts}</Badge>{' '}</span>
<span><Badge variant="success">CALLS: {props.calls}</Badge>{' '}</span>
      </h3>;
}

function UrlBar(props) {
  return <div>
      <label htmlFor="basic-url">URL</label>
  <InputGroup className="mb-3">
    <FormControl id="basic-url" aria-describedby="basic-addon3" value="https://old.reddit.com/r/wallstreetbets/comments/fi5jtz/weekend_discussion_thread_march_1315_2020/"/>
    <UpdateButton/>
  </InputGroup>
</div>;
}

function UpdateButton(props) {
  return <div>
    <Button variant="primary">Update</Button>{' '}
</div>;
}

export default App;
