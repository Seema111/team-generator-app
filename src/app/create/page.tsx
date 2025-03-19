import CreatePlayer from "@/app/create/components/CreatePlayer";
import CreateTeam from "@/app/create/components/CreateTeam";

const CreatePage = async () => {
  return (
    <>
      <CreatePlayer />
      <CreateTeam />
    </>
  );
};

export default CreatePage;
