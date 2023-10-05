import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';

export default function InputField({placeholder, width, onChange}) {
  return (
    <FormControl style={{width: width}}>
      {/*<FormLabel>Label</FormLabel>*/}
      <Input placeholder={placeholder} onChange={onChange}/>
      {/*<FormHelperText>This is a helper text.</FormHelperText>*/}
    </FormControl>
  );
}