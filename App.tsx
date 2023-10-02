import React from 'react';
import {
  AddIcon,
  Button,
  ButtonIcon,
  ButtonText,
  config,
  GluestackUIProvider,
  VStack,
} from '@gluestack-ui/themed';

export default function App() {
  return (
    <GluestackUIProvider config={config.theme}>
      <VStack>
        <Button
          size="md"
          variant="solid"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}>
          <ButtonText>Add </ButtonText>
          <ButtonIcon as={AddIcon} />
        </Button>
      </VStack>
    </GluestackUIProvider>
  );
}
