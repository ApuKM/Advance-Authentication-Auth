import { auth, signOut } from "@/auth";
import Social from "@/components/Social";
import { Button } from "@/components/ui/button";

const page = async () => {
  const session = await auth();

  return (
    <div className="bg-red-300 h-screen flex flex-col gap-8 items-center justify-center text-6xl relative">
      <div>
        <h2>Protected Page</h2>
        {/* <p>{JSON.stringify(session)}</p> */}
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button
            className="absolute top-2 right-2"
            variant={"default"}
            type="submit"
          >
            Log out
          </Button>
        </form>
      </div>
      <Social page={"protected"} />
    </div>
  );
};

export default page;
