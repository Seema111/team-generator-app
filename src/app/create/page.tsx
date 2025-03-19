import CreatePlayer from "@/app/create/components/CreatePlayer";
import CreateTeam from "@/app/create/components/CreateTeam";
import CreateMatch from "./components/CreateMatch";

const CreatePage = async () => {
  return (
    <div className="relative w-full max-w-6xl bg-white shadow-lg inset-shadow-2xs rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row gap-6">
      <CreatePlayer />
      <CreateTeam />
      <CreateMatch />
    </div>
  );
};

export default CreatePage;
