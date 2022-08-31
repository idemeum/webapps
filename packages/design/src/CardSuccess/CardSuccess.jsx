/*
Copyright 2019 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import { Card, Text } from 'design';
import Box from './../Box';
import { CircleCheck } from 'design/Icon';

export default function CardSuccess({ title, children }) {
  return (
    <Box width="540px" p={7} my={4} mx="auto" textAlign="center">
      <CircleCheck mb={3} fontSize={56} color="success" />
      {title && (
        <Text typography="h2" mb="4">
          <h1>{title}</h1>
        </Text>
      )}
      {children}
    </Box>
  );
}

export function CardSuccessLogin() {
  return (
    <div>
      <meta charSet="UTF-8" />
      <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
      <meta httpEquiv="Pragma" content="no-cache" />
      <meta httpEquiv="Expires" content={0} />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Idemeum</title>
      <link rel="shortcut icon" href="https://asset.idemeumlab.com/assets/images/idemeum-favicon.png" />
      <link rel="stylesheet" href="https://asset.idemeumlab.com/assets/css/fonts.css" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossOrigin="anonymous" />
      {/* Loading material ui from cdnjs server as it adds the CORP response header to cross-origin which is required for CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-components-web/14.0.0/material-components-web.min.css" integrity="sha512-MQSeeHVtBZ+FnVbcJbGKYk4Clc5A2e0bqWg+yiSMROJsnzyIfe9nivRWhmlOBAoh+NOqVOPPL7AaLUq/rSXL5w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <header className=" mdc-top-app-bar">
        <div className="mdc-top-app-bar__row">
          <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start header-main">
            <button className="btn p-0 main-logo">
              <img src="https://asset.idemeumlab.com/assets/images/Logo.svg" alt="" srcSet className="main-logo" /></button>
            <span className="app-name">idemeum</span>
          </section>
        </div>
      </header>
      <section className="container h-100" style={{ paddingTop: '100px' }}>
        <div className="row h-100 align-items-center text-center">
          <CardSuccess title="Login Successful">
            <h6>You have successfully signed into your account. <br /> You can close this
            window and continue using the product.</h6>
          </CardSuccess>
        </div>
      </section>
      <style dangerouslySetInnerHTML={{ __html: "\n        :root {\n            --mdc-theme-primary: #3E79F1 !important;\n            --mdc-theme-on-primary: #FFFFFF !important;\n        }\n        body, html { height: 100%; }\n        body { margin: 0; }\n        .header-main { padding: 0 35px !important; }\n        .mdc-top-app-bar__row { height: 72px !important; }\n        .app-name {\n            font-family: 'Red Hat Display', sans-serif !important;\n            font-style: normal;\n            font-weight: 500;\n            font-size: 34px;\n            line-height: 45px;\n            display: flex;\n            align-items: center;\n            letter-spacing: 0.25px;\n            color: #FFFFFF;\n            margin-left: 25px;\n        }\n        .main-logo { width: auto !important; height: auto !important; }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n" }} />
    </div>

  );
}
