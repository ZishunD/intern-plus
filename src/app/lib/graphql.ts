import { gql, request, GraphQLClient } from "graphql-request";

const ENDPOINT = "http://localhost:8080/query"; // 或者你部署的后端地址
const client = new GraphQLClient(ENDPOINT);

export async function registerUser(input: {
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
    mutation CreateIntern($input: NewInternInput!) {
      createIntern(input: $input) {
        id
        first_name
        last_name
        email
      }
    }
  `;

  console.log("Sending input:", input);

  return client.request(mutation, { input });
}
