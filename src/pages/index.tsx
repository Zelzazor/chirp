import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { PostList } from "~/components/PostList";
import { api } from "~/utils/api";

const Home: NextPage = () => {

  const { user, isSignedIn, isLoaded } = useUser();
  const { data, isLoading, isError } = api.posts.getPosts.useQuery();

  if(!isLoaded || isLoading) return <div className="text-white text-4xl text-bold">Loading...</div>;

  if(isError) return <div className="text-white text-4xl text-bold">Error</div>;


  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <nav className="flex items-end flex-col p-4">
        { isSignedIn ? (
          <div className="flex text-white gap-4">
            <h2 className="text-2xl font-bold">Welcome, {user.firstName}!</h2>
            <SignOutButton>
              <button className=" bg-slate-400 px-6 py-2 rounded">Sign out</button>
            </SignOutButton>
          </div>
        ) : (
          <div className="flex text-white gap-4">
            <h2 className="text-2xl font-bold">Wanna share some ideas? Sign in!</h2>
            <SignInButton >
              <button className=" bg-slate-400 px-6 py-2 rounded">Sign in</button>
            </SignInButton>
          </div>
        )}
        </nav>
        <section className="flex justify-center mt-4">
          <PostList posts={data} />
        </section>
        
        
      </main>
    </>
  );
};

export default Home;
