import React from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Organization from "../ethereum/organization";
import { Router } from "../routes";

class ContributeForm extends React.Component {
  state = {
    value: "",
    errMessage: "",
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();
    this.setState({
      errMessage: "",
      loading: true
    });
    const organization = Organization(this.props.address);
    try {
      const accounts = await web3.eth.getAccounts();
      await organization.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether")
      });
      Router.replaceRoute(`/organizations/${this.props.address}`);
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
      <Form onSubmit={this.onSubmit} error={!!this.state.errMessage}>
        <Form.Field>
          <Input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>
        <Message error>
          <Message.Header>Error!</Message.Header>
          <p>{this.state.errMessage}</p>
        </Message>
        <Button loading={this.state.loading} style={{backgroundColor:'#55BCC9', color:"white", boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)"}}>
          Contribute
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
