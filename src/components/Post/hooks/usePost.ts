import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import postList from 'src/posts.json';

interface Post {
  id?: number;
  title?: string;
  category?: string;
  content?: string;
  path?: string;
  date?: string;
}

const usePost = () => {
  const [post, setPost] = useState<Post>({});
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
