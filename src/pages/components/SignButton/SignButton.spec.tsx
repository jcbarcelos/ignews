import { render, screen } from "@testing-library/react";
import { SignButton } from "./";
import { useSession } from "next-auth/client";
import { mocked } from "jest-mock";


jest.mock("next-auth/client");

describe("SignButton component", () => {
  const useSessionMocked = mocked(useSession);

  it("renders corrects when user is not authenticated", () => {
    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SignButton />);
    expect(screen.getByText("Sign in wuth Github")).toBeInTheDocument();
  });

  it("renders corrects when user is authenticated", () => {
    useSessionMocked.mockReturnValue([
      {
        user: {
          name: "julio",
          email: "julio@email.com",
        },
        expires: "fake-mock-signbutton",
      },
      false,
    ]);
    render(<SignButton />);
    expect(screen.getByText("julio")).toBeInTheDocument();
  });
});
