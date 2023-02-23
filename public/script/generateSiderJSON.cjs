const { join } = require('path');
const fs = require('fs');
const matter = require('gray-matter');

const INITIAL_SIDER_LIST = [
  { name: '브라우저 / CS', variant: 'Browser' },
  { name: '자바스크립트', variant: 'Javascript' },
  { name: '리액트', variant: 'React' },
  { name: 'AWS', variant: 'AWS' },
  { name: '튜토리얼 / 트러블슈팅', variant: 'Tutorial' },
];

const CATEGORY_VARIANT = ['Browser', 'Javascript', 'React', 'AWS', 'Tutorial'];

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

  const filterByCategory = cat =>
    frontMatter.filter(post => post.category === cat);

  const siderData = INITIAL_SIDER_LIST.map((el, i) => {
    if (el.variant === CATEGORY_VARIANT[i]) {
      return { ...el, posts: filterByCategory(el.variant) };
    }
  });

  const siderJSON = JSON.stringify(siderData);
  fs.writeFileSync('public/script/sider.json', siderJSON, { flag: 'w' });
};

generateSiderJSON();
