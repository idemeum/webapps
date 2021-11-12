/**
 * Copyright 2020 Gravitational, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { Danger } from 'design/Alert';
import { Indicator, Box, Text, Link } from 'design';
import useTeleport from 'teleport/useTeleport';
import {
  FeatureBox,
  FeatureHeader,
  FeatureHeaderTitle,
} from 'teleport/components/Layout';
import InputSearch from 'teleport/components/InputSearch';
import Empty, { EmptyStateInfo } from 'teleport/components/Empty';
import AppList from './AppList';
import AddApp from './AddApp';
import ButtonAdd from './ButtonAdd';
import useApps, { State } from './useApps';

import LabelFilter from 'teleport/components/SelectFilter';
import { Option } from 'shared/components/Select';

export default function Container() {
  const ctx = useTeleport();
  const state = useApps(ctx);
  return <Apps {...state} />;
}

export function Apps(props: State) {
  const {
    clusterId,
    isLeafCluster,
    isAddAppVisible,
    showAddApp,
    hideAddApp,
    canCreate,
    attempt,
    apps,
    searchValue,
    setSearchValue,
    filteredApps,
    setFilteredApps,
    labels,
  } = props;

  const isEmpty = attempt.status === 'success' && apps.length === 0;
  const hasApps = attempt.status === 'success' && apps.length > 0;
  const [selectedFilters, setSelectedFilters] = React.useState<Option[]>([]);

  function onFilterApply(updatedSelectedFilters) {
    const filtered = apps.filter(obj =>
      updatedSelectedFilters.every(filter =>
        obj.tags.toString().includes(filter.value)
      )
    );

    setFilteredApps(filtered);
    setSelectedFilters(updatedSelectedFilters);
  }

  function onLabelClick(label: string) {
    let tags = selectedFilters.map(f => f.value);
    let copy = selectedFilters;
    const index = tags.findIndex(filter => filter === label);
    if (index > -1) {
      // remove it
      copy.splice(index, 1);
    } else {
      copy = [...copy, { value: label, label }];
    }

    onFilterApply(copy);
  }

  return (
    <FeatureBox>
      <FeatureHeader alignItems="center" justifyContent="space-between">
        <FeatureHeaderTitle>Applications</FeatureHeaderTitle>
        <ButtonAdd
          isLeafCluster={isLeafCluster}
          canCreate={canCreate}
          onClick={showAddApp}
        />
      </FeatureHeader>
      {attempt.status === 'processing' && (
        <Box textAlign="center" m={10}>
          <Indicator />
        </Box>
      )}
      {attempt.status === 'failed' && <Danger>{attempt.statusText} </Danger>}
      {hasApps && (
        <>
          <LabelFilter
            onFilterApply={onFilterApply}
            filters={labels}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            mb={3}
          />
          <AppList
            searchValue={searchValue}
            apps={filteredApps}
            setSearchValue={setSearchValue}
            onLabelClick={onLabelClick}
          />
        </>
      )}
      {isEmpty && (
        <Empty
          clusterId={clusterId}
          canCreate={canCreate && !isLeafCluster}
          onClick={showAddApp}
          emptyStateInfo={emptyStateInfo}
        />
      )}
      {isAddAppVisible && <AddApp onClose={hideAddApp} />}
    </FeatureBox>
  );
}

const emptyStateInfo: EmptyStateInfo = {
  title: 'ADD YOUR FIRST APPLICATION',
  description: (
    <Text>
      {`Quick access to web applications running behind NAT and firewalls with
      security and compliance. Follow `}
      <Link
        target="_blank"
        href="https://goteleport.com/docs/application-access/getting-started/"
      >
        the documentation
      </Link>
      {' to get started.'}
    </Text>
  ),
  videoLink: 'https://www.youtube.com/watch?v=HkBQY-uWIbU',
  buttonText: 'ADD APPLICATION',
  readOnly: {
    title: 'No Applications Found',
    message: 'There are no applications for the "',
  },
};
