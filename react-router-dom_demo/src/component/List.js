import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class List extends Component {

  render() {

    return(
      <div>
        <p>列表</p>
        <ul>
          <li>
            <Link to="/view/1">联系人--张三</Link>
          </li>
          <li>
            <Link to="/view/2">联系人--李四</Link>
          </li>
          <li>
            <Link to="/view/3">联系人--王五</Link>
          </li>
          <li>
            <Link to="/view/4">联系人--马六</Link>
          </li>
        </ul>
      </div>
    )
  }
}
