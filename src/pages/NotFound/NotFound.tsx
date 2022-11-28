import * as S from './NotFound.style';
import { useNavigate } from 'react-router-dom';
import MetaData from 'src/components/common/SEO/MetaData';
import logo from 'src/assets/icons/moonkorea.png'

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <MetaData metaTitle="404 페이지를 찾을 수 없습니다" />
      <S.Logo src={logo} alt="moonkorea" />
      <h1>페이지를 찾을 수 없습니다.</h1>
      <S.RedirectButton onClick={() => navigate('/', { replace: true })}>
        홈으로 돌아가기
      </S.RedirectButton>
    </S.Container>
  );
};

export default NotFound;
