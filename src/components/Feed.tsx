import Image from "next/image";
import { api, type RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ErrorPage } from "./Error";
import { LoadingPage } from "./Loading";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getPosts"][number];

export type PostListProps = {
  posts: PostWithUser[];
};

interface PostProps {
  post: PostWithUser;
}



export const Feed = () => {

  const { data: posts, isLoading: postsLoading, isError } = api.posts.getPosts.useQuery();

  if(postsLoading) return <LoadingPage />;
  if(isError) return <ErrorPage />;

  return (
    <div className="flex flex-col items-center w-full gap-4">
      <div className="flex flex-col gap-4 w-3/4">
        {posts.length === 0 && <div className="text-white text-4xl text-bold">No posts yet!</div>}
        {posts.map((post) => (
          <Post key={post.post.id} post={post} />
        ))}
      </div>
    </div>
  );
}



const Post = ({ post }: PostProps) => {
  return (
    <div className="flex flex-col gap-4 border rounded h-32 text-white px-4 py-2">
      <div className="flex text-sm items-center gap-2">
        <Image src={post.author.profileImageUrl} alt="Chirp author" width={48} height={48} className="h-8 w-8 rounded-full"/>
        <p className="underline cursor-pointer">@{post.author.username}</p>
        <p className="text-gray-400 cursor-default">· {dayjs(post.post.createdAt).fromNow()}</p>
      </div>
      <p className="text-white">{post.post.content}</p>
    </div>
  )
}