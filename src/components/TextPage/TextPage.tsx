import Head from 'next/head';
import Layout, { siteTitle } from '../Layout';
import Container from '../Container';
import Link from 'next/link';
import Date from '../Date';
import Text from '../../types/Text';
import utilStyles from '../../styles/utils.module.css';

type Props = {
  text: Text;
};

const TextPage = ({ text }: Props) => {
  return (
    <Layout>
      <Head>
        <title>{text.title}</title>
      </Head>
      <article className={utilStyles.text}>
        <h4>{text.title}</h4>
        <small>
          <Date dateString={text.date} />
        </small>
        <div dangerouslySetInnerHTML={{ __html: text.content }} />
      </article>
    </Layout>
  );
};

export default TextPage;
