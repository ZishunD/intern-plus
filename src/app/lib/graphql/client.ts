import { GraphQLClient } from "graphql-request";

export const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/graphql`; // 或部署地址
export const client = new GraphQLClient(ENDPOINT);
