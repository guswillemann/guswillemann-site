const cms = {
  gql: {
    query: async (queryString: string) => {
      return await fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${process.env.CMS_TOKEN}`,
        },
        body: JSON.stringify({
          query: queryString,
        }),
      }).then((res) => res.json());
    },
  }
}

export default cms;
