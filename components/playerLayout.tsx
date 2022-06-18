import { Box } from "@chakra-ui/layout";
import Sidebar from "./sidebar";

const PlayerLayout = ({ children }) => {
  return (
    <Box width="100vw" height="100vh">
      <Box
        position="absolute"
        height="calc(100vh - 100px)"
        width="250px"
        top="0"
        left="0"
      >
        <Sidebar />
      </Box>
      <Box marginLeft="250px" height="calc(100vh - 100px)">
        {children}
      </Box>
      <Box position="absolute" left="0" bottom="0">
        PLAYER
      </Box>
    </Box>
  );
};

export default PlayerLayout;
