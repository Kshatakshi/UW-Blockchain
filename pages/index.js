import React from "react";
import { Card, Button, Icon, Grid , Image} from "semantic-ui-react";
import Layout from "../components/Layout";
import factory from "../ethereum/factory";
import { Link } from "../routes";
import Organization from "../ethereum/organization";

const colors=['#AE8A8C',
  '#DBBC8E',
  '#A9C8C0'];
  // const colors=['Viola',
  // 'Brandy',
  // 'Opal'];
//const a= colors[Math.floor(Math.random() * colors.length)];



class Index extends React.Component {
  static async getInitialProps() {
    const organizationAddr = await factory.methods
      .getDeployedOrganizations()
      .call();
    const organizations = await Promise.all(
      organizationAddr.map((addr, index) => {
        const organization = Organization(addr);
        return organization.methods.getOrganizationDetails().call();
      })
    );
    console.log(organizationAddr);
    console.log(organizations);
    return { organizations, organizationAddr };
  }

  

  renderOrganizations() {
    
    
    
       
    const items = this.props.organizations.map((organization, index) => {
      
      return {
   
        
       
        header: (
          
          <Card  >
           
        {/* <Image src='https://react.semantic-ui.com/images/avatar/large/a.png' wrapped ui={false} /> */}
        
        <Card.Content  style={{backgroundColor:colors[Math.floor(Math.random() * colors.length)], fontWeight:'bold', height:"8vh", color:"white"}}>
        <Card.Header style={{color:"whitesmoke"}} >{organization[0]}</Card.Header>
          {/* <h1 >{organization[0]}</h1> */}
    </Card.Content>
          </Card>
        ),
        description: (
             <div >
              <card>

<Card.Description style={{ color:"grey"}}>
{organization[1]}
<br />
</Card.Description>
<Card.Content extra>

<Link
              route={`/organizations/${this.props.organizationAddr[index]}`}
            >
              
              <a >View Organization</a>
            </Link>
            </Card.Content>

     
      </card>
          
 </div>),
 color:'grey'
 

          };
     
    });
return <Card.Group  items={items} /> 
         
  }
  render() {
    return (
      <div style={{backgroundImage:`url("https://i.pinimg.com/564x/cc/a1/f1/cca1f16b945651b503ccc55b6536aeb5.jpg")`, height:"100vh"}}>
      <Layout >
       
        <Link route="/organizations/new">
          
      
          <a   style={{ display: "flex", float:"right",alignContent:"flex-end", alignItems: "right" }}>
            <Button style={{marginTop: '18px',backgroundColor:'#55BCC9', border: "none", boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)"}} ui secondary button >

              <Icon  style={{color:"white" }}  name="add" />
              Add Organization
            </Button>
          </a>
         
        </Link>
        {/* <div  nbsp nbsp  style={{color:"white"}}> hey whats app</div> */}
       <div className="mob" align="left" >
       <h2 style={{marginLeft: "10px",fontStyle:'italic' }} >Open Organizations</h2>
        {/* <div className="ui grid"> */}
         {/* <Grid.Row  width={30}> */}
            {this.renderOrganizations()}
            
          {/* </Grid.Row> */}
          {/* </div> */}
       
        </div>
        <style jsx>{`

        .main{
          boxShadow: 5px 10px #888888,
          width: "350px",
          border: "2px grey"
        }
        
        @media (max-width: 600px) {
          .mob {
            width: "350px",
            paddingBottom: "80px",
  paddingLeft:"80px",
  border: "2px grey",
  margin: "0" ,
  alignContent:"center"

          }
        }
      `}</style>
      </Layout>
      </div>
    );
  }
}

export default Index;
