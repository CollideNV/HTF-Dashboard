import { BadgeType } from './BadgeType'
import { Tool } from './Tool'

export interface Problem {
    badgeUrl: BadgeType
    description: string
    name: string
    score: number
    solved: boolean
    tools: Tool[]
}
