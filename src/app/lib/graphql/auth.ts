import { gql } from "graphql-request";
import { client } from "./client";

export async function loginIntern(email: string, password: string): Promise<{ loginIntern: string }> {
  const mutation = gql`
    mutation LoginIntern($email: String!, $password: String!) {
      loginIntern(email: $email, password: $password)
    }
  `;
  return client.request(mutation, { email, password });
}

export async function loginHr(email: string, password: string) {
  const mutation = gql`
    mutation LoginHr($email: String!, $password: String!) {
      loginHr(email: $email, password: $password)
    }
  `;
  return client.request(mutation, { email, password });
}
