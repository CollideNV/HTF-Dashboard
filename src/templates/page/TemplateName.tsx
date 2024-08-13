import { FC } from 'react'
import styles from './TemplateName.module.scss'

interface TemplateNameProps {
    'data-testid'?: string
}

const TemplateName: FC<TemplateNameProps> = ({
    'data-testid': dataTestId = 'TemplateName'
}) => {
    return (
        <div className={styles.TemplateName} data-testid={dataTestId}>
            TemplateName Component
        </div>
    )
}

export default TemplateName
