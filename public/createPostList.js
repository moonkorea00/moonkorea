const path = require('path');
const fs = require('fs');

const dirPath = path.join(__dirname, '../src/posts');
let postList = [];

const getPosts = () => {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return console.log('Failed to list contents of directory: ' + err);
    }
    console.log('START');
    files.forEach((file, idx) => {
      // console.log('start');
      let obj = {};
      let post;
      const initialNavArr = [
        { name: '브라우저 / CS', variant: 'Browser&CS' },
        { name: '자바스크립트', variant: 'Javascript' },
        { name: '리액트', variant: 'React' },
        { name: 'AWS', variant: 'AWS' },
      ];
      const categoryVariant = ['Browser&CS', 'Javascript', 'React', 'AWS'];
      fs.readFile(`${dirPath}/${file}`, 'utf8', (err, contents) => {
        const getMetaDataIndices = (acc, el, idx) => {
          if (/^---/.test(el)) {
            acc.push(idx);
          }
          return acc;
        };
        const parseMetaData = ({ lines, metaDataIndices }) => {
          if (metaDataIndices.length > 0) {
            let metaData = lines.slice(
              metaDataIndices[0] + 1,
              metaDataIndices[1]
            );
            metaData.forEach(line => {
              obj[line.split(': ')[0]] = line.split(': ')[1];
            });
            // console.log(`obj: `, obj)
            return obj;
          }
        };
        const parseContent = ({ lines, metaDataIndices }) => {
          if (metaDataIndices.length > 0) {
            lines = lines.slice(metaDataIndices[1] + 1, lines.length);
          }
          return lines.join('\n');
        };
        const lines = contents.split('\n');
        const metaDataIndices = lines.reduce(getMetaDataIndices, []);
        const metaData = parseMetaData({ lines, metaDataIndices });
        const content = parseContent({ lines, metaDataIndices });
        post = {
          id: idx + 1,
          title: metaData.title,
          category: metaData.category,
          path: metaData.title.replace('?', '').replaceAll(' ', '-'),
          date: metaData.date ? metaData.date : '날짜 없음',
          content: content ? content : '내용 없음',
        };
        postList.push(post);
        // console.log('postList update');
        setTimeout(() => {
          const filterByCategory = cat => {
            return postList
              .filter(post => post.category === cat)
              .sort((a, b) => a.id - b.id);
          };
          if (idx === files.length - 1) {
            const navData = initialNavArr.map((el, i) => {
              if (el.variant === categoryVariant[i]) {
                return { ...el, posts: filterByCategory(el.variant) };
              }
            });
            postList.sort((a, b) => a.id - b.id);
            const postsJSON = JSON.stringify(postList);
            const navJSON = JSON.stringify(navData);
            fs.writeFileSync('src/posts.json', postsJSON, { flag: 'w' });
            fs.writeFileSync('src/nav.json', navJSON, { flag: 'w' });
            console.log('END, POSTS: ', idx);
          }
        }, 2000);
      });
    });
  });
  return;
};

getPosts();
