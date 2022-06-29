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

  const condition = pathname.split('/')[1] === variant;
  useEffect(() => {
    condition && setSubNav(true);
  }, [condition]);

  return (
    <CategoryWrapper>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TriangleIcon
          src={Triangle}
          alt="icon"
          subNav={subNav}
          onClick={handleDisplaySubnav}
        />
        <CategoryItem condition={condition} onClick={handleDisplaySubnav}>
          {name}
        </CategoryItem>
      </div>
      {subNav &&
        subCategory.map(({ id, title, category, path }) => {
          const matchUriCondition = decodeUri
            .split('/')
            .includes(path.split('/').pop());
          return (
            <PostWrapper matchUriCondition={matchUriCondition}>
              -
              <Post
                onClick={() => {
                  navigate(`/moonkorea/${category}/${path}`);
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
  transform: ${({ subNav }) => (subNav ? '' : 'rotate(-90deg)')};
  transition: all ease 0.3s;
  cursor: pointer;
`;

const CategoryItem = styled.span`
  margin-left: 0.6vw;
  font-weight: ${({ condition }) => condition && '900'};
  cursor: pointer;
`;

const PostWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  padding-left: 1.2vw;
  margin-bottom: 0.3vh;

  ${({ matchUriCondition }) =>
    matchUriCondition &&
    css`
      margin-left: 0.3vw;
      border-radius: 4px;
      background-color: rgb(235, 235, 235);
      color: black;
      transition: all ease 0.5s;
    `}

  &:hover {
    border-radius: 4px;
    color: black;
    background-color: rgb(235, 235, 235);
    transition: all ease 0.5s;
  }
`;

const Post = styled.div`
  padding: 0.8vh 0 0.8vh 0.5vw;
  font-size: 14px;
  line-height: 25px;
  color: #364149;
  cursor: pointer;
`;

export default Category;
