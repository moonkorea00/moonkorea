import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import postList from '../posts.json';

const usePost = () => {
  const [post, setPost] = useState({});
  const { category, path } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setPost(
      postList.find(post => post.category === category && post.path === path)
    );
    if (!post) {
      navigate('/page-not-found', { replace: true });
    }
  }, [post, navigate, category, path]);

  return post;
};

export default usePost;
