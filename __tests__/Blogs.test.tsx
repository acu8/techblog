import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import BlogList from "app/components/Blogs";

const mockBlogs = [
  {
    id: "1",
    title: "Test Blog 1",
    content: "Content 1",
    url: "/blog/1",
    publishedAt: "2023-01-01",
    eyecatch: { url: "https://example.com/image1.jpg" },
  },
  {
    id: "2",
    title: "Test Blog 2",
    content: "Content 2",
    url: "/blog/2",
    publishedAt: "2023-01-02",
    eyecatch: { url: "https://example.com/image2.jpg" },
  },
];

const mockFetch = jest.fn().mockResolvedValue({
  ok: true,
  json: async () => mockBlogs,
});

global.fetch = mockFetch;

describe("Blogs ", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("タイトルが表示される", async () => {
    render(<BlogList />);

    await waitFor(() => {
      expect(screen.getByTestId("display-title")).toBeInTheDocument();
    });
  });

  it("ブログ記事一覧が表示される", async () => {
    render(<BlogList />);

    await waitFor(() => {
      expect(screen.getByTestId("display-blog")).toBeInTheDocument();
    });

    mockBlogs.forEach((blog) => {
      expect(screen.getByText(blog.title)).toBeInTheDocument();
      expect(
        screen.getByText(new Date(blog.publishedAt).toLocaleDateString())
      ).toBeInTheDocument();
      expect(screen.getByAltText(blog.title)).toHaveAttribute(
        "src",
        blog.eyecatch.url
      );
    });

    expect(screen.getAllByText("詳細を見る")).toHaveLength(mockBlogs.length);
    expect(screen.getByText("もっと見る")).toBeInTheDocument();
  });

  it("APIからのデータ取得に失敗した場合、エラーメッセージが表示される", async () => {
    mockFetch.mockRejectedValueOnce(new Error("API error"));

    render(<BlogList />);

    await waitFor(() => {
      expect(screen.getByText("Error: API error")).toBeInTheDocument();
    });
  });

  it("データ取得中はローディング表示がされる", async () => {
    let resolvePromise: ((value: any) => void) | undefined;

    mockFetch.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolvePromise = resolve;
        })
    );

    render(<BlogList />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    if (resolvePromise) {
      resolvePromise({
        ok: true,
        json: async () => mockBlogs,
      });
    }

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });
});
