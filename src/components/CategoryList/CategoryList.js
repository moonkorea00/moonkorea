import styled from 'styled-components';
import postList from '../../posts.json';
import Category from './Category';
import { useNavigate } from 'react-router';

const CategoryList = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {CATEGORY.map(({ name, variant }, idx) => (
        <>
          <Category name={name} />
          {postList.map(({ category, id, title }) => (
            <>
              {category === variant && (
                <ul>
                  <PostItem
                    onClick={() => {
                      navigate(`/${category}/${id}`);
                    }}
                  >
                    {title}
                  </PostItem>
                </ul>
              )}
            </>
          ))}
        </>
      ))}
    </Layout>
  );
};

const CATEGORY = [
  { name: '브라우저 / CS', variant: 'Browser&CS' },
  { name: '자바스크립트', variant: 'Javascript' },
  { name: '리액트', variant: 'React' },
];

const Layout = styled.nav`
  width: 35%;
  /* width: 100%; */
  height: 90vh;
  margin: 0;

  padding: 0;
  border-right: 1px solid lightgrey;
  overflow-y: scroll;
  /* overflow-y: hidden; */
  overscroll-behavior-y: none;
`;

const PostItem = styled.li`
  cursor: pointer;
  margin-bottom: -5px;
  list-style: none;
`;

// const SubCategory = styled.li``;
export default CategoryList;
