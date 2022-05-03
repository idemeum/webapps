/*
Copyright 2021 Gravitational, Inc.

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
import Form, { Expired } from 'teleport/components/FormNewCredentials';
import useToken, { State as TokenState } from './useToken';

export default function Container({ tokenId = '', title, submitBtnText }) {
  const state = useToken(tokenId);
  return (
    <NewCredentials {...state} title={title} submitBtnText={submitBtnText} />
  );
}

export function NewCredentials(props: State) {
  const { submitAttempt, fetchAttempt, passwordToken, ...rest } = props;

  if (fetchAttempt.status === 'failed') {
    return <Expired />;
  }

  if (fetchAttempt.status !== 'success') {
    return null;
  }

  const { user, qrCode } = passwordToken;

  return <Form user={user} qr={qrCode} attempt={submitAttempt} {...rest} />;
}

export type State = TokenState & {
  submitBtnText: string;
  title: string;
  resetMode?: boolean;
  onClick?: () => void;
};

export type Props = {
  tokenId: string;
  title: string;
  submitBtnText: string;
  onClick?: () => void;
};
