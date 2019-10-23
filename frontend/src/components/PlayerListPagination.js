import React from 'react';

import { Button, ButtonGroup } from '@blueprintjs/core';

export default function PlayerListPagination(props) {
  const { skip, setSkip, first, hasNextPage } = props;

  return (
    <ButtonGroup className='player-list-pagination'>
      <Button
        icon="arrow-left"
        disabled={skip === 0}
        onClick={() => setSkip(skip - first)}
      >
      </Button>
      <Button
        icon="arrow-right"
        onClick={() => setSkip(skip + first)}
        disabled={!hasNextPage}
      >
      </Button>
    </ButtonGroup>
  );
}