import { auth } from "@/auth";

const page = async () => {
  const session = await auth();

  return (
    <div className="bg-red-300 h-screen flex items-center justify-center text-6xl">
      <h2>Protected Page</h2>
      <p>{JSON.stringify(session)}</p>
    </div>
  );
};

export default page;
