import * as React from 'react';
import IndexPage from '../components/IndexPage';
import { GetStaticProps } from 'next';
import { getAllTexts } from '../lib/api';
import Text from '../types/Text';

type Props = {
  allTexts: Text[];
};

const Index = ({ allTexts }: Props) => {
  return <IndexPage allTexts={allTexts} />;
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const allTexts = getAllTexts(['filename', 'title', 'date']);

  return {
    props: { allTexts },
  };
};
