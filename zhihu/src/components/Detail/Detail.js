import React, { Component } from 'react';
// import { Route, Switch } from 'react-router-dom'
import axios from 'axios';
import DetailShow from './DetailShow'

import './Detail.css';
import './DetailNav.css'

export default class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {content:''};

    this.back = this.back.bind(this)
  }
  componentWillMount(){
    let id = this.props.match.params.id;
    axios.get(`https://zhihu-daily.leanapp.cn/api/v1/contents/${id}`)
    .then(res => {
      this.setState({content:res.data.CONTENTS})
    })
  }

  back() {
      this.props.history.goBack();
  }

  render() {
    return (
      <div className="detail">
        {
          <DetailShow data={this.state.content}/>
        }
        <ul className="navBtn">
            <li
                className='back'
                onClick={this.back}
                >返回</li>
            <li>下一条</li>
            <li>点赞</li>
            <li>分享</li>
            <li>评论</li>
        </ul>
      </div>
    )
  }
}
