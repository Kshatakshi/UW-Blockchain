import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";
// import Ins from "./Ins.png"
import logo from './Image/Ins.png';




class Header extends React.Component {
  render() {
    return (
      <Menu style={{height:'90px', position:"relative", boxShadow: "0 5px 10px"}}   ui inverted menu    >
          <div style={{display:'flex'}}>

        <Link  route="/">
          <>
          <img style={{width:'100px'}} src={logo} alt='logo' id='logo'/>

          <a
      
      
            // className="ui grayish item header item"
            
            className="ui header item"
            style={{ backgroundColor: "#45A29E" }}
           
            // style={{color:"white"}}
            
          >
            <h1  style={{ color:'#eeeeef', fontFamily:"Vollkorn", marginTop:'16px', fontSize: '43px',width:'170px'}} >Goodwill</h1>
          </a>
          
          <p className="tag" style={{ left:"50%", transform: "translate(-50%,0)", position:"absolute", marginTop:'34px', color:'#eeeeef', fontFamily: 'Vollkorn', fontSize: '28px',fontStyle:'italic'}}>Secure donations, Secure good deeds!</p>
          <style jsx>{`
        @media (max-width: 600px) {
          .tag {
            display: none;
          }
        }
      `}</style>
       </>
        </Link>
        </div>
        {/* <Menu.ui.menu position="right">
          <Menu.Item className = "ui header" color={"red"} style = {{backgroundColor:"#BAB2B5"}}></Menu.Item>
        </Menu.ui.menu> */}
      </Menu>
    );
  }
}

export default Header;
