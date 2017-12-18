
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Detail from '../Detail/Detail'
import Main from '../Main/Main'

export default class App extends Component{


    render() {
        return(
            <Switch>
                <Route path="/:id" component={Detail}/>
                <Route path="/" component={Main}/>
            </Switch>
        )
    }
}
