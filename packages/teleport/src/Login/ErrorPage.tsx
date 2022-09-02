import React from 'react';
import cfg from 'teleport/config';

export default function ErrorPage({ message, redirectUrl }: { message?: string, redirectUrl?: string }) {
    console.log("Message : ", redirectUrl)
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
            <section className="container h-100" style={{ paddingTop: '300px' }}>
                <div className="row h-100 align-items-center text-center">
                    <div className="col-12">
                        <h4 className="text-neutral">{message}</h4>
                        <h6 className="text-neutral">
                            Click
                            <a href={redirectUrl}>
                                &nbsp;here&nbsp;
                            </a>
                            to Login again
                        </h6>
                    </div>
                </div>
            </section>
            <style dangerouslySetInnerHTML={{ __html: "\n        :root {\n            --mdc-theme-primary: #3E79F1 !important;\n            --mdc-theme-on-primary: #FFFFFF !important;\n        }\n        body, html { height: 100%; }\n        body { margin: 0; }\n        .header-main { padding: 0 35px !important; }\n        .mdc-top-app-bar__row { height: 72px !important; }\n        .app-name {\n            font-family: 'Red Hat Display', sans-serif !important;\n            font-style: normal;\n            font-weight: 500;\n            font-size: 34px;\n            line-height: 45px;\n            display: flex;\n            align-items: center;\n            letter-spacing: 0.25px;\n            color: #FFFFFF;\n            margin-left: 25px;\n        }\n        .main-logo { width: auto !important; height: auto !important; }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n" }} />
        </div>
    );
}