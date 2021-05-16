import React from "react";
import { Form, Button, Input, Message, Icon, Card } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Link, Router } from "../../routes";

class NewOrganization extends React.Component {
  state = {
    minContribution: "",
    name: "",
    desc: "",
    errMessage: "",
    loading: false
  };

  onSubmit = async event => {
    try {
      if (this.state.loading) return;
      const accounts = await web3.eth.getAccounts();
      this.setState({
        loading: true,
        errMessage: ""
      });
      console.log(accounts);
      await factory.methods
        .createOrganizations(
          this.state.minContribution,
          this.state.name,
          this.state.desc
        )
        .send({ from: accounts[0] });
      console.log("Redirecting");
      Router.pushRoute("/");
    } catch (err) {
      this.setState({
        errMessage: err.message
      });
    }
    this.setState({ loading: false });
  };
  render() {
    return (
      <div align="center" className="container" style={{ backgroundImage:`url("https://i.pinimg.com/564x/cc/a1/f1/cca1f16b945651b503ccc55b6536aeb5.jpg")`,height:"100vh", backgroundRepeat:"repeat"}}>
      <Layout  >
     
        <h1 style={{fontStyle:"italic",color:"Pattensblue", marginTop:"40px"}}>New Organization</h1>
        <Card style={{width:"70vh", height:"40vh", backgroundColor:"white",marginTop:"20px", paddingRight:"20px"}} centered color='teal'>
        <Form className="mobile"  style={{width:"500px"}} onSubmit={this.onSubmit} error={!!this.state.errMessage}>
        
          <Form.Field style={{width:"350px", marginLeft:"10px", marginTop:"10px"}}>
         
            {/* <label >
              <h3>Name</h3>
            </label> */}
            <Input style={{ appearance: "none", textDecoration: "none",color:"white", border: "none", backgroundColor:"white", transition: "width 0.4s ease-in-out"}}
              value={this.state.name} placeholder="Name"
              onChange={event => this.setState({ name: event.target.value })}
            />
          </Form.Field >
          <Form.Field style={{width:"350px", marginLeft:"10px", marginTop:"10px"}}>
            {/* <label>
              <h3>Description</h3>
            </label> */}
            <Input style={{  border: "none", transition: "width 0.4s ease-in-out"}}
              value={this.state.desc} placeholder="Description"
              onChange={event => this.setState({ desc: event.target.value })}
            />
          </Form.Field>
          <Form.Field  style={{ width:"350px", marginLeft:"10px", marginTop:"10px",borderColor:"white", opacity:'1',transform: "translateY(0)", transition: 'width 0.4s ease-in-out' }}>
            {/* <label>
              <h3>Minimum Contribution</h3>
            </label> */}
            <Input style={{  borderColor:"white", outline: "none"}}
              label="eth"
              labelPosition="right"
              placeholder="Minimum Contribution"
              value={this.state.minContribution}
              onChange={event =>
                this.setState({ minContribution: event.target.value })
              }
            />
          </Form.Field>
          <Card.Content>
          <Message error>
            <Message.Header>Error!</Message.Header>
            <p>{this.state.errMessage}</p>
          </Message>
          <Button loading={this.state.loading} style={{backgroundColor:'#55BCC9', color:"white" ,boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)"}}>
            Create
          </Button>
          <Link route={`/`}>
            <a>
              <Button icon labelPosition="left" style={{backgroundColor:'#55BCC9', color:"white", boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)"}}>
                <Icon name="left arrow" />
                Back
              </Button>
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
         </Card.Content>
        </Form>
        </Card>
        
      </Layout>
    
      </div>
    );
  }
}

export default NewOrganization;
