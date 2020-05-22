import React from "react";

export default class ShowData extends React.Component {
  expireDate = (m, y) => {
    const { months, years } = this.props;
    return `${months[m]} / ${years[y]}`;
  };
  render() {
    const { data } = this.props;
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Card Number</th>
            <th>Expiry Date</th>
            <th>CVC code</th>
            <th>Name on Card</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody class="">
          {data.length > 0 ? (
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.cardNumber}</td>
                  <td>
                    {this.expireDate(item.selectedMonth, item.selectedYear)}
                  </td>
                  <td>{item.cvv}</td>
                  <td>{item.name}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={(e) => this.props.deleteHandler(e, index)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={(e) => this.props.updateHandler(e, index)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                {" "}
                No Result Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}
