import * as React from 'react';
import {
  Unstable_NumberInput as BaseNumberInput,
  numberInputClasses,
} from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';
/**
 * NumberInput defines the input fields for the timestamp values in Summarizer
 */

const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInputElement,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: '▴',
        },
        decrementButton: {
          children: '▾',
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

export default function NumberInputBasic({value, onChange, darkMode}) {
  //const [value, setValue] = React.useState(null);
  return (
    <NumberInput
      aria-label="Demo number input"
      placeholder="HH"
      min = {0}
      value={value}
      onChange={(event, val) => onChange(val)}
      darkMode={darkMode} // Pass the darkMode prop to the NumberInput component
    />
  );
}

export function QuantityInput({value, onChange, darkMode}) {
    const formatNumber = (num) => {
        return num.toString().padStart(2, '0');
    };
    return (
    <NumberInput 
      aria-label="Quantity Input" 
      placeholder="MM" 
      min={0} max={59} 
      value={value}
      onChange={(event,val) => onChange(val)}
      formatValue={formatNumber} 
      darkMode={darkMode} // Pass the darkMode prop to the NumberInput component
    />
    );
}

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const StyledInputRoot = styled('div')(
  ({ theme, darkMode }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 8px;
  // color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  // background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  // border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  // box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  color: ${darkMode ? '#ffffff' : '#111e41' }; 
  background: ${darkMode ? '#425689' : '#ffffff'}; // Adjust background color based on darkMode prop
  border: 1px solid ${darkMode ? '#111e41' : grey[200]}; // Adjust border color based on darkMode prop
  box-shadow: 0px 2px 2px ${darkMode ? '#2d437a' : grey[50]}; // Adjust box-shadow based on darkMode prop
  display: grid;
  grid-template-columns: 1fr 19px;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;
  column-gap: 0px;
  padding: 4px;
//background-color: blue;
  

  &.${numberInputClasses.focused} {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  &:hover {
    border-color: ${blue[400]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const StyledInputElement = styled('input')(
  ({ theme, darkMode }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  grid-column: 1/2;
  grid-row: 1/3;
  // color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  // color: ${darkMode ? '#ffffff' : '#111e41' }; 
  color: inherit;
  background: inherit;
  border: none;
  border-radius: inherit;
  //padding: 8px 12px;
  outline: 0;
  //background-color: yellow;
  width: 30px;
  text-align: center;
  ::placeholder {
    color: inherit
  }
`,
);

const StyledButton = styled('button')(
  ({ theme, darkMode }) => `
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  appearance: none;
  padding: 0;
  width: 19px;
  height: 19px;
  font-family: system-ui, sans-serif;
  font-size: 0.875rem;
  line-height: 1;
  box-sizing: border-box;
  // background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  // background: ${darkMode ? '#2d437a' : '#edf7f9'}; // Adjust background color based on darkMode prop
  border: 0;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;
  background-color: orange;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    cursor: pointer;
  }

  &.${numberInputClasses.incrementButton} {
    grid-column: 2/3;
    grid-row: 1/2;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border: 1px solid;
    border-bottom: 0;
    &:hover {
      cursor: pointer;
      background: ${blue[400]};
      color: ${grey[50]};
    }

  border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  // background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  background: inherit;
  // color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  color: inherit;
  }

  &.${numberInputClasses.decrementButton} {
    grid-column: 2/3;
    grid-row: 2/3;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 1px solid;
    &:hover {
      cursor: pointer;
      background: ${blue[400]};
      color: ${grey[50]};
    }

  border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  // background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  background: inherit;
  // color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  color: inherit;
  }
  & .arrow {
    transform: translateY(-1px);
  }
`,
);