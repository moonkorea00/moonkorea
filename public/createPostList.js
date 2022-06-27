
const path = require('path');
const fs = require('fs'); 

const dirPath = path.join(__dirname, '../src/posts');
let postList = [];

const getPosts = () => {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return console.log('Failed to list contents of directory: ' + err);
    }

    files.forEach((file, idx) => {
      let obj = {};
      let post;
      let CS = { name: '브라우저 / CS', variant: 'Browser&CS' }
      let JS = { name: '자바스크립트', variant: 'Javascript' }
      let React = {name: '리액트', variant: 'React'}
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
            // console.log(`METADATA: `,metaData)
            metaData.forEach(line => {
              obj[line.split(': ')[0]] = line.split(': ')[1];
            });
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
        // console.log(`LINES: `,lines)
        const metaDataIndices = lines.reduce(getMetaDataIndices, []);
        const metaData = parseMetaData({ lines, metaDataIndices }); 
        const content = parseContent({ lines, metaDataIndices });
        // console.log(`CONTENT: `,content)
        post = {
          id: idx + 1,
          title: metaData.title,
          category: metaData.category,
          path: metaData.title.replace("?","").replaceAll(" ", "-"),
          date: metaData.date ? metaData.date : '날짜 없음',
          content: content ? content : '내용 없음',
        };
        // console.log(`OBJ`,obj)
        setTimeout(() => {
          postList.push(post)
          setTimeout(() => {
            if (idx === files.length - 1) {
              postList.sort((a, b) => a.id - b.id);
              const csPost = postList.filter(post => post.category === 'Browser&CS').sort((a,b) => a.id - b.id)
              const jsPost = postList.filter(post => post.category === 'Javascript').sort((a,b) => a.id - b.id)
              const reactPost = postList.filter(post => post.category === 'React').sort((a,b) => a.id - b.id)
              const navData = [{...CS, subCategory: [...csPost]}, {...JS, subCategory:[...jsPost]}, {...React, subCategory:[...reactPost]}]
              let combinedPosts = JSON.stringify(postList);
              let navPosts = JSON.stringify(navData);
              fs.writeFileSync('src/posts.json', combinedPosts);
              fs.writeFileSync('src/nav.json', navPosts);
            }
          }, 2000);
        }, 2000);
      });
    });
  });
  return;
};

getPosts();

