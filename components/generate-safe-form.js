import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Button,
    Input,
    Select,
  } from '@chakra-ui/react';
import { Formik } from 'formik';
import React from 'react';

function GenerateSafeForm() {
    return (
        <form method="POST" action="/api/generateSafe">
            <FormControl isRequired="true">
                <FormLabel>Company Name</FormLabel>
                <Input name="CompanyName" placeholder='Commenda Technologies, Inc.' />
                <FormLabel>Jurisdiction of Incorporation</FormLabel>
                <Select name="IncorporationJurisdiction">
                    <option value="US-DE"> US-Delaware</option>
                    <option value=""> Other - not yet supported 😭 </option>
                </Select>
                <FormLabel>Incorporation Date</FormLabel>
                <Input name="IncorporationDate" type="date" />
            </FormControl>

            <br/>

            <FormControl isRequired="true">
                <FormLabel>Investor </FormLabel>
                <Input name="investorName" placeholder='Name' />
            </FormControl>

            <FormControl>
                <FormLabel>Valuation Cap, USD (optional) </FormLabel>
                <Input type="number" step="0.01" name="investorName" placeholder='$0.00' />
            </FormControl>

            <br/>

            <Button  colorScheme='blue' type="submit"> Submit </Button>
        </form>)
}

export default GenerateSafeForm