import React from "react";
import Header from "./Header";
import Head from "next/head";

import { Container } from "semantic-ui-react";

var Layout = props => {
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Dancing+Script"></link>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Kaushan+Script"></link>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Vollkorn"></link>
      </Head>
      <Header />
      <Container>
        {props.children}
      </Container>
    </div>
  );
};

export default Layout;
