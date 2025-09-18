import { gql } from "graphql-request";
import { client } from "./client";

export async function registerCompany(input: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number?: string;
  provider_id?: string;
  provider?: string;
  avatar_url?: string;
  application_id?: number;
}) {
  const mutation = gql`
    mutation CreateCompany($input: NewCompanyInput!) {
      createCompany(input: $input) {
        id
        first_name
        last_name
        email
      }
    }
  `;

  return client.request(mutation, { input });
}
