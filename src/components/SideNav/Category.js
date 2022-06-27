import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import styled from 'styled-components';
import Triangle from '../../assets/icons/Triangle.png';
import { css } from 'styled-components';
const Category = ({ item }) => {
  const { name, variant, subCategory } = item;
  const [subNav, setSubNav] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const decodeUri = decodeURI(pathname);

  const handleDisplaySubnav = () => {
    setSubNav(prev => !prev);
  };
  
  useEffect(() => {
    const condition = pathname.split('/')[1] === variant;
    condition && setSubNav(true);
  }, [name, pathname]);

  return (
    <CategoryWrapper>
      <div>
        <TriangleIcon
          src={Triangle}
          alt="icon"
          subNav={subNav}
          onClick={handleDisplaySubnav}
        />
        <CategoryItem onClick={handleDisplaySubnav}>{name}</CategoryItem>
      </div>
      {subNav &&
        subCategory.map(({ id, title, category, path }) => {
          const condition = decodeUri
            .split('/')
            .includes(path.split('/').pop());
          return (
            <PostWrapper>
              -
              <Post
                matchURI={condition}
                onClick={() => {
                  navigate(`/${category}/${path}`);
                }}
              >
                {title}
              </Post>
            </PostWrapper>
          );
        })}
    </CategoryWrapper>
  );
};

const CategoryWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5vh;
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
const PostWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  padding-left: 1.2vw;
`;

const Post = styled.span`
  margin: 0 0 0vh 0vw;
  padding: 0 0.5vw;
  font-size: 15px;
  line-height: 22px;
  color: #5d666d;

  ${({ matchURI }) =>
    matchURI &&
    css`
      margin-left: 0.3vw;
      border-radius: 10px;
      background-color: rgb(235, 235, 235);
      color: black;
      cursor: pointer;
      transition: all ease 0.5s;
    `}

  &:hover {
    border-radius: 10px;
    background-color: rgb(242, 242, 242);
    color: black;
    cursor: pointer;
  }
`;

export default Category;
