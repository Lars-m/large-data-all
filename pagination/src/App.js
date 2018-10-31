import React, { Component } from 'react';

class App extends Component {
  state = { names: [],msg:"" }
  async componentDidMount() {
    console.time("fetching");
    this.setState({msg:"Loading..."})
    const names = await fetch("http://localhost:1234/api").then(res => res.json());
    console.timeEnd("fetching");

    console.time("rendering");
    this.setState({ names, msg:"" })
  }
  componentDidUpdate() {
    console.timeEnd("rendering");
  }
  render() {
    const n = this.state.names.map((n, i) => <li key={i}>{n.id}, {n.firstName} {n.lastName}</li>)
    return (
      <div>
      <h2>Render ALL on Client</h2>
      {this.state.msg}
        <ul>
          {n}
        </ul>
      </div >
    )
  }
}

export default App;