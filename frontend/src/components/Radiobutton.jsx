import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';

export default function RadioButtonsGroup({value, onChange}) {
  return (
    <FormControl>
      <RadioGroup value={value} defaultValue="User" onChange={onChange} name="radio-buttons-group">
        <Radio
          value="User"
          label="User"
          slotProps={{ input: { 'aria-describedby': 'female-helper-text' } }}
        />
        <Radio value="Manager" label="Manager" />
      </RadioGroup>
    </FormControl>
  );
}