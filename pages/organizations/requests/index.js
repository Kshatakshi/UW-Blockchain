import React from "react";
import { Link } from "../../../routes";
import {
  Button,
  Table,
  Icon
} from "semantic-ui-react";
import web3 from "../../../ethereum/web3";
import Layout from "../../../components/Layout";
import Organization from "../../../ethereum/organization";
import RenderRow from "../../../components/RenderRow";
import Float from "../../../components/Image/svg.svg";
import Float2 from '../../../components/Image/blockchain.png';

class ViewRequests extends React.Component {
  state = {
    requests: []
  };
  static async getInitialProps(props) {
    const { address } = props.query;
    const accounts = await web3.eth.getAccounts();
    const organization = await Organization(address);
    const requestCount = await organization.methods.getRequestsCount().call();
    const approverCount = await organization.methods.approversCount().call();
    const manager = await organization.methods.manager().call();

    let requests;
    requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return organization.methods.requests(index).call();
        })
    );

    const reqApprovers = await Promise.all(
      requests.map(async (request, index) => {
        return await Promise.all(
          Array(parseInt(request.numOfAllowedApprovers))
            .fill()
            .map((ele, index) => {
              return organization.methods
                .reqApprovers(parseInt(request.id), index)
                .call();
            })
        );
      })
    );
    console.log(accounts);
    console.log(reqApprovers);
    return { address, requests, approverCount, reqApprovers, manager ,requestCount };
  }
  
  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    let requests = this.props.requests.filter((request, index) => {
      if (request.complete || accounts[0] == this.props.manager) return true;
      return this.props.reqApprovers[index].indexOf(accounts[0]) != -1;
    });

    this.setState({
      requests: requests
    });
  }

  renderRows() {
    return this.state.requests.map((request, index) => {
      return (
        <RenderRow
          id={index}
          request={request}
          key={index}
          approversCount={request.numOfAllowedApprovers}
          address={this.props.address}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <div style={{backgroundImage:`url("https://i.pinimg.com/564x/cc/a1/f1/cca1f16b945651b503ccc55b6536aeb5.jpg")`, height:"100vh"}}>
      <Layout>
        {/* <Dimmer active inverted>
          <Loader size="large">Processing Request ...</Loader>
        </Dimmer> */}
        <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', position: 'relative'}}>
        <img className="bg" style={{marginLeft: '-7%'}} src={Float} alt='logo'/>
        <img className="bg2" src={Float2} alt='logo'/>
        <img className="bg3" src={Float2} alt='logo'/>
        </div>
        <div style={{display: 'flex', justifyContent:'center'}}>
        <div style={{position: 'absolute', marginTop: '-60vh', width:'80%'}}>
            <Link route={`/organizations/${this.props.address}/requests/new`}>
              <a>
                <Button floated="right" style={{backgroundColor:'#55BCC9', color: 'white'}}>
                  Add Request
                </Button>
              </a>
            </Link>
            <Link route={`/organizations/${this.props.address}`}>
              <a>
                <Button icon labelPosition="left" floated="right" style={{backgroundColor:'#55BCC9', color:'white'}}>
                  <Icon name="left arrow" />
                  Back
                </Button>
              </a>
            </Link>
            <h2>Requests</h2>
            <Table>
              <Header>
                <Row>
                  <HeaderCell>ID</HeaderCell>
                  <HeaderCell>Description</HeaderCell>
                  <HeaderCell>Recipient</HeaderCell>
                  <HeaderCell>Amount</HeaderCell>
                  <HeaderCell>Approvals</HeaderCell>
                  <HeaderCell>Approve</HeaderCell>
                  <HeaderCell>Finalize</HeaderCell>
                </Row>
              </Header>
              <Body>{this.renderRows()}</Body>
            </Table>
            <h4>Found {this.state.requests.length} requests</h4>
        </div>
        </div>
      </Layout>
      </div>
    );
  }
}

export default ViewRequests;
