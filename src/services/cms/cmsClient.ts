import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.CMS_ENDPOINT as string;
const token = process.env.CMS_TOKEN;

export default new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${token}`,
  }
});