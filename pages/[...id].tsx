import Layout from '../components/layout'
import { getAllTextIds, getTextData } from '../lib/texts'
import Head from 'next/head'
import Date from '../components/date'
import utilStyles from '../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'

export default function Text({
    textData
}: {
    textData: {
        title: string
        date: string
        contentHtml: string
    }
}) {
    return (
        <Layout>
            <Head>
                <title>{textData.title}</title>
            </Head>
            <article>
                <h1>{textData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={textData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: textData.contentHtml }} />
            </article>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllTextIds()
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const textData = await getTextData(params.id[2] as string)
    return {
        props: {
            textData
        }
    }
}
