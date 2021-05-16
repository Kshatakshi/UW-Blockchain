import web3 from "./web3";
import OrganizationFactory from "./build/OrganizationFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(OrganizationFactory.interface),
  '0x024301ab9d09Bd60dDB1a07F17A3E98FBC4197F3'

);

export default instance;
