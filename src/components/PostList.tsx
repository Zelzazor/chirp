import { type Post } from "@prisma/client";

interface PostListProps {
  posts: Post[];
}


export const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <div className="flex flex-col gap-4 w-3/4">
        {posts.length === 0 && <div className="text-white text-4xl text-bold">No posts yet!</div>}
        {posts.map((post) => (
          <div key={post.id} className="flex flex-col gap-4 border rounded h-32 text-white px-4 py-2">
            <div className="flex text-sm justify-end">{post.createdAt.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} · {post.createdAt.toLocaleDateString()}</div>
            <p className="text-white">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}