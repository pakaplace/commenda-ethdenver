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
  return (
    <form method="POST" action="/api/mailForm">
      <FormControl isRequired="true">
        <FormLabel>Company Name</FormLabel>
        <Input name="CompanyName" placeholder="Name" />

        <FormLabel>SAFE Note (PDF)</FormLabel>
        <Input name="SAFE Note" type="file" />
      </FormControl>

      <FormControl isRequired="true">
        <FormLabel>Company Representative</FormLabel>
        <Input name="companyRepName" placeholder="Name" />
        <Input name="companyRepEmail" placeholder="address@startup.io" />
      </FormControl>

      <FormControl isRequired="true">
        <FormLabel>Investor </FormLabel>
        <Input name="investorName" placeholder="Name" />
        <Input name="investorEmail" placeholder="address@investor.com" />
      </FormControl>
      <Button colorScheme="blue" type="submit"> Submit </Button>
    </form>
  );
}

export default UploadFileForm;
