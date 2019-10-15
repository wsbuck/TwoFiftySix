import React, { useState } from 'react';

import {
  Button, Card, Elevation, FormGroup, InputGroup, Tooltip, Intent,
  H5, MenuItem
} from '@blueprintjs/core';
import { Select, MultiSelect } from "@blueprintjs/select";

function renderItem(item, { handleClick, modifiers, query }) {
  if (!modifiers.matchesPredicate) {
    return null;
}
const text = `${item.label}`;
return (
    <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        // label={item.label.toString()}
        key={item.value}
        onClick={handleClick}
        text={text}
    />
);
}

function filterItem(query, item, _index, exactMatch) {
  const normalizedLabel = item.label.toLowerCase();
  const normalizedQuery = query.toLowerCase();
  if (exactMatch) {
    return normalizedLabel === normalizedQuery;
  } else {
      return `${normalizedLabel}`.indexOf(normalizedQuery) >= 0;
  }
}

function renderTag(item) {
  return item.label;
}

const clearButton = (
  <Button icon="cross" minimal={true} />
);


export default function PlayersFilterForm(props) {
  const [selectedItems, setSelectedlItems] = useState([]);
  
  function handleSubmit(event) {
    event.preventDefault();

  }

  function handleValueChange(item) {
    setSelectedlItems([...selectedItems, item]);
  }

  function handleRemove(item) {
    let tempItems = selectedItems;
    tempItems = tempItems.filter((el) => {
      return --el['label'] === item;
    });
    setSelectedlItems(tempItems);
  }

  const items = [
    {
      label: 'Quarterback',
      value: 'qb',
    },
    {
      label: 'Runningback',
      value: 'rb',
    },
    {
      label: 'Wide Receiver',
      value: 'wr',
    },
    {
      label: 'Tight End',
      value: 'te',
    },
  ];

  return (
    <Card elevation={Elevation.ZERO} className='players-filter-form'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <H5>Players Filter</H5>
        <MultiSelect
           items={items}
           itemRenderer={renderItem}
           itemPredicate={filterItem}
           onItemSelect={handleValueChange}
           tagRenderer={renderTag}
           tagInputProps={
            {
              // tagProps: getTagProps,
              onRemove: handleRemove,
              rightElement: clearButton 
            }
          }
           selectedItems={selectedItems}
        >
          {/* <Button
            text={item ? item.label : ''}
          /> */}
        </MultiSelect>
      </form>
    </Card>
  );
}