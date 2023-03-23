import { SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";


export const CreatePostWizard = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  

  if(!isLoaded) return <div className="text-xl flex justify-center items-center">Loading...</div>;

  return (
    <div>
      {isSignedIn && (
        <div className="flex gap-4 justify-between">
          <div className="flex gap-3 grow">
          <Image src={user.profileImageUrl} alt="Profile Picture" width={48} height={48} className="rounded-full" />
          <input type="text" className="bg-transparent w-full outline-none" placeholder="Type some emojis!" />
          </div>
            <SignOutButton>
                <button className=" bg-slate-400 px-6 py-2 rounded">Sign out</button>
            </SignOutButton>
        </div>
      )}
    </div>
  )
  

}