import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
const columns = [{
  dataField: 'id',
  text: 'ID'
},
{
  dataField: 'gender',
  text: 'gender',
  sort: true,
  // filter: textFilter()
},
{
  dataField: 'firstName',
  text: 'First Name',
  sort: true
}
  , {
  dataField: 'lastName',
  text: 'Last Name',
  sort: true
},
{
  dataField: 'email',
  text: 'Email',
}];


class AppRemote extends Component {

  constructor(props) {
    super(props);
    console.log("In Constructor")
    this.state = { names: [], sizePerPage: 10, page: 1, totalSize: 0, url: this.props.url,err:"" }
  }


  handleTableChange = async (type, pr) => {
    const { page, sizePerPage, sortField, sortOrder } = pr;
    console.log(pr)
    const sortString = (sortField && sortOrder) ? `&_sort=${sortField}&_order=${sortOrder}` : "";
    const currentIndex = (page - 1) * sizePerPage;
    const end = currentIndex + sizePerPage;
    const URL = this.state.url;
    console.log("URL --> ", this.props.url)
    if (!URL) {
      return
    }
    const URI = `${URL}?_start=${currentIndex}&_end=${end}${sortString}`;
    try {
      let p = await fetch(URI).then(res => {
        const totalSize = Number(res.headers.get("x-total-count"));
        if (totalSize) { this.setState({ totalSize }) }
        return res.json()
      });
      const names = await p;
      this.setState({ page, sizePerPage, names,err:"" })
    } catch(err){
      this.setState({err:"Could not connect to: "+this.props.url})
    }
  }

  async componentDidMount() {
    console.log("MOUNTED ", this.props.url)
    const { page, sizePerPage } = this.state
    this.handleTableChange("didMount", { page, sizePerPage });
  }

  // This was neccesary without the key in index.js
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.url !== prevState.url) {
  //     return { url: nextProps.url, names: [] };
  //   }
  //   else return null;
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.state.url !== prevProps.url) {
  //     const { page, sizePerPage } = this.state
  //     this.handleTableChange("didMount", { page, sizePerPage });
  //   }
  // }



  handleSizePerPageChange = (page, sizePerPage) => {
    this.setState({ sizePerPage });
  }



  render() {
    const { page, sizePerPage, totalSize } = this.state;
    const onSizePerPageChange = this.handleSizePerPageChange;
    return (
      <div className="container" style={{ marginTop: 50 }}>
        <h2>Server: {this.props.url}</h2>
        <BootstrapTable
          striped
          remote
          bootstrap4
          keyField='id'
          data={this.state.names}
          columns={columns}
          onTableChange={this.handleTableChange}
          pagination={paginationFactory({ page, sizePerPage, totalSize, onSizePerPageChange })}
        />
        <h4 style={{color:"red"}}>{this.state.err}</h4>
      </div>
    );
  }
}

export default AppRemote;
