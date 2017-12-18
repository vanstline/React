import React, { Component } from 'react';
import Home from './component/Home';
import List from './component/List';
import Concat from './component/Concat';
import ConcatJob from './component/ConcatJob';
import ConcatWork from './component/ConcatWork';
import View from './component/View';
import User from './component/User';

import { Route, Link, NavLink, Redirect, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <h1>React Router</h1>
        <input type="text" />

        <div>
          <NavLink activeClassName="active-custom" exact to='/'>首页</NavLink>
          <span> | </span>
          <NavLink to='/list'>列表</NavLink>
          <span> | </span>
          <NavLink to='/concat'>联系</NavLink>
          <span> | </span>
          <NavLink to='/user'>个人中心</NavLink>
        </div>

        {/* 渲染 Nav 层 */}
        <div>
          <Route path='/' exact component={Home} />
          <Route path='/list'component={List} />

          {/* Switch 用来渲染匹配到的唯一组件 在 Concat 这里例子中 们可以使用 Switch 也可以使用常规的 Route + exact  也可以实现 */}
          <Switch>
            <Route path="/concat/job" component={ConcatJob} />
            <Route path="/concat/work" component={ConcatWork} />
            <Route path="/concat" component={Concat} />
          </Switch>

          {/* 这里的 view 根据 传入的不通 ID 来渲染不同的内容 */}
          <Route path='/view/:id' component={View}/>

          <Route path='/user' render={
            () => {
              if(true) {
                // setTimeout(() => {
                  return ( <h2>用户信息中心</h2>)
                // }, 2000)
              } else {
                // 当不匹配的时候,  就重定向到 首页
                return <Redirect to='/' />
              }
            }
          } />
        </div>
      </div>
    );
  }
}

export default App;
