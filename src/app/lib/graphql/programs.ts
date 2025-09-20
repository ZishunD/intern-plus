
import { gql } from "graphql-request";
import { client } from "./client";

interface Program {
  id: number;
  title: string;
  description: string;
  category: string;
  total_positions: number;
}

interface SumResponse{
    programSum?: number;
  positionSum?: number;}

interface CategoryResponse{
    categorySum?: {
    sum: number;
    category: string[];
  }[];
}

// 根据 title 获取实习项目
export async function getProgramByCategory(category: string): Promise<{ internPrograms: Program[] }> {
  const query = gql`
    query GetProgramByTitle($category: String!) {
      internPrograms(filter: { category: $category }) {
        id
        title
        description
        category
        total_positions
        location
      }
    }
  `;
  const data = await client.request<{ internPrograms: Program[] }>(query, { category });
  return data;
};


// Get total number of programs
export async function getProgramSum(): Promise<SumResponse> {
  const query = gql`
    query GetProgramSum {
      programSum
    }
  `;
  const data = await client.request<{ programSum: number }>(query);
  console.log(data);
  return { programSum: data.programSum };
}

// Get total number of positions
export async function getPositionSum(): Promise<SumResponse> {
  const query = gql`
    query GetPositionSum {
      positionSum
    }
  `;
  const data = await client.request<{ positionSum: number }>(query);
  console.log(data);
  return { positionSum: data.positionSum };
}

// Get category sums
export async function getCategorySum(): Promise<CategoryResponse> {
  const query = gql`
    query GetCategorySum {
      categorySum {
        sum
        category
      }
    }
  `;
  const data = await client.request<{ categorySum: { sum: number; category: string[] }[] }>(query);
  console.log(data);
  return { categorySum: data.categorySum };
}