import React from 'react';

import { InputGroup } from '@blueprintjs/core';

export default function PlayerNameFilter(props) {

  return (
    <InputGroup
      large
      onChange
      value
      placeholder="Name Filter"
    />
  );
}