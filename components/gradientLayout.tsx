import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";

const GradientLayout = ({
  color,
  children,
  image,
  subtitle,
  title,
  description,
  isRoundedImage,
}) => {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 10%, ${color}.700 30%, rgba(0,0,0,0.90) 50%)`}
    >
      <Flex bg={`${color}.600`} padding="50px 20px 20px" align="end">
        <Box>
          <Image
            boxSize="160px"
            boxShadow="2xl"
            src={image}
            borderRadius={isRoundedImage ? "50%" : "3px"}
          />
        </Box>
        <Box marginLeft="20px" lineHeight="40px" color="white">
          <Text fontSize="x-small" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="6xl">{title}</Text>
          <Text fontSize="x-small">{description}</Text>
        </Box>
      </Flex>
      <Box padding="50px 20px 20px">{children}</Box>
    </Box>
  );
};

export default GradientLayout;
