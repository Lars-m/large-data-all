import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

const columns = [{
  dataField: 'id',
  text: 'ID'
},
{
  dataField: 'gender',
  text: 'Gender',
  sort: true,
  filter: textFilter()
},
{
  dataField: 'firstName',
  text: 'First Name',
  sort: true,
},
{
  dataField: 'lastName',
  text: 'Last Name',
  sort: true,
}, {
  dataField: 'email',
  text: 'email'
}]

class App extends Component {
  state = {
    products: [],

  }

  async componentDidMount() {
    let p = await fetch("http://localhost:1234/api").then(res => res.json());
    const products = await p;
    this.setState({ products })
  }

  // handleTableChange = (type, { page, sizePerPage }) => {
  //   const currentIndex = (page - 1) * sizePerPage;

  // }

  render() {
    return (
      <div className="container" style={{ marginTop: 50 }}>
        <BootstrapTable
          striped
          hover
          bootstrap4
          keyField='id'
          data={this.state.products}
          columns={columns}
          filter={filterFactory()}
          pagination={paginationFactory()}
        />
      </div>
    );
  }
}

export default App;
