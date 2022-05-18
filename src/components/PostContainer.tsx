import React, { useState, useEffect } from 'react';
import { IPost } from '../models/IPost';
import { postAPI } from '../services/PostService';
import { PostItem } from './PostItem';

export const PostContainer = () => {
  const [limit, setLimit] = useState(100);
  const {
    data: posts,
    error,
    isLoading,
  } = postAPI.useFetchAllPostsQuery(limit);
  const [createPost] = postAPI.useCreatePostMutation();
  const [updatePost] = postAPI.useUpdatePostMutation();
  const [deletePost] = postAPI.useDeletePostMutation();

  useEffect(() => {
    // setTimeout(() => {
    //   setLimit(3);
    // }, 2000);
  }, []);

  const handleCreate = async () => {
    const title = prompt();
    await createPost({ title, body: title } as IPost);
  };

  const handleRemove = async (post: IPost) => {
    await deletePost(post);
  };

  const handleUpdate = async (post: IPost) => {
    await updatePost(post);
  };

  return (
    <div>
      <div className="post__list">
        <button onClick={handleCreate}>Add new post</button>
        {isLoading && <h1>Идет заагрузка...</h1>}
        {error && <h1>Something went wrong</h1>}
        {posts &&
          posts.map((post) => (
            <PostItem
              remove={handleRemove}
              update={handleUpdate}
              key={post.id}
              post={post}
            />
          ))}
      </div>
    </div>
  );
};
