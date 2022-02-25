import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Lorem,
  } from '@chakra-ui/react'
  

export function ButtonWithModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <>
        <Button onClick={onOpen}>{props.ButtonText}</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{props.ModalTitle}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {props.children}
            </ModalBody>
  
            <ModalFooter>
              <Button variant='ghost' colorScheme='blue' onClick={props.onClickSubmit}>{props.SubmitButtonText}</Button>
              <Button variant='ghost' colorScheme='red' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  export default ButtonWithModal;