import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Articles from "app/components/Articles";

const mockedArticles = [
  {
    id: "1",
    title: "記事タイトル",
    date: "2024-08-01",
    url: "https://example.com",
    thumbnail: "https://example.com/thumbnail.jpg",
    content: "記事の内容",
  },
  {
    id: "2",
    title: "記事タイトル2",
    date: "2024-08-02",
    url: "https://example.com/2",
    thumbnail: "https://example.com/thumbnail2.jpg",
    content: "記事の内容2",
  },
];

const mockFetch = jest.fn().mockResolvedValue({
  ok: true,
  json: async () => mockedArticles,
});

global.fetch = mockFetch;

describe("Articles", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("タイトルが表示される", async () => {
    render(<Articles />);

    await waitFor(() => {
      expect(screen.getByTestId("display-title")).toBeInTheDocument();
    });
  });

  it("ブログ記事一覧が表示される", async () => {
    render(<Articles />);

    await waitFor(() => {
      expect(screen.getByTestId("display-article")).toBeInTheDocument();
    });

    mockedArticles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeInTheDocument();
      expect(
        screen.getByText(new Date(article.date).toLocaleDateString())
      ).toBeInTheDocument();
      expect(screen.getByAltText(article.title)).toHaveAttribute(
        "src",
        article.thumbnail
      );
    });

    expect(screen.getAllByText("詳細を見る")).toHaveLength(
      mockedArticles.length
    );
    expect(screen.getByText("もっと見る")).toBeInTheDocument();
  });

  it("APIからのデータ取得に失敗した場合、エラーメッセージが表示される", async () => {
    mockFetch.mockRejectedValueOnce(new Error("API error"));

    render(<Articles />);

    await waitFor(() => {
      expect(screen.getByText("Error fetching articles")).toBeInTheDocument();
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

    render(<Articles />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    if (resolvePromise) {
      resolvePromise({
        ok: true,
        json: async () => mockedArticles,
      });
    }

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });
});
