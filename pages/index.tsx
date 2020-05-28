import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedTextsData } from '../lib/texts'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'

export default function Home({
    allTextsData
}: {
    allTextsData: {
    date: string
    title: string
    id: string
    }[]
}) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className="texts">
                <ul className="textList">
                    {allTextsData.map(({ id, date, title }) => (
                        <li className="textItem" key={id}>
                            <Link href="/[...id]" as={`/${date.substring(0,4)}/${date.substring(5,7)}/${id}`}>
                                <a>{title}</a>
                            </Link>
                            <br />
                            <small className="date">
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const allTextsData = getSortedTextsData()
    return {
        props: {
            allTextsData
        }
    }
}
