import React from "react";
import ShowData from "./ShowData";
import UTILS from "../utils/utils";
import "../credit.css";

const months = [
  "Month","January","February","March", "April","May","June","July", "August", "September",
  "October","November", "December",];

const years = [
  "Year",
  2020,2021,2022,2023,2024,2025, 2026,2027,2028,2029,2030,2031,2032,2033,2034,2035,];

export default class Credit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMonth: 0,
      selectedYear: 0,
      cardNumber: "",
      cvv: "",
      name: "",
      cardData: [],
      isUpdateIndex: false,
      // updateIndex: 0,
    };
  }

  componentWillMount() {
    const data = this.getLocalStorage();
    if (!data) {
      this.setLocalStorage([]);
    }
    this.setState({ cardData: data ? data : [] });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const localData = this.getLocalStorage();
    const {
      selectedMonth,
      selectedYear,
      cardNumber,
      cvv,
      name,
      isUpdateIndex,
    } = this.state;
    if (isUpdateIndex !== false) {
      localData[isUpdateIndex] = {
        selectedMonth,
        selectedYear,
        cardNumber,
        cvv,
        name,
      };
    } else {
      localData.push({ selectedMonth, selectedYear, cardNumber, cvv, name });
    }

    this.setLocalStorage(localData);
    this.setState({ cardData: localData, isUpdateIndex: false });
    this.resetCardDetails();
  };

  changeHandler = (name) => (e) => {
    this.setState({ ...this.state, [name]: e.target.value });
  };

  setLocalStorage(data) {
    localStorage.setItem("cardDetails", JSON.stringify(data));
  }
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("cardDetails"));
  }
  deleteHandler = (e, index) => {
    let data = this.state.cardData;
    data.splice(index, 1);
    this.setLocalStorage(data);
    this.setState({ cardData: data });
  };
  updateHandler = (e, index) => {
    let selectUpdate = this.state.cardData[index];
    const { selectedMonth, selectedYear, cardNumber, cvv, name } = selectUpdate;
    this.setState({
      selectedMonth,
      selectedYear,
      cardNumber,
      cvv,
      name,
      isUpdateIndex: index,
    });
  };
  resetCardDetails = () => {
    this.setState({
      selectedMonth: 0,
      selectedYear: 0,
      cardNumber: "",
      cvv: "",
      name: "",
    });
  };

  render() {
    const {
      selectedMonth,
      selectedYear,
      cardNumber,
      cvv,
      name,
      cardData,
      isUpdateIndex,
    } = this.state;

    const isMonth = Number(selectedMonth);
    const isYear = Number(selectedYear);
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h1 className="head">Payment Gateway</h1>
            <form className="form-group" onSubmit={this.handleSubmit}>
              <label htmlFor="cardNumber" className="label-edit">
                Card Number
              </label>

              <div className="card-container">
                <div className="card-type"></div>
                <input
                  placeholder="0000 0000 0000 0000"
                  required
                  type="text"
                  name="cardNumber"
                  id="cardNumber"
                  className="input-field"
                  value={cardNumber}
                  onChange={this.changeHandler("cardNumber")}
                  onKeyUp={(event) => UTILS.validation(event)}
                  maxLength={19}
                />
              </div>

              <label className="label-edit">Expiration Date</label>
              <select
                defaultValue={isMonth}
                selected={selectedMonth}
                className="input-sm input-field"
                onChange={this.changeHandler("selectedMonth")}
              >
                {months.map((month, index) => {
                  return (
                    <option
                      key={index}
                      value={index}
                      selected={isMonth === index}
                    >
                      {month}
                    </option>
                  );
                })}
              </select>
              <select
                defaultValue={isYear}
                className="input-sm input-field"
                onChange={this.changeHandler("selectedYear")}
              >
                {years.map((year, index) => {
                  return (
                    <option
                      key={index}
                      value={index}
                      selected={isYear === index}
                    >
                      {year}
                    </option>
                  );
                })}
              </select>
              <label
                htmlFor="cvv"
                className="label-edit"
                style={{ marginLeft: "40px" }}
              >
                CVC Code
              </label>
              <input
                type="number"
                required
                name="cvv"
                id="cvv"
                className="input-field cvv-field"
                placeholder="CVV/CVC"
                value={cvv}
                onChange={this.changeHandler("cvv")}
              /><br/>
              {/* <label
                htmlFor="cname"
                className="label-edit"
                style={{ display: "block" }}
              >
                Name on Card
              </label> */}
              <input
                type="text"
                name="cname"
                id="cname"
                className="input-field name"
                placeholder="Name on your card..."
                value={name}
                onChange={this.changeHandler("name")}
              /> 
               <br/><br/>
              {isUpdateIndex !== false ? (
                <button className="btn btn-warning">Update</button>
              ) : (
                <button className="btn btn-success">Proceed</button>
              )} 
              <button className="btn btn-danger" onClick={this.resetCardDetails}>
              Cancel
            </button>
            </form>
            
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-12">
            <ShowData
              data={cardData}
              months={months}
              years={years}
              deleteHandler={this.deleteHandler}
              updateHandler={this.updateHandler}
            />
          </div>
        </div>
      </div>
    );
  }
}
