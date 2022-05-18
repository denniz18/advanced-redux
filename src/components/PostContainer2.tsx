import React from 'react';
import { IPost } from '../models/IPost';
import { postAPI } from '../services/PostService';
import { PostItem } from './PostItem';

export const PostContainer2 = () => {
  const { data: posts, error, isLoading } = postAPI.useFetchAllPostsQuery(100);
  const [updatePost] = postAPI.useUpdatePostMutation();
  const [deletePost] = postAPI.useDeletePostMutation();

  const handleRemove = async (post: IPost) => {
    await deletePost(post);
  };

  const handleUpdate = async (post: IPost) => {
    await updatePost(post);
  };

  return (
    <div>
      <div className="post__list">
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
