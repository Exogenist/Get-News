// I apologize for this terrible code but it works... for now
// The problem is I'm not using states or life cycles so the entire
// page rereshes instead of updating select elements
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

//===========================================
// Code for dynamically writing search to fetch -1 ApiCall
//===========================================
const key = "apiKey=6c6b71cbab324fbd82b11f2c79e14456";
const url = function(endpoint, country, key) {
  return endpoint + country + key;
};
const req = new Request(
  url("https://newsapi.org/v2/top-headlines?", "country=us&", key)
);

const urlSearch = function(val) {
  return (
    "https://newsapi.org/v2/everything?" +
    "q=" +
    val +
    "&" +
    "from=2018-07-28&" +
    "language=en&" +
    "sortBy=popularity&" +
    key
  );
};
//end


//===========================================
//Grabs top 5 articles from news Api - the code needs refactoring
//===========================================

// Async Api Grab.
function initialFetch(request) {
    fetch(request)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);

    // Builds UI based on data object Grabbed from Api.
    class NewsCard extends React.Component {
      render() {
        return (
          <div className="dimention-news-card media col-lg-6 ">
            <div className="inner-container">
              <img
                className="mr-3 img-size"
                src={data.articles[this.props.name].urlToImage}
                alt="test"
              />
              <div className="media-body">
                <h4 className="mt-0 card-title">
                  {data.articles[this.props.name].title}
                </h4>
                <p className="mt-1">
                  {data.articles[this.props.name].description}
                </p>
                <a
                  className="btn btn-primary"
                  href={data.articles[this.props.name].url}
                  target="_blank"
                >
                  {data.articles[this.props.name].source.name}
                </a>
              </div>
            </div>
          </div>
        );
      }
    }

    let arrFunc = function() {
      let temp = [];
      for (var i = 0; i < data.articles.length; i++) {
        temp.push(<NewsCard name={i} key={i} />);
      }
      return temp;
    };

    let arr = arrFunc();

    function News() {
      return (
        <div className="row">
          {arr.map(function(comp) {
            return comp;
          })}
        </div>
      );
    }

    class RunApp extends React.Component {
      render() {
        return (
          <div className="container">
            <Search />
            <News />
          </div>
        );
      }
    }

    ReactDOM.render(<RunApp />, document.getElementById("root"));
    registerServiceWorker();
  });
}
initialFetch(req);





class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    let reqSearch = new Request(urlSearch(this.state.value))
    initialFetch(reqSearch);
    e.preventDefault();
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <input
            className="form-control mr-sm-2"
            placeholder="search"
            type="search"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            search
          </button>
        </form>
      </nav>
    );
  }
}






































//===========================================
// Code for dynamically writing search to fetch -1 ApiCall
//===========================================
const key = "apiKey=6c6b71cbab324fbd82b11f2c79e14456";

const url = function(endpoint, country, key) {
    return endpoint + country + key;
};

const req = new Request(
    url("https://newsapi.org/v2/top-headlines?", "country=us&", key)
);

const urlSearch = function(val) {
    return (
        "https://newsapi.org/v2/everything?" +
        "q=" +
        val +
        "&" +
        "from=2018-07-28&" +
        "language=en&" +
        "sortBy=popularity&" +
        key
    );
};
//end




class MainFrame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            getData: [],
            isLoaded: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handleSubmit(e) {
//        console.log(this.state.getData(urlSearch(e)));
        this.state.currentData = this.state.getData(urlSearch(e));
        e.preventDefault();

    }

    componentDidMount() {
                fetch(req)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(data) {
                         this.setState({isLoaded: true});
                    console.log(data)
                    });

    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-light">
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <input
                        className="form-control mr-sm-2"
                        placeholder="search"
                        type="search"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                    <button
                        className="btn btn-outline-success my-2 my-sm-0"
                        type="submit"
                    >
                        search
                    </button>
                </form>
            </nav>

            </div>

        );
    }
}

