import GradientLayout from "../components/gradientLayout";

const Home = () => {
  return (
    <GradientLayout
      color="purple"
      isRoundedImage
      subtitle="profile"
      title="Jhon Smith"
      description="21 Public Playlists - 12 Followers - 20 Following"
      image="https://randomuser.me/api/portraits/men/20.jpg"
    >
      HOME
    </GradientLayout>
  );
};

export default Home;
