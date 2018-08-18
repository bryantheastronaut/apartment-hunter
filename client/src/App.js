import React from 'react';
import Card from '@material-ui/core/Card';
import 'whatwg-fetch';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      price: 1700,
      minLat: null,
      maxLat: null,
      minLong: null,
      maxLong: null,
      query: '',
      data: [],
    }
  }

  componentDidMount() {
    this.getListings();
  }

  async getListings() {
    const { price, minLat, minLong, maxLat, maxLong, query } = this.state;
    const body = {};
    if (price) body.price = price;
    if (minLat) body.minLat = minLat;
    if (minLong) body.minLong = minLong;
    if (maxLat) body.maxLat = maxLat;
    if (maxLong) body.maxLong = maxLong;
    if (query) body.query = query;
    fetch('/api/getListings', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    })
      .then(res => res.json())
      .then(({ data }) => { if (data) this.setState({ data }); });
  }

  renderCard(list) {
    return (
        <Card className="cardStyle" key={list.PostingURL}>
          <p className="title">${list.Ask}: {list.PostingTitle}</p>
          {list.ImageThumb && <img src={list.ImageThumb} />}
          <h4><a href={list.PostingURL} target="_blank">more info.</a></h4>
        </Card>
    )
  }

  render() {
    return (
      <div className="container">
        <h4>{this.state.data.length ? `${this.state.data.length} results found` : 'no results found.'}</h4>
        <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
          {this.state.data.map(list => this.renderCard(list))}
        </div>
      </div>
    );
  }
}

export default App;