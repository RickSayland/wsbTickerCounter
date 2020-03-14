import React from 'react';
import Badge from 'react-bootstrap/Badge';
export class OptionsCounters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            puts: 0,
            calls: 0
        };
      }


      update(p,c) {
        this.setState({puts: p});
        this.setState({calls: c});
      }

    render() {
      return (
        <h3>
            <span><Badge variant="danger">PUTS: {this.state.puts}</Badge>{' '}</span>
            <span><Badge variant="success">CALLS: {this.state.calls}</Badge>{' '}</span>
        </h3>
      );
    }
  }