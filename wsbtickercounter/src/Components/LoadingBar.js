import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
export function LoadingBar(props) {
    return <div><ProgressBar striped variant="info" now={props.percent} /></div>;
}