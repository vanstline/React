import React, { Component } from 'react';
// import { Route, Switch } from 'react-router-dom';
import Scroll from '../../asstes/js/Scroll'
import Obj from '../../asstes/js/m.touch'
import axios from 'axios'
import Banner from '../Banner/Banner'
import List from '../List/List'

import './Main.css'
import './Home.css'
import './HomeLoad.css'


let Rgb = 0;
export default class Main extends Component{

    constructor(props) {
        super(props);

        this.state = {
            top_stories: [],
            stories: []
        }

        this.setH1Color = this.setH1Color.bind(this)
    }

    componentWillMount() {
        this.getNews()
    }

    componentDidMount(){
        Scroll(this)
    }

    // 动态更改标题的颜色
    setH1Color() {
        var nub = Obj.css( this.refs.Home,'translateY');
        if(nub < 0) {
            Rgb = Number((Math.abs(nub)/100).toFixed(1))
        } else {
            Rgb = 0;
        }
        if(Rgb >= 1) {
            Rgb = 1;
        }
        this.refs.title.style.background = 'rgba(62, 209, 255, '+ Rgb +')';
    }

    getNews() {
        axios.get('https://zhihu-daily.leanapp.cn/api/v1/last-stories')
            .then( res => {
                // console.log(res.data);
                setTimeout( () => {
                    this.setState({
                    top_stories: res.data.STORIES.top_stories,
                    stories: res.data.STORIES.stories
                    })
                })
            })
            .catch( () => {
                alert('请求失败')
            })
    }

    render() {

        function bannerRender(data) {
            if(data.length) {
                return (
                    <div>
                        <Banner data={data} />
                    </div>
                )
            }
        }

        function listRender(data) {
            if(data.length) {
                return (
                    <div>
                        <List data={data} />
                    </div>
                )
            }
        }

        return(
            <div style={{
                height: '100vh'
            }} className="main">
                <div id="header" ref='title'>今日热闻</div>
                <div id="wrap">
                    <div
                        id="Home"
                        ref='Home'
                        onTouchMove={this.setH1Color}>
                        <div id="load">
                            <span className="loadImg"></span>
                            <span className="loadImg2"></span>
                            <span className="loadText">下拉刷新</span>
                        </div>
                        <div className='cont'>
                            {bannerRender(this.state.top_stories)}
                            {listRender(this.state.stories)}
                        </div>
                        <div id="footerLoad">
                            <span className="footLoadImg"></span>
                            <span className="footLoadImg2"></span>
                            <span className="footLoadText">加载更多</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
