import { graphql } from "@octokit/graphql"
import { subDays } from "date-fns"

export type ContributionLevel = "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE"

export type WeekResult = {
  contributionDays: {
    contributionCount: number,
    contributionLevel: ContributionLevel
    date: string
  }[]
}[]

export type GraphResult = {
  user: {
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number,
        weeks: WeekResult
      }
    }
  }
}

export const userGraph = async (username: string): Promise<WeekResult> => {
  const start = subDays(new Date(), 180).toISOString()
  const end = new Date().toISOString()
  //         // 

  // contributionsCollection{
  const result = await graphql<GraphResult>(`
    query($userName:String!) { 
      user(login: $userName){
        contributionsCollection(from: "${start}", to: "${end}") {

          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                contributionLevel
                date
              }
            }
          }
        }
      }
    }
  `, {
    userName: username,
    headers: {
      authorization: `token ${process.env.GITHUB_API_TOKEN}`
    }
  })
  return result.user.contributionsCollection.contributionCalendar.weeks
}