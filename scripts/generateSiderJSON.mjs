/* eslint-disable no-undef */
import { join } from 'path';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import matter from 'gray-matter';

const INITIAL_SIDER_LIST = [
  { name: '웹' },
  { name: '오픈 소스' },
  { name: '자바스크립트' },
  { name: '타입스크립트' },
  { name: '리액트' },
  { name: '튜토리얼 / 트러블슈팅' },
];

const getFrontmatter = () => {
  const postsDir = join(process.cwd(), '/src/_posts');
  const fileNames = readdirSync(postsDir);

  const frontMatter = fileNames.map(fileName => {
    const filePath = join(postsDir, fileName);
    const metaData = readFileSync(filePath, 'utf8');

    const path = fileName.replace(/\.md$/, '');
    const {
      data: { title, category },
    } = matter(metaData);

    return {
      path,
      title,
      category,
    };
  });

  return frontMatter;
};

const generateSiderJSON = () => {
  const frontMatter = getFrontmatter();

  const siderData = INITIAL_SIDER_LIST.map(category => {
    const posts = frontMatter
      .filter(post => post.category === category.name)
      .map(({ title, path }) => ({
        title,
        path,
      }));

    return {
      ...category,
      posts,
    };
  });

  const siderJSON = JSON.stringify(siderData);
  writeFileSync('src/data/sider.json', siderJSON, { flag: 'w' });
};

try {
  generateSiderJSON();
  console.log('\x1b[32m', 'Successfully created sider data', '\x1b[0m');
} catch (error) {
  console.error('\x1b[31m', 'Failed to create sider data:', error, '\x1b[0m');
}
