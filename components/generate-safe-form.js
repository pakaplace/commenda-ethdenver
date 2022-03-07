import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Button,
    Input,
    Select,
    Textarea,
    VStack,
    NumberInput,
  } from '@chakra-ui/react';
import { Formik } from 'formik';
import React from 'react';

function GenerateSafeForm() {
    const spacing = '8px';
    const todaysDate = new Date().toISOString().split("T")[0];
    return (
        <form method="POST" action="/api/generateSafe">
            <VStack spacing='40px'>
            <FormControl isRequired="true">
                <VStack spacing={spacing}>
                    <FormLabel>Company Name</FormLabel>
                    <Input name="companyName" placeholder='Commenda Technologies, Inc.' />
                    <FormLabel>Company Address </FormLabel>
                    <Textarea name="companyAddress" placeholder='1 Market St, San Francisco, CA 94102 ' />
                    <FormLabel>State of Incorporation</FormLabel>
                    <Select name="stateOfIncorporation">
                        <option value="Delaware"> US-Delaware</option>
                        <option value=""> Other - not yet supported 😭 </option>
                    </Select>
                    <FormLabel>Incorporation Date</FormLabel>
                    <Input name="incorporationDate" type="date" min="2000-01-01" max={todaysDate}/>
                </VStack>
            </FormControl>

            <FormControl isRequired="true">
                <VStack spacing={spacing}>
                    <FormLabel>Investor Name </FormLabel>
                    <Input name="investorName" placeholder='Name' />
                    <FormLabel>Investor Title </FormLabel>
                    <Input name="investorTitle" placeholder='LP' />
                    <FormLabel>Investor Email </FormLabel>
                    <Input type="email" name="investorEmail" placeholder='investor@firm.com' />
                    <FormLabel>Investor Address </FormLabel>
                    <Textarea name="investorAddress" placeholder='1 Sand Hill Rd., Palo Alto, CA 94102 United States ' />
                </VStack>
            </FormControl>

            <FormControl isRequired="true">
                <VStack spacing={spacing}>
                    <FormLabel>Company Representative Name </FormLabel>
                    <Input name="companyRepresentativeName" placeholder='Name' />
                    <FormLabel>Company Representative Title </FormLabel>
                    <Input name="companyRepresentativeTitle" placeholder='CEO' />
                    <FormLabel>Company Representative Email </FormLabel>
                    <Input type="email" name="companyRepresentativeEmail" placeholder='ceo@startup.io' />
                </VStack>
            </FormControl>
            <>
            <FormControl isRequired="true">
                <VStack spacing={spacing}>
                    <FormLabel>Purchase Date</FormLabel>
                    <Input name="purchaseDate" type="date" min={todaysDate} defaultValue={todaysDate}/>

                    <FormLabel>Purchase Amount, USD  </FormLabel>
                    <Input type="number" step="0.01" name="purchaseAmount" placeholder='$0.00'/>
                    <FormLabel>Valuation Cap, USD (optional) </FormLabel>
                    <Input type="number" step="0.01" name="valuationCap" placeholder='$0.00'/>
                </VStack>
            </FormControl>
            </>

            <Button  colorScheme='blue' type="submit"> Submit </Button>
            </VStack>
        </form>)
}

export default GenerateSafeForm