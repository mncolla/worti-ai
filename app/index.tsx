import { Text, View } from "react-native";
import { Button } from 'tamagui';


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button theme="blue">Hello world</Button>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
