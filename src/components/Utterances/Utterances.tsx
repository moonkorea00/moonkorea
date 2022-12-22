import { memo } from 'react';

const Utterances = () => {
  return (
    <section
      ref={el => {
        const scriptElement = document.createElement('script');
        scriptElement.setAttribute('src', 'https://utteranc.es/client.js');
        scriptElement.setAttribute('async', 'true');
        scriptElement.setAttribute('repo', 'moonkorea00/moonkorea');
        scriptElement.setAttribute('issue-term', 'pathname');
        scriptElement.setAttribute('label', 'post-comment');
        scriptElement.setAttribute('theme', 'github-light');
        scriptElement.setAttribute('crossorigin', 'anonymous');
        el?.appendChild(scriptElement);
      }}
    />
  );
};

export default memo(Utterances);
