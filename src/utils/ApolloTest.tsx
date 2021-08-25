import {
  ApolloClient, InMemoryCache, gql, NormalizedCacheObject,
} from '@apollo/client';

const client:ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

const TestQuery = async (): Promise<void> => {
  console.log('Started test...');
  const response = await client.query({
    query: gql`
      query ExampleQuery {
        books {
          author,
          title
        }
      }
    `,
  });

  console.log('Result:');
  console.log(response);
};

module.exports = TestQuery;
