import request, { gql } from "graphql-request";

export interface Question {
  title: string;
  content: string;
}
interface QuestionsResponse {
  questions: Question[];
}

export const fetchQuestions = async () => {
  const query = gql`
    query questions {
      questions {
        title
        content
      }
    }
  `;

  const response = (await request({
    url: "https://api-us-west-2.hygraph.com/v2/clajqe6np361801ukcmef3zt4/master",
    document: query,
  })) as QuestionsResponse;

  return response.questions;
};
