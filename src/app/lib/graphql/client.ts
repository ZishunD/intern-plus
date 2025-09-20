import { GraphQLClient } from "graphql-request";

export const ENDPOINT = `http://localhost:4000/graphql`; // 或部署地址
export const client = new GraphQLClient(ENDPOINT);
