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
import * as Alerts from 'design/Alert';
import { ButtonIcon, Text } from 'design';
import * as Icons from 'design/Icon';
import LoginForm from './FormLogin';
import useClusterLogin, { State, Props } from './useClusterLogin';
import Dialog, { DialogHeader, DialogContent } from 'design/Dialog';

export default function Container(props: Props) {
  const state = useClusterLogin(props);
  return <ClusterLogin {...state} />;
}

export function ClusterLogin({
  title,
  initAttempt,
  loginAttempt,
  onLoginWithLocal,
  onLoginWithSso,
  onCloseDialog,
  onAbort,
  shouldPromptSsoStatus,
  shouldPromptHardwareKey,
}: State) {
  return (
    <Dialog
      dialogCss={() => ({
        maxWidth: '400px',
        width: '100%',
        padding: '20px',
      })}
      disableEscapeKeyDown={false}
      onClose={onCloseDialog}
      open={true}
    >
      <DialogHeader>
        <Text typography="h4">
          Login to <b>{title}</b>
        </Text>
        <ButtonIcon ml="auto" p={3} onClick={onCloseDialog}>
          <Icons.Close fontSize="20px" />
        </ButtonIcon>
      </DialogHeader>
      <DialogContent mb={2}>
        {initAttempt.status === 'error' && (
          <Alerts.Danger>
            Unable to retrieve cluster auth preferences,{' '}
            {initAttempt.statusText}
          </Alerts.Danger>
        )}
        {initAttempt.status === 'success' && (
          <LoginForm
            title={'Sign into Teleport'}
            authProviders={initAttempt.data.authProvidersList}
            auth2faType={initAttempt.data.secondFactor}
            isLocalAuthEnabled={initAttempt.data.localAuthEnabled}
            preferredMfa={initAttempt.data.preferredMfa}
            onLoginWithSso={onLoginWithSso}
            onLogin={onLoginWithLocal}
            onAbort={onAbort}
            loginAttempt={loginAttempt}
            shouldPromptSsoStatus={shouldPromptSsoStatus}
            shouldPromptHardwareKey={shouldPromptHardwareKey}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
