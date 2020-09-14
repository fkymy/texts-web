import * as React from 'react';
import TextPage from '../components/TextPage';
import { getAllTextPaths, getTextByFilename } from '../lib/api';
import { GetStaticProps, GetStaticPaths } from 'next';
import markdownToHtml from '../lib/textToHtml';
import TextType from '../types/Text';

type Props = {
  text: TextType;
};

export default function Text({ text }: Props) {
  return <TextPage text={text} />;
}

export async function getStaticPaths() {
  const paths = getAllTextPaths();

  return {
    paths,
    fallback: false,
  };
}

type Params = {
  params: {
    id: [string, string, string];
  };
};

export async function getStaticProps({ params }: Params) {
  const text = getTextByFilename(params.id[2], [
    'filename',
    'title',
    'date',
    'content',
  ]);

  const content = await markdownToHtml(text.content || '');

  return {
    props: {
      text: {
        ...text,
        content,
      },
    },
  };
}
