import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';

export function SubmitNotification() {
  return (
    <Alert
      status="success"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Splinterlands
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        Earnings Report Submitted
        <br />
        <i>24 minutes ago</i>
      </AlertDescription>
      <CloseButton position="absolute" right="8px" top="8px" />
    </Alert>
  );
}
