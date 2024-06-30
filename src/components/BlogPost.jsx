import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById, fetchUserById } from '../services/api';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    fetchPostById(id)
      .then(async (response) => {
        const postData = response.data;
        setPost(postData);
        // Fetch author details (assuming userId as author ID)
        const userResponse = await fetchUserById(postData.userId);
        const authorData = userResponse.data;
        setAuthor(authorData);
      })
      .catch(error => console.error('Error fetching post:', error));
  }, [id]);

  if (!post || !author) return <p>Loading...</p>;

  return (
    <div className="blog-post">
      <h1>{post.title}</h1>
      {author && (
        <div>
          <p>by {author.name}</p>
          <img src={`https://via.placeholder.com/300`} alt={author.name} />
        </div>
      )}
      <div>{post.body}</div>
    </div>
  );
};

export default BlogPost;
