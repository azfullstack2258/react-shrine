import React, { Component } from 'react';

import Header from '../header/Header';
import Footer from '../footer/Footer';

const App = ({ children }) => (
  <>
    <Header />

    <main>{children}</main>

    <Footer />
  </>
);

export default App;
