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

export async function loginCompany(email: string, password: string) {
  const mutation = gql`
    mutation LoginCompany($email: String!, $password: String!) {
      loginCompany(email: $email, password: $password)
    }
  `;
  return client.request(mutation, { email, password });
}
