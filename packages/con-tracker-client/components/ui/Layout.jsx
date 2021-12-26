import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = props => {
  const { children } = props;
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
