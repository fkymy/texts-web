import Head from 'next/head';
import Layout, { siteTitle } from '../Layout';
import Link from 'next/link';
import Text from '../../types/Text';
import Intro from './Intro';

type Props = {
  allTexts: Text[];
};

const IndexPage = ({ allTexts }: Props) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Intro />
      <section className="texts">
        <ul className="text-list">
          {allTexts.map(({ filename, title, date }) => (
            <li key={filename} className="text-item">
              <Link
                href="/[...filename]"
                as={`/${date.substring(0, 4)}/${date.substring(
                  5,
                  7
                )}/${filename}`}
              >
                <a>{title}</a>
              </Link>
              <br />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default IndexPage;
