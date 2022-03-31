import { fireEvent, render, screen } from "@testing-library/react";
import { SubscribeButton } from "./";
import { signIn, useSession } from "next-auth/client";
import { mocked } from "jest-mock";
import { useRouter } from "next/router";

jest.mock("next-auth/client");

jest.mock("next/router");

describe("SubscribeButton component", () => {
  it("renders corrects when user is not authenticated", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SubscribeButton />);
    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
  });

  it("redirects use to sign in when not authenticated", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);
    const signMocked = mocked(signIn);

    render(<SubscribeButton />);
    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(signMocked).toHaveBeenCalled();
  });

  it("redirects use to sign in when authenticated", () => {
    const useRouterMocked = mocked(useRouter);
    const useSessionMocked = mocked(useSession);

    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: "julio",
          email: "julio@email.com",
        },
        activeSubscription: "fake-mock-activeSubscription",
        expires: "fake-mock-signbutton",
      },
      false,
    ]);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<SubscribeButton />);
    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalledWith('/posts');
  });
});
