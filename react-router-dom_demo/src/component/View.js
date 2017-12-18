import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Detail from './Detail'

export default class List extends Component {

  constructor(props) {
      super(props)

      this.state = {
        users: [
          {id: 1,  username: '张三', job: 'web前端'},
          {id: 2,  username: '李四', job: 'H5工程师'},
          {id: 3,  username: '王五', job: 'java工程师'},
        ]
      }
  }

  render() {
    let id = this.props.match.params.id;

    // 通过 match.params.id  来匹配对应显示的数据
    let user = this.state.users.find( user => {
      return user.id == id;
    })


    return(
      <div>
        {
          // 根据如果没有用户信息时,展示提醒文字
          user ? (
            <div>
              <dl>
                <dt>ID:</dt>
                <dd>{user.id}</dd>
                <dt>姓名:</dt>
                <dd>{user.username}</dd>
                <dt>性别:</dt>
                <dd>{user.job}</dd>
                {/* 展示用户详情 */}
                <Detail id={id} />
              </dl>

            </div>
          ) : <h2>没有该用户信息!!!</h2>
        }
      </div>
    )
  }
}
