import { useTitle } from '../hooks/useTitle';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import logo from '../assets/icons/moonkorea.png';
import MetaData from './MetaData';
const NotFound = () => {
  const navigate = useNavigate();
  // useTitle('404 페이지를 찾을 수 없습니다');
  const title = "404 페이지를 찾을 수 없습니다"

  return (
    <Container>
      <MetaData metaTitle={title}/>
      <Logo src={logo} />
      <h1>페이지를 찾을 수 없습니다.</h1>
      <RedirectButton
        onClick={() => {
          navigate('/', { replace: true });
        }}
      >
        메인으로 돌아가기
      </RedirectButton>
    </Container>
  );
};
const Container = styled.main`
${({ theme }) => theme.flexCustom('column','center','center')};
  width: 100vw;
  height: 90vh;
`;

const Logo = styled.img`
  height: 30vh;
  width: 18vw;
  margin-bottom: 5vh;
`;

const RedirectButton = styled.button`
  padding: 0.8vh 1vw;
  margin-top: 1vh;
  font-weight: 600;
  border-radius: 10px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgb(235, 235, 235);
  }
`;

export default NotFound;
