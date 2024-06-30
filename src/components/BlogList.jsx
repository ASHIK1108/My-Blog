import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts, fetchUserById } from '../services/api';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts()
      .then(async (response) => {
        const postsData = response.data;
        const postsWithAuthors = await Promise.all(
          postsData.map(async (post) => {
            const userResponse = await fetchUserById(post.userId);
            const author = userResponse.data;
            return { ...post, author };
          })
        );
        setPosts(postsWithAuthors);
        setLoading(false); 
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div className="blog-list">
      { (
        <>
          {posts.length > 0 ? (
            posts.map(post => (
              <div key={post.id} className="blog-preview">
                <div className="blog-content">
                  <h2>{post.title}</h2>
                  {post.author && (
                    <div>
                      <p>by {post.author.name}</p>
                      <img src={`https://via.placeholder.com/150`} alt={post.title} />
                    </div>
                  )}
                  <p>{post.body.substring(0, 100)}...</p>
                  <Link to={`/posts/${post.id}`} className="read-more-link">Read more</Link>
                </div>
              </div>
            ))
          ) : (
            <p>Loading.....</p>
          )}
        </>
      )}
    </div>
  );
};

export default BlogList;
