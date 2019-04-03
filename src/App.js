import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {value: '{}'};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  printEnd = (path, value) => {
    if (value === null) {
      return '.body("' + path + '", nullValue())';
    }

    let preparedValue = value;

    if(typeof value === "string") {
      preparedValue = "\"" + value + "\"";
    }

    return '.body("' + path + '", equalTo(' + preparedValue + '))';
  };

  printArray = (path, jsonArray) => {
    if (path === null || path === "undefined" || path === "") {
      path = "";
    }

    return jsonArray.map((value, index) => {
      console.log(value);
      return <div>
        {this.print(path + "[" + index + "]", value)}
      </div>
    })
  };

  printObject = (path, jsonObject) => {
    if (path === null || path === "undefined" || path === "") {
      path = "";
    } else {
      path = path + ".";
    }
    return Object.keys(jsonObject).map((key) =>
        <div>
          {this.print(path + key,jsonObject[key])}
        </div>)
  };

  print = (path, value) => {
    if (this.typeElement(value) === "array") {
      return this.printArray(path, value);
    } else if (this.typeElement(value) === "object") {
      return this.printObject(path, value);
    } else {
      return this.printEnd(path, value);
    }
  };

  /**
   typeof undefined // "undefined"
   typeof 0 // "number"
   typeof true // "boolean"
   typeof "foo" // "string"
   typeof Symbol("id") // "symbol"
   typeof Math // "object"  (1)
   typeof null // "object"  (2)
   typeof alert // "function"  (3)
   */
  typeElement = (object) => {
    if ( Array.isArray(object)) {
      return "array";
    } else if (object === null || object === undefined) {
      return "null";
    }else {
      return typeof object;
    }
  };

  render() {
    var list = null;
    var jsonObject = null
    try {

     jsonObject = JSON.parse(this.state.value);
     list = this.print("", jsonObject);
    } catch (e) {
      list = <div>not valid json</div>
    }
//<button type="button" className="btn btn-outline-success" onClick={() => {navigator.clipboard.writeText(list)}}>Copy</button>
    return (
      <div className="App">
        <form>
          <label>
            JSON Object:
            <input type="textarea" value={this.state.value} onChange={this.handleChange} />
            <button type="button" className="btn btn-outline-success" onClick={() => this.setState({value: "{}"})}>Clean</button>
          </label>
        </form>

        <div>{list}</div>
      </div>
    );
  }
}

export default App;
