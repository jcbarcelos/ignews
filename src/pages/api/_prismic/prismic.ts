import * as prismic from "@prismicio/client";

export const repositoryName = "ig-news-develop";

const endpoint = prismic.getEndpoint(repositoryName);

export const client = prismic.createClient(endpoint, {
  // If your repo is private, add an access token
  accessToken: "",
  routes: [
    {
      type: "posts",
      path: "/:uid",
    },
  ],
});
