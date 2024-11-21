import React, { useState } from 'react';
import { View, TextInput, Button, CheckBox, Alert } from 'react-native';

const PlaceOrderScreen = () => {
  const [elementIdSelling, setElementIdSelling] = useState('');
  const [pluId, setPluId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pinned, setPinned] = useState(false);
  const [apiKey, setApiKey] = useState('522DB3E2-B386-4007-AE93-DAA9DC70A660'); // Set this to your actual API key

  const placeOrder = async () => {
    try {
      const postData = [
        {
          ElementIdSelling: elementIdSelling,
          PLUID: pluId,
          Quantity: quantity,
          Pinned: pinned ? 'Y' : 'N',
        },
      ];

      const response = await fetch(
        'https://sandboxmpro.inmsystems.com/inmsystemsapi/api/InmPOCKETPay/PlaceOrder',
        {
          method: 'POST',
          headers: {
            APIKey: apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        }
      );

      if (response.ok) {
        const apiResponse = await response.json();
        const { Status: apiStatus } = apiResponse;

        switch (apiStatus) {
          case '1':
            // Call your success function here
            Alert.alert('Order placed successfully!');
            break;
          case '2':
          case '0':
            // Call your failure function here
            Alert.alert('Failed to place order. API responded with an error.');
            break;
          default:
            Alert.alert('Unexpected response from API.');
        }
      } else {
        throw new Error('Network error');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View>
      <TextInput
        placeholder='ElementIdSelling'
        value={elementIdSelling}
        onChangeText={setElementIdSelling}
      />
      <TextInput placeholder='PLUID' value={pluId} onChangeText={setPluId} />
      <TextInput
        placeholder='Quantity'
        value={quantity}
        onChangeText={setQuantity}
        keyboardType='numeric'
      />
      <CheckBox value={pinned} onValueChange={setPinned} />
      <Button title='Place Order' onPress={placeOrder} />
    </View>
  );
};

export default PlaceOrderScreen;
