import { Box, Flex, Text, Image } from "@chakra-ui/react";
import GradientLayout from "../components/gradientLayout";
import prisma from "../lib/prisma";

const Home = ({ artists }) => {
  return (
    <GradientLayout
      color="gray"
      isRoundedImage
      subtitle="profile"
      title="Jhon Smith"
      description="21 Public Playlists - 12 Followers - 20 Following"
      image="https://randomuser.me/api/portraits/men/20.jpg"
    >
      <Box color="white">
        <Box marginBottom="20px">
          <Text fontWeight="bold">Top Artists this month</Text>
          <Text fontSize="x-small">Only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box
              bg="gray.900"
              borderRadius="4px"
              padding="20px 10px"
              marginRight="20px"
              width="150px"
            >
              <Box>
                <Image
                  boxSize="100%"
                  src="https://randomuser.me/api/portraits/men/20.jpg"
                  borderRadius="50%"
                  boxShadow="2xl"
                />
              </Box>
              <Box marginTop="20px">
                <Text fontSize="sm" fontWeight="bold">
                  {artist.name}
                </Text>
                <Text fontSize="x-small">Artist</Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});

  return {
    props: { artists },
  };
};

export default Home;
