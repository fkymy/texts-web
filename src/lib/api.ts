import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const textsDir = path.join(process.cwd(), '_texts');

export function getAllTextPaths() {
  const filenames = fs.readdirSync(textsDir);

  return filenames.map((filename) => {
    // return {
    //     params: {
    //         id: filename.replace(/\.txt$/, '')
    //     }
    // }
    const fullpath = path.join(textsDir, filename);
    const contents = fs.readFileSync(fullpath, 'utf8');
    const matterResult = matter(contents);
    const year = matterResult.data.date.substring(0, 4);
    const month = matterResult.data.date.substring(5, 7);
    return {
      params: {
        id: [year, month, filename],
      },
    };
  });
}

export function getTextByFilename(filename: string, fields: string[] = []) {
  const fullpath = path.join(textsDir, filename);
  const fileContent = fs.readFileSync(fullpath, 'utf8');
  const { data, content } = matter(fileContent);

  type Item = {
    [key: string]: string;
  };

  const item: Item = {};

  fields.forEach((field) => {
    if (field === 'filename') {
      item[field] = filename;
    }
    if (field === 'content') {
      item[field] = content;
    }

    if (data[field]) {
      item[field] = data[field];
    }
  });
  return item;
}

export function getAllTexts(fields: string[] = []) {
  const filenames = fs.readdirSync(textsDir);
  const texts = filenames
    .map((filename) => getTextByFilename(filename, fields))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return texts;
}
