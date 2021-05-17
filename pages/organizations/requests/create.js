import React from "react";
import { Form, Input, Message, Button, Icon , Card} from "semantic-ui-react";
import web3 from "../../../ethereum/web3";
import Organization from "../../../ethereum/organization";
import Layout from "../../../components/Layout";
import { Link, Router } from "../../../routes";
import Float from "../../../components/Image/svg.svg";
import Float2 from '../../../components/Image/blockchain.png';

class NewRequest extends React.Component {
  state = {
    description: "",
    value: "",
    recipient: "",
    loading: false,
    errMessage: ""
  };

  static getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }

  onSubmit = async event => {
    event.preventDefault();
    this.setState({
      errMessage: "",
      loading: true
    });
    const organization = Organization(this.props.address);
    try {
      const accounts = await web3.eth.getAccounts();
      const { description, value, recipient } = this.state;
      await organization.methods
        .createRequest(description, recipient, web3.utils.toWei(value, "ether"))
        .send({
          from: accounts[0]
        });
      Router.pushRoute(`/organizations/${this.props.address}/requests`);
    } catch (err) {
      this.setState({
        errMessage: err.message
      });
    }
    this.setState({
      loading: false
    });
  };
  render() {
    return (
      <div align="center" className="container"style={{backgroundImage:`url("https://i.pinimg.com/564x/cc/a1/f1/cca1f16b945651b503ccc55b6536aeb5.jpg")`, height:"100vh"}}>
      <Layout>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', position: 'relative'}}>
        <img className="bg" style={{marginLeft: '-7%'}} src={Float} alt='logo'/>
        <img className="bg2" src={Float2} alt='logo'/>
        <img className="bg3" src={Float2} alt='logo'/>
        </div>
        <div style={{display: 'flex', justifyContent:'center'}}>
        <div style={{position: 'absolute', marginTop: '-60vh', width:'80%'}}>
            <h1 style={{fontStyle:"italic",color:"Pattensblue", marginTop:"40px"}}>New Request</h1>
            <Card style={{width:"70vh", height:"40vh", backgroundColor:"white",marginTop:"20px", display: 'flex', justifyContent: 'center'}} centered color='teal'>
            <div>
            <Form className="mobile"  style={{width:"500px"}} onSubmit={this.onSubmit} error={!!this.state.errMessage}>
              <Form.Field style={{width:"350px", marginLeft:"10px", marginTop:"10px"}}>
                {/* <label>Description</label> */}
                <Input  style={{ appearance: "none", textDecoration: "none",color:"white", border: "none", transition: "width 0.4s ease-in-out"}}
                  value={this.state.description}  placeholder="Description"
                  onChange={event =>
                    this.setState({
                      description: event.target.value
                    })
                  }
                />
              </Form.Field>
              <Form.Field style={{width:"350px", marginLeft:"10px", marginTop:"10px"}}>
                {/* <label>Amount</label> */}
                <Input  style={{ appearance: "none", textDecoration: "none",color:"white", border: "none", transition: "width 0.4s ease-in-out"}}
                  value={this.state.value}  placeholder="Amount"
                  onChange={event =>
                    this.setState({
                      value: event.target.value
                    })
                  }
                  label="ether"
                  labelPosition="right"
                />
              </Form.Field>
              <Form.Field  style={{width:"350px", marginLeft:"10px", marginTop:"10px"}}>
                {/* <label>Recipient</label> */}
                <Input  style={{ appearance: "none", textDecoration: "none",color:"white", border: "none", transition: "width 0.4s ease-in-out"}}
                  value={this.state.recipient}  placeholder="Recipient"
                  onChange={event =>
                    this.setState({ recipient: event.target.value })
                  }
                />
              </Form.Field>
              <Message error>
                <Message.Header>Error</Message.Header>
                <p>{this.state.errMessage}</p>
              </Message>
              <Button  loading={this.state.loading} style={{backgroundColor:'#55BCC9', color:"white" ,boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)"}}>
                Submit
              </Button>
              <Link route= {`/organizations/${this.props.address}/requests`}>
                <a>
                  <Button icon labelPosition = "left" style={{backgroundColor:'#55BCC9', color:"white" ,boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)"}}><Icon name = "left arrow" / >Back</Button>
                </a>
              </Link>
              <style jsx>{`
            @media (max-width: 600px) {
              .mobile {
                width: "700px",
                paddingBottom: "80px",
      paddingLeft:"80px",
      border: "2px grey",
      margin: "0" ,
      alignContent:"center"

              }
            }
          `}</style>
            </Form>
            </div>
            </Card>
        </div>
        </div>
      </Layout>
      </div>
    );
  }
}

export default NewRequest;
