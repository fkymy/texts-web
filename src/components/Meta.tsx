import Head from 'next/head';
import { MY_NAME } from '../constants/about';

const Meta = () => {
  return (
    <Head>
      {/* <link rel="icon" href="/favicon.ico" /> */}
      <meta
        name="description"
        content={`texts for all and none by ${MY_NAME}.`}
      />
    </Head>
  );
};

export default Meta;
