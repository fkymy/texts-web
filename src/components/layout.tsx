import styles from './Layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Meta from './Meta';
import Container from './Container';

export const siteTitle = 'texts';

type Props = {
  children: React.ReactNode;
  home?: boolean;
};

const Layout = ({ children, home }: Props) => {
  return (
    <>
      <Meta />
      <Container>
        <main>{children}</main>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>back</a>
            </Link>
          </div>
        )}
      </Container>
    </>
  );
};

export default Layout;
