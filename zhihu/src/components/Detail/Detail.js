import React, { Component } from 'react';
// import { Route, Switch } from 'react-router-dom'
import axios from 'axios';
import DetailShow from './DetailShow'

import './Detail.css'

let content = '';
export default class Detail extends Component{

    render() {
        let id = this.props.match.params.id;
        console.log(id);
        function get() {
            axios.get(`https://zhihu-daily.leanapp.cn/api/v1/contents/${id}`)
                .then( res => {
                    console.log(res.data);
                    // alert( typeof res.data.CONTENTS.body)
                    content = res.data.CONTENTS;
                    // content = res.data.CONTENTS.body;
                    // console.log(content,2222);
                })
                .catch( () => {
                    console.log("请求失败");
                }
            )
        }

        get()

        function show(content){
            if(content != '') {
                return <DetailShow data={content}/>
            }
        }

        return (
            <div className="detail">
                {
                    show(content)
                    // MyComponent()
                }
            </div>
        )
    }
}
