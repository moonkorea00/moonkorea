import logo from './logo.svg';
import './App.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

function App() {
  const codeString = 'const abc = () =>{}';
  const str = `body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }`;
  const highlighterStyle = {
    width: '50vw',
    height: '500px',
    borderRadius: '30px',
  };
  return (
    <>
      <SyntaxHighlighter language="javascript" customStyle={highlighterStyle}>
        {str}
      </SyntaxHighlighter>
      <pre>
        <code>const a = '1'</code>
      </pre>
      asasd
      {/* <blockquote style={{borderLeft: '3px solid grey', paddingLeft: '4px', backgroundColor: 'lightgrey', opacity:'0.6'}}> */}
      <blockquote style={{ color: 'grey' }}>
        dsadasd asdasddd
        <br />
        asdasd
      </blockquote>
      <p>asdds</p>
      {/* <pre><code>const abc = () => {return 'hi'}</code></pre> */}
      <p>
        The <code>push()</code> method
      </p>
      <span>
        this is an{' '}
        <span
          style={{
            backgroundColor: '#f7f7f7',
            borderRadius: '5px',
            padding: '0px 4.5px 1px 4.5px',
            margin: '10px 0 0 0',
          }}
        >
          example
        </span>{' '}
        of some text
      </span>
      <p>
        this is an{' '}
        <span
          style={{
            backgroundColor: '#f7f7f7',
            borderRadius: '10px',
            padding: '0px 4.5px 1px 4.5px',
            margin: '10px 0 0 0',
          }}
        >
          example
        </span>{' '}
        of some text
      </p>
      <span>안녕하세요 오늘부터 블로그를 쓰게 됐습니다</span>
      hr
    </>
  );
}

export default App;

export const highlighterStyle = {
  width: '50vw',
  height: '500px',
  borderRadius: '30px',
};