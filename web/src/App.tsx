import { AppRoutes } from "./Routes";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <div>
      <ChakraProvider>
        <AppRoutes />
      </ChakraProvider>
    </div>
  );
}

export default App;
