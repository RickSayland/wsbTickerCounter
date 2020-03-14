import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import ProgressBar from 'react-bootstrap/ProgressBar';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Jumbotron fluid>
        <Container>
          <Title emoji="🐻"/>
          <UrlBar data=""/>
          <LoadingBar/>
          <OptionsCounter type="Puts"/><OptionsCounter type="Calls"/>
        </Container>
      </Jumbotron>
    </div>
  );
}

function Title(props) {
  return <h1>WSB Ticker Counter {props.emoji}</h1>;
}

function LoadingBar(props) {
  return <div><ProgressBar striped variant="info" now={20} /></div>;
}

function OptionsCounter(props) {
  if (props.type.toLocaleLowerCase() == "puts"){
    return <div><Badge variant="danger">{props.type}</Badge>{' '}</div>;
  }
  if (props.type.toLocaleLowerCase() == "calls"){
    return <div><Badge variant="success">{props.type}</Badge>{' '}</div>;
  }
  else return <div></div>;
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
