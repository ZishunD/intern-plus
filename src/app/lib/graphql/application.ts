import { gql } from "graphql-request";
import { client } from "./client";

interface Application {
  status: string;
  title: string;
  location: string;
  start_date: Date;
  end_date: Date;
  application_id: string;
  internship_type: string;
}

export default async function getApplicationById(application_id:string):Promise<Application|null>{
    const query = gql`
    query getApplicationById($application_id: String!) {
      getApplicationById(application_id: $application_id) {
        application_id
      title
      status
      location
      start_date
      end_date
      internship_type
      }
    }
  `;
  const res = await client.request<{ getApplicationById: any }>(query, { application_id });

  // 手动把 string 转成 Date
  const app = res.getApplicationById;
  console.log("Initial",app)
  return {
    ...app,
    start_date: new Date(Number(app.start_date)),
    end_date: new Date(Number(app.end_date)),
  };
}