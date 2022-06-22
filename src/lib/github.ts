import { graphql } from "@octokit/graphql"

export type WeekResult = {
  contributionDays: {
    contributionCount: number,
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
  const result = await graphql<GraphResult>(`
    query($userName:String!) { 
      user(login: $userName){
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
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