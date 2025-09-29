
import { gql } from "graphql-request";
import { client } from "./client";

interface Program {
  id: string;
  title: string;
  description: string;
  category: string;
  total_positions: number;
  location:string | null;
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

//search program by id
export async function searchProgramById(id: string): Promise<{ program: Program | null }> {
  try {
    const query = gql`
      query SearchProgramById($id: ID!) {
        program(id: $id) {
          id
          title
          description
          category
          total_positions
          location
        }
      }
    `;
    return await client.request<{ program: Program }>(query, { id });
  } catch (err) {
    console.error("searchProgramById failed:", err);
    return { program: null };
  }
}


// Search programs by keyword
export async function searchPrograms(key: string): Promise<{ programs: Program[] }> {
  const query = gql`
    query SearchPrograms($key: String!) {
      programs(key: $key) {
        id
        title
        description
        category
        total_positions
        location
      }
    }
  `;

  return await client.request<{ programs: Program[] }>(query, { key });
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