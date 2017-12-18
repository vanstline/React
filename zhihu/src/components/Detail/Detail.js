import React, { Component } from 'react';
// import { Route, Switch } from 'react-router-dom'
import axios from 'axios';
import DetailShow from './DetailShow'

import './Detail.css'

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {content:''};
  }
  componentWillMount(){
    let id = this.props.match.params.id;
    axios.get(`https://zhihu-daily.leanapp.cn/api/v1/contents/${id}`)
    .then(res => {
      this.setState({content:res.data.CONTENTS})
    })
  }

  render() {
    return (
      <div className="detail">
        {
          <DetailShow data={this.state.content}/>
        }
      </div>
    )
  }
}
