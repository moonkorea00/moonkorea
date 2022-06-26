import styled from 'styled-components';
import { useState } from 'react';
import Triangle from '../../assets/icons/Triangle.png';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toggleList } from '../../modules/post';
const Category = ({ name }) => {
  // const [isRotate, setIsRotate] = useState(false);
  const {isListVisible} = useSelector(state => ({isListVisible: state.post.isListVisible}))
  const dispatch = useDispatch();

  return (
    <>
      <TriangleIcon
        src={Triangle}
        alt="icon"
        isListVisible={isListVisible}
        onClick={dispatch(toggleList)}
      />
      <CategoryItem>{name}</CategoryItem>
    </>
  );
};
const TriangleIcon = styled.img`
  width: 10px;
  height: 10px;
  transform: ${({ isListVisible }) => (isListVisible ? '' : 'rotate(-90deg)')};
  transition: all ease 0.3s;
  cursor: pointer;
`;

const CategoryItem = styled.span`
  margin-left: 8px;
  /* font-size: 18px; */
  font-weight: bold;
`;

export default Category;
