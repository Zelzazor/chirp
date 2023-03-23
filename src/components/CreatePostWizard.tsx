import { SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { api } from "~/utils/api";
import { Spinner } from "./Spinner";


export const CreatePostWizard = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const ctx = api.useContext();
  const {mutate: createPost, isLoading: isPosting} = api.posts.create.useMutation({
    onSuccess: () => {
      void ctx.posts.getPosts.invalidate();
    }
  });



  

  if(!isLoaded) return <Spinner />;

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") {
      createPost({content: e.currentTarget.value});
      e.currentTarget.value = "";
    }
  }

  return (
    <div>
      {isSignedIn && (
        <div className="flex gap-4 justify-between">
          <div className="flex gap-3 grow">
          <Image src={user.profileImageUrl} alt="Profile Picture" width={48} height={48} className="rounded-full" />
          <input 
            type="text" 
            className="bg-transparent w-full outline-none" 
            placeholder="Type some emojis!" 
            onKeyDown={onKeyDown}
            disabled={isPosting} 
          />
          </div>
            <SignOutButton>
                <button className=" bg-slate-400 px-6 py-2 rounded">Sign out</button>
            </SignOutButton>
        </div>
      )}
    </div>
  )
  

}