import { Box, Flex, Input, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useSWRConfig } from "swr";
import NextImage from "next/image";
import { auth } from "../lib/mutations";

const AuthForm: FC<{ target: "signin" | "signup" }> = ({ target }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsloading(true);

    await auth(target, { email, password });
    setIsloading(false);
    router.push("/");
  };

  return (
    <Box height="100vh" width="100vw" bg="black">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="white 1px solid"
      >
        <NextImage src="/logo.svg" height={60} width={120} />
      </Flex>
      <Flex
        justify="center"
        align="center"
        height="calc(100vh - 100px)"
        bg="gray.800"
      >
        <Box padding="50px" bg="black" borderRadius="10px">
          <form onSubmit={submitHandler}>
            <Box marginBottom="10px">
              <Input
                placeholder="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box>
              <Input
                placeholder="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Box marginTop="20px">
              <Button
                type="submit"
                bg="green.500"
                color="white"
                _hover={{ bg: "green.700" }}
                isLoading={isLoading}
              >
                {target}
              </Button>
            </Box>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
