/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require('path');
const fs = require('fs');
const matter = require('gray-matter');

const INITIAL_SIDER_LIST = [
  { name: '웹' },
  { name: '자바스크립트' },
  { name: '타입스크립트' },
  { name: '리액트' },
  { name: 'VSCode' },
  { name: '튜토리얼 / 트러블슈팅' },
];

const generateSiderJSON = () => {
  const postsDir = join(process.cwd(), '/src/_posts');
  const fileNames = fs.readdirSync(postsDir);

  const frontMatter = fileNames.map(fileName => {
    const filePath = join(postsDir, fileName);
    const metaData = fs.readFileSync(filePath, 'utf8');

    const path = fileName.replace(/\.md$/, '');
    const { data } = matter(metaData);

    return {
      path,
      ...data,
    };
  });

  const siderData = INITIAL_SIDER_LIST.map(category => ({
    ...category,
    posts: frontMatter.filter(post => post.category === category.name),
  }));

  const siderJSON = JSON.stringify(siderData);
  fs.writeFileSync('public/script/sider.json', siderJSON, { flag: 'w' });
};

generateSiderJSON();
