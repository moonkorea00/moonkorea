import * as S from './Sider.style';
import NavCategory from './NavCategory/NavCategory';
import navData from '../../nav.json';

const Sider = () => {
  return (
    <S.Container>
      {navData.map((item, idx) => (
        <NavCategory item={item} key={idx} />
      ))}
    </S.Container>
  );
};

export default Sider;
