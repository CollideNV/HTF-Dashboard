import { BadgeType } from './BadgeType'
import { Mission } from './Mission'

export interface Problem {
    badgeUrl: BadgeType
    description: string
    name: string
    score: number
    solved: boolean
    mission: Mission[]
}
