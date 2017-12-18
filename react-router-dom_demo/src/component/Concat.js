import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Concat extends Component {

  render() {

    return(
      <p>
        <span>联系</span>
        <span> - </span>
        <Link to="/concat/job">工作</Link>
        <span> - </span>
        <Link to="/concat/work">作品</Link>
      </p>
    )
  }
}
