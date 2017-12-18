import './Banner.css'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'antd-mobile';

export default class Banner extends Component {

    render() {
        return(
            <div
                className='tab'
                id="tabBanner"
            >
                <Carousel
                    dots={true}
                    autoplay
                    infinite={true}
                    selectedIndex={0}
                >
                    {
                        this.props.data.map(item => (
                            <Link
                                key={item.id}
                                to={{
                                    pathname: `${item.id}`
                                }}
                            >
                                <span className="bannerTitleBox">
                                <strong className='bannerTitle'>{item.title}</strong>
                                </span>
                                <img
                                    src={item.image}
                                    alt=""
                                />
                            </Link>
                        ))
                    }
                </Carousel>
            </div>
        )
    }
}
