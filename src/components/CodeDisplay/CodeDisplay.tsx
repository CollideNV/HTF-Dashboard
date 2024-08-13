import React from 'react'
import { Box } from '@mui/material'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeDisplayProps {
    code: string
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code }) => {
    return (
        <Box>
            <SyntaxHighlighter language="typescript" style={darcula}>
                {code}
            </SyntaxHighlighter>
        </Box>
    )
}

export default CodeDisplay
