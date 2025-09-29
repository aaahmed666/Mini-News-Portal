import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SearchForm } from "@/components/search-form";

// Mock Next.js navigation
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => new URLSearchParams(),
}));

const mockDict = {
  common: {
    search: "Search",
    searchPlaceholder: "Search articles...",
  },
};

describe("SearchForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders search form with correct placeholder", () => {
    render(
      <SearchForm
        dict={mockDict}
        locale="en"
      />
    );

    const input = screen.getByPlaceholderText("Search articles...");
    expect(input).toBeInTheDocument();

    const button = screen.getByRole("button", { name: "Search" });
    expect(button).toBeInTheDocument();
  });

  it("updates input value when typing", async () => {
    const user = userEvent.setup();
    render(
      <SearchForm
        dict={mockDict}
        locale="en"
      />
    );

    const input = screen.getByPlaceholderText("Search articles...");
    await user.type(input, "test query");

    expect(input).toHaveValue("test query");
  });

  it("submits form and navigates on search", async () => {
    const user = userEvent.setup();
    render(
      <SearchForm
        dict={mockDict}
        locale="en"
      />
    );

    const input = screen.getByPlaceholderText("Search articles...");
    const button = screen.getByRole("button", { name: "Search" });

    await user.type(input, "technology");
    await user.click(button);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/en/search?q=technology");
    });
  });

  it("shows clear button when input has value", async () => {
    const user = userEvent.setup();
    render(
      <SearchForm
        dict={mockDict}
        locale="en"
        initialQuery="test"
      />
    );

    const clearButton = screen.getByRole("button", { name: "" });
    expect(clearButton).toBeInTheDocument();

    await user.click(clearButton);

    const input = screen.getByPlaceholderText("Search articles...");
    expect(input).toHaveValue("");
  });

  it("disables submit button when input is empty", () => {
    render(
      <SearchForm
        dict={mockDict}
        locale="en"
      />
    );

    const button = screen.getByRole("button", { name: "Search" });
    expect(button).toBeDisabled();
  });

  it("enables submit button when input has value", async () => {
    const user = userEvent.setup();
    render(
      <SearchForm
        dict={mockDict}
        locale="en"
      />
    );

    const input = screen.getByPlaceholderText("Search articles...");
    const button = screen.getByRole("button", { name: "Search" });

    await user.type(input, "test");

    expect(button).not.toBeDisabled();
  });
});
