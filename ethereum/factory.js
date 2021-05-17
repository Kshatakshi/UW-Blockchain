import web3 from "./web3";
import OrganizationFactory from "./build/OrganizationFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(OrganizationFactory.interface),
  '0x7BF3aeCb823e679F7A698187F72986a51BF04115'

);

export default instance;
