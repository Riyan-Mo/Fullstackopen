import Main from "./src/components/Main";
import { SafeAreaView } from "react-native";
import { NativeRouter } from "react-router-native";

export default function App() {
  return (
    <SafeAreaView>
      <NativeRouter>
        <Main />
      </NativeRouter>
    </SafeAreaView>
  );
}
