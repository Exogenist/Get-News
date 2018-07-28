import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const key = 'apiKey=6c6b71cbab324fbd82b11f2c79e14456';
const url = function (endpoint, country, key) {
    return endpoint + country + key;
};
const req = new Request(url('https://newsapi.org/v2/top-headlines?', 'country=us&', key));

const urlSearch = 'https://newsapi.org/v2/everything?' +
          'q=prince+harry&' +
          'from=2018-07-28&' +
          'language=en&' +
          'sortBy=popularity&' +
          key;

const reqSearch = new Request(urlSearch);



fetch(reqSearch).then(function (response) {
    return response.json();
}).then(function (data) {
    console.log(data);


    class NewsCard extends React.Component {
        render() {
            return (
                <div className="dimention-news-card media col-lg-6 ">
                  <div className="inner-container">
                      <img className="mr-3 img-size" src={data.articles[this.props.name].urlToImage } alt="test"/>
                   <div className="media-body">
                       <h4 className="mt-0 card-title">{data.articles[this.props.name].title }</h4>
                       <p className="mt-1">{data.articles[this.props.name].description}</p>
                       <a className="btn btn-primary" href={data.articles[this.props.name].url} target="_blank">{data.articles[this.props.name].source.name}</a>
                   </div>
                  </div>

                </div>
            )
        }
     };

    let arrFunc = function(){
        let temp = [];
        for(var i = 0; i < data.articles.length; i++) {
           temp.push(<NewsCard name={i} key ={i} />)
        }
        return temp;
    };

    const arr = arrFunc()

    class Lesson1 extends React.Component {

        render() {
            return (
                <div className="container">
                     <div className="row">
                            {arr.map(function(comp){
                                return comp
                            })}
                     </div>

                </div>
            )
        }
    };

    ReactDOM.render( < Lesson1 / > , document.getElementById('root'));
    registerServiceWorker();
});