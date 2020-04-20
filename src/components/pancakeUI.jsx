import React from "react";
import "./pancake.css";

export class PancakeUI extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pancakeCount: "",
      pancakeDataArray: [],
      delaytime: "",
      errorText: "",
    };
  }

  getRandom = () => {
    const { pancakeCount, delaytime } = this.state;
    debugger;
    if (
      pancakeCount < 2 ||
      pancakeCount > 50 ||
      pancakeCount === 0 ||
      parseInt(pancakeCount) === NaN
    ) {
      this.setState({ errorText: "Please enter any number between 2 and 50" });
    } else if (delaytime === "") {
      this.setState({ errorText: "Please enter time in ms" });
    } else {
      let labelsNew = [];

      for (let i = 1; i <= pancakeCount; i++) {
        labelsNew.push(`${i}`);
      }

      let shuffledArray = labelsNew
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);

      this.setState({ pancakeDataArray: shuffledArray, errorText: "" });
    }
  };

  setValue = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  resetData = () => {
    this.setState({
      pancakeDataArray: [],
      labels: [],
      delaytime: 0,
      pancakeCount: 0,
    });
  };

  pancakeSort = () => {
    const { pancakeDataArray, delaytime } = this.state;

    let arr = pancakeDataArray;
    let counter = 1;
    for (let i = arr.length - 1; i >= 1; i--) {
      counter++;

      setTimeout(() => {
        let maxIndex = 0;
        let max = arr[0];
        for (let j = 1; j <= i; j++) {
          if (arr[j] > max) {
            max = arr[j];
            maxIndex = j;
          }
        }

        if (maxIndex === i) return;

        let newSlice;

        if (maxIndex > 0) {
          newSlice = arr.slice(0, maxIndex + 1).reverse();
          for (let j = 0; j <= maxIndex; j++) arr[j] = newSlice[j];
        }

        newSlice = arr.slice(0, i + 1).reverse();
        for (let j = 0; j <= i; j++) arr[j] = newSlice[j];

        console.log(arr);

        if (i === 1 && maxIndex === 0) {
          const diff = arr.length - 9;
          const b = arr.splice(1, diff);
          arr = arr.concat(b);
          window.alert("sorted");
        }

        this.setState({
          pancakeDataArray: arr,
        });
        this.forceUpdate();
      }, counter * delaytime);
    }
  };

  render() {
    const { pancakeDataArray, errorText, pancakeCount, delaytime } = this.state;

    return (
      <div>
        <h2>Pancake Sorting Algoritham</h2>

        <span className="main-margin">
          <label>Number of Pancakes: </label>
          <input
            name="pancakeCount"
            className="input-field"
            onChange={this.setValue}
            value={pancakeCount}
            type="number"
            min="2"
            max="50"
          />
        </span>
        <span style={{ margin: "10px", width: "100%" }}>
          <label> Time: </label>
          <input
            name="delaytime"
            className="input-field"
            placeholder="milliseconds"
            onChange={this.setValue}
            value={delaytime}
            type="number"
            min="100"
            max="5000"
          />
        </span>

        {pancakeDataArray.length === 0 ? (
          <button className="btn-main-style" onClick={() => this.getRandom()}>
            Show Pancakes
          </button>
        ) : (
          <button className="btn-main-style" onClick={() => this.pancakeSort()}>
            Sort
          </button>
        )}
        <button
          onClick={() => this.resetData()}
          className="btn-main-style margin-10"
        >
          Reset
        </button>
        {errorText !== "" && <h4 className="danger"> {errorText}</h4>}

        {pancakeDataArray.length > 0 &&
          pancakeDataArray.map((p, key) => (
            <div
              className="center-div"
              key={p}
              style={{
                width: p * 50,
              }}
            >
              {p}
            </div>
          ))}
      </div>
    );
  }
}

export default PancakeUI;
