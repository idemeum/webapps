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
import styled from 'styled-components';
import { Warning } from 'design/Icon';
import { color, space } from 'design/system';
import * as types from 'teleterm/ui/Navigator/types';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import LinearProgress from 'teleterm/ui/components/LinearProgress';

type Props = {
  item?: types.NavItem;
  onClick?: (item: types.NavItem) => void;
  [key: string]: any;
};

const NavItem: React.FC<Props> = props => {
  const { item, onClick, ...styles } = props;
  const ctx = useAppContext();
  const active = ctx.serviceDocs.isActive(item.uri);

  const handleClick = () => {
    if (onClick) {
      onClick(item);
    } else {
      ctx.serviceDocs.open(item.uri);
    }
  };

  const Icon = item.status === 'failed' ? Warning : item.Icon;

  return (
    <StyledNavItem
      $active={active}
      $status={item.status}
      {...styles}
      onClick={handleClick}
    >
      {!props.children && (
        <>
          <Icon mr={2} ml={-2} fontSize="10px" color="inherit" />
          <div style={{ position: 'relative' }}>
            {item.title}
            {item.status === 'loading' && <LinearProgress />}
          </div>
        </>
      )}
      {props.children}
    </StyledNavItem>
  );
};

export const StyledNavItem = styled.div(props => {
  const { theme, $active, $status } = props;
  const colors = $active
    ? {
        color: theme.colors.primary.contrastText,
        background: theme.colors.primary.light,
      }
    : {};

  if ($status === 'failed') {
    colors.color = theme.colors.error.light;
  }

  return {
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    width: '100%',
    position: 'relative',
    fontSize: '12px',
    fontWeight: theme.regular,
    fontFamily: theme.font,
    color: theme.colors.text.primary,
    height: '32px',

    '&:hover': {
      background: theme.colors.primary.light,
    },

    '&:focus, &:hover': {
      color: theme.colors.primary.contrastText,
    },

    ...colors,
    ...color(props),
    ...space(props),
  };
});

export default NavItem;