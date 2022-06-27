import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import styled from 'styled-components';
import Triangle from '../../assets/icons/Triangle.png';

const Category = ({ item }) => {
  const { name, subCategory } = item;
  const [subNav, setSubNav] = useState(true);
  const navigate = useNavigate();
  const {pathname} = useLocation();
  // console.log(pathname.split("/"))
  const handleDisplayNav = () => {
    setSubNav(prev => !prev);
  };
  return (
    <CategoryWrapper>
      <TriangleIcon
        src={Triangle}
        alt="icon"
        subNav={subNav}
        onClick={handleDisplayNav}
      />
      <CategoryItem onClick={handleDisplayNav}>{name}</CategoryItem>
      {subNav &&
        subCategory.map(({ id,title, category, path }) => (
          <PostWrapper>
            <Post
              key={id}
              onClick={() => {
                navigate(`/${category}/${path}`);
              }}
            >
              - {title}
            </Post>
          </PostWrapper>
        ))}
    </CategoryWrapper>
  );
};

const CategoryWrapper = styled.section`
  ${({ theme }) => theme.inlineFlexStart}
`;

const TriangleIcon = styled.img`
  width: 7px;
  height: 7px;
  margin-bottom: 2px;
  transform: ${({ subNav }) => (subNav ? '' : 'rotate(-90deg)')};
  transition: all ease 0.3s;
  cursor: pointer;
`;

const CategoryItem = styled.span`
  margin-left: 8px;
  cursor: pointer;
`;
const PostWrapper = styled.div``;

const Post = styled.span`
  margin: 0 0 0.5vh 1vw;
  font-size: 15px;
  color: #5d666d;
  padding: 0.4vh 0.5vw;

  &:hover {
    border-radius: 10px;
    background-color: rgb(242, 242, 242);
    /* font-weight: 500; */
    color: black;
    cursor: pointer;
  }
`;

export default Category;
