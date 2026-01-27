import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const page = async () => {
  const session = await auth();

  return (
    <div className="bg-red-300 h-screen flex items-center justify-center text-6xl relative">
      <h2>Protected Page</h2>
      {/* <p>{JSON.stringify(session)}</p> */}
      <form action={async() => {
        "use server";
        await signOut();
      }}>
        <Button className="absolute top-2 right-2" variant={"default"} type="submit">
          Log out
        </Button>
      </form>
    </div>
  );
};

export default page;
