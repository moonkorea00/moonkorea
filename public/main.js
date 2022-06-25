const path = require('path');
const fs = require('fs');

const dirPath = path.join(__dirname, '../src/posts');
let postList = [];

const getPosts = () => {
  fs.readdir(dirPath, (err, files) => {
    console.log('NUMBER OF FILES: ', files.length);
    if (err) {
      return console.log('Failed to list contents of directory: ' + err);
    }

    files.forEach((file, idx) => {
      let obj = {};
      let post;
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
        const metaDataIndices = lines.reduce(getMetaDataIndices, []); // get indices of lines with "---"
        const metaData = parseMetaData({ lines, metaDataIndices }); // create fn and save in
        const content = parseContent({ lines, metaDataIndices });
        // console.log(`CONTENT: `,content)
        post = {
          id: idx + 1,
          title: metaData.title ? metaData.title : '제목없음',
          category: metaData.category ? metaData.category : '글쓴이 없음',
          date: metaData.date ? metaData.date : '날짜 없음',
          content: content ? content : '내용 없음',
        };
        setTimeout(() => {
          postList.push(post);
          if (idx === files.length - 1) {
            let data = JSON.stringify(postList);

            fs.writeFileSync('src/posts.json', data);
          }
        }, 500);
      });
    });
  });
  // setTimeout(() => {
  //   console.log(postList);
  // }, 500);
  return;
};

getPosts();
