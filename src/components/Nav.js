import styled from 'styled-components';
import * as FaIcons from 'react-icons/fa';
import { IconContext } from 'react-icons';
import favicon from '../assets/icons/moonkorea.png';
import { useNavigate } from 'react-router';

const Nav = () => {
  const navigate = useNavigate();
  const directToHome = () => {
    navigate('/');
  };
  return (
    <IconContext.Provider
      value={{ color: 'black', cursor: 'pointer', size: '18' }}
    >
      <NavMain>
        <HeadingWrapper>
          <Favicon
            src={favicon}
            alt="moonkorea"
            onClick={directToHome}
          ></Favicon>
          <Heading onClick={directToHome}>{BLOGDATA.blog_name}</Heading>
        </HeadingWrapper>
        <Links>
          <a
            href="https://github.com/moonkorea00"
            target="_blank"
            rel="noreferrer"
          >
            <FaIcons.FaGithub />
          </a>
          <span style={{ fontSize: '14px', fontWeight: '600' }}>
            &copy; {BLOGDATA.blog_name} {new Date().getFullYear()}
          </span>
        </Links>
      </NavMain>
    </IconContext.Provider>
  );
};

const BLOGDATA = { blog_name: 'moonkorea', github: <FaIcons.FaGithub /> };

const NavMain = styled.header`
  ${({ theme }) => theme.flexCustom(null, 'space-between', 'center')};
  height: 7vh;
  padding: 0 3vw;
  border-bottom: 1px solid lightgrey;
`;

const HeadingWrapper = styled.div`
  ${({ theme }) => theme.flexCustom(null, 'center', 'center')};
`;

const Favicon = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

const Heading = styled.span`
  margin-left: 0.5vw;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
`;

const Links = styled.div`
  ${({ theme }) => theme.flexCustom(null, 'center', 'center')};
  gap: 1vw;
  height: 7vh;
  margin-top: 2px;
`;
export default Nav;
