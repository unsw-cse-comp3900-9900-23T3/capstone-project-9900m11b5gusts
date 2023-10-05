import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Input from '@mui/joy/Input';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
import Key from '@mui/icons-material/Key';

export default function PasswordMeterInput({onChange}) {
  const [value, setValue] = React.useState('');
  function handleValue(e){

    // 更新内部状态
    setValue(e.target.value);

    // 调用外部传递的 onChange 处理函数
    if (onChange) {
      onChange(e);
    }
  }
  const minLength = 12;
  return (
      <div style={{width: '300px', alignItems: 'center'}}>
    <Stack
      spacing={0.5}
      sx={{
        '--hue': Math.min(value.length * 10, 120),
      }}
    >
      <Input
        type="password"
        placeholder="Type in here…"
        startDecorator={<Key />}
        value={value}
        onChange={handleValue}
      />
      <LinearProgress
        determinate
        size="sm"
        value={Math.min((value.length * 100) / minLength, 100)}
        sx={{
          bgcolor: 'background.level3',
          color: 'hsl(var(--hue) 80% 40%)',
        }}
      />
      <Typography
        level="body-xs"
        sx={{ alignSelf: 'flex-end', color: 'hsl(var(--hue) 80% 30%)' }}
      >
        {value.length < 3 && 'Very weak'}
        {value.length >= 3 && value.length < 6 && 'Weak'}
        {value.length >= 6 && value.length < 10 && 'Strong'}
        {value.length >= 10 && 'Very strong'}
      </Typography>
    </Stack>
          </div>
  );
}