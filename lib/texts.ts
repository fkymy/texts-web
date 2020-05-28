import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const textsDir = path.join(process.cwd(), 'texts')

export function getSortedTextsData() {
    const filenames = fs.readdirSync(textsDir)
    const allTextsData = filenames.map(filename => {
        // const id = filename.replace(/\.txt/, '')
        const id = filename
        const fullpath = path.join(textsDir, filename)
        const contents = fs.readFileSync(fullpath, 'utf8')
        const matterResult = matter(contents)
        return {
            id,
            ...(matterResult.data as { date: string; title: string })
        }
    })
    return allTextsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export function getAllTextIds() {
    const filenames = fs.readdirSync(textsDir)
    return filenames.map(filename => {
        // return {
        //     params: {
        //         id: filename.replace(/\.txt$/, '')
        //     }
        // }
        const id = filename
        const fullpath = path.join(textsDir, filename)
        const contents = fs.readFileSync(fullpath, 'utf8')
        const matterResult = matter(contents)
        const year = matterResult.data.date.substring(0, 4)
        const month = matterResult.data.date.substring(5, 7)
        return {
            params: {
                id: [year, month, filename]
            }
        }
    })
}

export async function getTextData(id: string) {
    const fullpath = path.join(textsDir, `${id}`)
    const contents = fs.readFileSync(fullpath, 'utf8')
    const matterResult = matter(contents)
    const processedContents = await remark()
        .use(html)
        .process(matterResult.content)
    const contentHtml = processedContents.toString()
    return {
        id,
        contentHtml,
        ...(matterResult.data as { date: string; title: string })
    }
}
