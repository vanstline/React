
import './List.css';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class List extends Component {

    render() {
        return(
            <div>
                <ul className='list'>
                    {
                        // console.log(this.props.data)
                        this.props.data.map(item => (
                                <li
                                    key={item.id}
                                    >
                                    <Link
                                        className='newsList'
                                        to={{
                                            pathname: `${item.id}`
                                        }}
                                        >
                                        <strong>{item.title}</strong>
                                        <img src={item.images ? item.images[0] : item.image} />
                                    </Link>
                                </li>
                            )
                        )
                    }

                </ul>
            </div>
        )
    }
}
