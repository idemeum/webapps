/*
Copyright 2019-2021 Gravitational, Inc.

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
import { LoginFailed as CardFailed } from 'design/CardError';
import { Route, Switch } from 'teleport/components/Router';
import LogoHero from 'teleport/components/LogoHero';
import cfg from 'teleport/config';
import ErrorPage from './ErrorPage/ErrorPage';

export default function Container() {
  return (
    <Switch>
      <Route path={cfg.routes.loginErrorCallback}>
        <ErrorPage message="Unable to process callback" redirectUrl={cfg.routes.login}/>
      </Route>
      <Route path={cfg.routes.loginErrorLegacy}>
        <ErrorPage message="Unable to Login, Please check Teleport's logs for details" redirectUrl={cfg.routes.login}/> 
      </Route>
      <Route path={cfg.routes.loginErrorUnauthorized}>
        <ErrorPage message="You are not authorized, please contact your SSO administrator." redirectUrl={cfg.routes.login} />
      </Route>
      <Route path={cfg.routes.loginError}>
        <ErrorPage message="You are not authorized, please contact your SSO administrator." redirectUrl={cfg.routes.login} />
      </Route>
    </Switch>
  );
}