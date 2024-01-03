import request, { gql } from "graphql-request";

export interface Question {
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
    url: "https://api-us-west-2.hygraph.com/v2/clajqe6np361801ukcmef3zt4/master",
    document: query,
    variables: {
      coverLetterWhere: {
        id: "clqtjhd5t8phg0bmzv1gevwqu",
      },
    },
  })) as QuestionsResponse;

  return response;
};
