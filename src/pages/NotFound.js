import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MetaData from '../components/common/SEO/MetaData';
import logo from '../assets/icons/moonkorea.png';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <MetaData metaTitle="404 페이지를 찾을 수 없습니다" />
      <Logo src={logo} />
      <h1>페이지를 찾을 수 없습니다.</h1>
      <RedirectButton onClick={() => navigate('/', { replace: true })}>
        홈으로 돌아가기
      </RedirectButton>
    </Container>
  );
};

const Container = styled.main`
  ${({ theme }) => theme.flexCustom('column', 'center', 'center')};
  width: 100vw;
  height: 90vh;
`;

const Logo = styled.img`
  height: 300px;
  width: 350px;
  min-width: 200px;
  margin-bottom: 5vh;
`;

const RedirectButton = styled.button`
  padding: 4px 18px;
  margin-top: 1vh;
  font-weight: 600;
  border-radius: 14px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgb(235, 235, 235);
  }
`;

export default NotFound;
