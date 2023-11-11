//For better looking, the input for file uploading is set to be hidden behind a button

import * as React from 'react';
import Button from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import { styled } from '@mui/joy';

import { fileToDataURL } from '../user_general/FileToURL.js';



//The following tow sections of code make an upload button
const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function UploadFileButton({ setPicture, words='Upload a file', setPredictedCategory }) {

  const [classesString, setClassesString] = React.useState('')


  //Use base64 format to encode the picture into string
  async function handlePicToURL (setPicture) {
    const fileToDataUrlReturn = fileToDataURL(document.getElementById('uploadPictureButton').files[0]);
    fileToDataUrlReturn
      .then((picData) => {
        setPicture(picData)
        return picData
      })
      .then((picData) => {
        if (window.location.href.includes('posts')) {
          predictCategory(picData);
        }
        
      })
  }

  async function predictCategory(picData){
    if (picData) {
      console.log('working2')
      const response = await fetch('http://127.0.0.1:5000/Items/predict/image', {
          method:'POST',
          headers:{
            'Content-type': 'application/json',
          },
          body:JSON.stringify({
            'img': picData
          })
        });
        if (response.status===200){
          const data = await response.json();
          console.log('posts: ', data.success)
          if (data.success){
            console.log(data.success)
            setPredictedCategory((p) => ({...p, c1: data.success, c2: '', c3: ''}))
            }
          } else{
          const data = await response.json();
          alert(data)
          }
    }
  }

  return (
    <Button
      
      onChange={() => {
        handlePicToURL(setPicture)
      }}

      component="label"
      role={undefined}
      tabIndex={-1}
      variant="soft"
      color="primary"
      startDecorator={
        <SvgIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
        </SvgIcon>
      }
    >
      {words}
      <VisuallyHiddenInput type="file" 
        id="uploadPictureButton"
      />
    </Button>
  );
}