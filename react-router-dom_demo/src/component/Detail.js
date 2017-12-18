import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Detail extends Component {

  constructor(props) {
      super(props)

      this.state = {
        details: [
          {id: 1,  content: '前端开是网站的前台代码实现，包括基本的HTML和CSS以及JavaScript/ajax，现在最新的高级版本HTML5、CSS3，以及SVG等。'},
          {id: 2,  content: 'H5只是前端的一个分支,主要来开发移动端展示'}
        ]
      }
  }

  render() {

    console.log(this.props.id,222);
    let detail = this.state.details.find( item => {
      return item.id == this.props.id;
    })
    return(
      <div>
        {
          detail ? (
            <p>{detail.content}</p>
          ) : <h3>该职业目前未收录详情</h3>
        }
      </div>
    )
  }
}
