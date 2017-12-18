import React, { Component } from 'react';
import './Detail.css';
import './DetatilTitel.css'

export default class DetailShow extends Component {

    render(){
        // console.log(this.props.data);
        // alert(this.props.data.image)
        let data = this.props.data;

        function createMarkup() {
            // console.log(data);
            return {__html: data.body};
        }

        function MyComponent() {
            return <div dangerouslySetInnerHTML={createMarkup()} />;
        }

        return (
            <div className="DetailShow">
                <div className="newsTilte">
                    <img src={this.props.data.image} />
                    <div className="mask">
                        <h2>{this.props.data.title}</h2>
                        <span>图片: {this.props.data.image_source}</span>
                    </div>
                </div>
                <div className="DetailCont">
                    {MyComponent()}
                </div>
            </div>
        )
    }
}
