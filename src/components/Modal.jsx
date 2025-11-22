import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

export const Modal = ({ open, setOpen, children }) => {
  return (
    <Dialog.Root lazyMount open={open}>
      <Dialog.Backdrop />
      <Portal>
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Body>{children}</Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
