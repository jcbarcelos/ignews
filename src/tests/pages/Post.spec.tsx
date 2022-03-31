import { render, screen } from "@testing-library/react";
import { getPrismicClient } from "../../services/prismic";
import { mocked } from "jest-mock";
import { Posts, getStaticProps } from "../../pages/posts";

jest.mock("../../services/prismic");

const posts = [
  {
    slug: "my-new-post",
    title: "My New Post",
    except: "Post exercpt",
    updateAt: "04-04-2020",
  },
];

describe("Post page", () => {
  it("renders correctly", () => {
    render(<Posts posts={posts} />);
    expect(screen.getByText("My New Post")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    await getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "my-new-post",
            data: {
              title: [{ type: "heading", text: "My New post" }],
              content: [{ type: "paragraph", text: "Post exercpt" }],
            },
            last_publication_date: "04-04-2020",
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});
    console.log(response["props"]["posts"]);
    console.log(response);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "my-new-post",
              title: "My New Post",
              except: "Post exercpt",
              updatedAt: "04 de abril de 2020",
            },
          ],
        },
      })
    );
  });
});
