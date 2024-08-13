const fs = require('fs')
var MarkdownIt = require('markdown-it'),
    markdown = new MarkdownIt()
const briefing = fs.readFileSync('./README.md', { encoding: 'utf8', flag: 'r' })

const html = markdown.render(briefing)
const escaped = html
    .replace(/{|}/g, (b) => `{\'${b}\'}`)
    .replace(/<img (.*)\">/g, (b) => `${b}</img>`)

const component = `
import styles from './BriefingText.module.scss'

const BriefingText = () => ( <div className={styles.BriefingText}>
        ${escaped}
    </div>
);

export default BriefingText;
`

fs.writeFileSync('./src/components/BriefingText/BriefingText.tsx', component)
