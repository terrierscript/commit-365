import { graphql } from "@octokit/graphql"

export const userGraph = async (username: string) => {
  const result = await graphql<{
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number,
          week: {
            contributionDays: {
              contributionCount: number,
              date: string
            }
          }
        }
      }
    }
  }>(`
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
  return result.user.contributionsCollection
}