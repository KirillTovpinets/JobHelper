import request, { gql } from "graphql-request";

export interface Question {
  id: number;
  title: string;
  content?: string;
  extendedContent?: {
    markdown?: string;
  };
}
interface CoverLetterType {
  markdown?: string;
  html?: string;
  row?: string;
  text?: string;
}
interface QuestionsResponse {
  questions: Question[];
  coverLetter: {
    content: CoverLetterType;
  };
}

const GRAPHQL_URL =
  "https://api-us-west-2.hygraph.com/v2/clajqe6np361801ukcmef3zt4/master";
export const createQuestionQuery = async (data: Question) => {
  const query = gql`
    mutation createQuestion($data: QuestionCreateInput!) {
      createQuestion(data: $data) {
        id
      }
    }
  `;

  const response: { createQuestion: Question } = await request({
    url: GRAPHQL_URL,
    document: query,
    variables: {
      data,
    },
  });

  const publishedResponse: { publishQuestion: Question } = await request({
    url: GRAPHQL_URL,
    document: gql`
      mutation publishQuestion($id: ID) {
        publishQuestion(where: { id: $id }) {
          content
          title
        }
      }
    `,
    variables: {
      id: response.createQuestion.id,
    },
  });
  return publishedResponse.publishQuestion;
};

export const fetchJobData = async (
  coverLetterType: keyof CoverLetterType = "markdown"
) => {
  const query = gql`
    query jobData($coverLetterWhere: CoverLetterWhereUniqueInput!) {
      questions {
        title
        content
        extendedContent{
          markdown
        }
      }
      coverLetter(where: $coverLetterWhere) {
        content {
          ${coverLetterType}
        }
      }
    }
  `;

  const response = (await request({
    url: GRAPHQL_URL,
    document: query,
    variables: {
      coverLetterWhere: {
        id: "clqtjhd5t8phg0bmzv1gevwqu",
      },
    },
  })) as QuestionsResponse;

  return response;
};
