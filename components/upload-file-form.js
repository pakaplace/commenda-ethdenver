import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Button,
    Input,
  } from '@chakra-ui/react';
import { Formik } from 'formik';
import React from 'react';

function UploadFileForm() {
    function validateName(value) {
      let error
      if (!value) {
        error = 'Name is required'
      } else if (value.toLowerCase() !== 'naruto') {
        error = "Jeez! You're not a fan 😱"
      }
      return error
    }
      return (
    <FormControl>
        <FormLabel>SAFE Name</FormLabel>
        <Input placeholder='Name' />

        <FormLabel>SAFE Note (PDF)</FormLabel>
        <Input type="file"/>
      </FormControl>
)
  }

export default UploadFileForm