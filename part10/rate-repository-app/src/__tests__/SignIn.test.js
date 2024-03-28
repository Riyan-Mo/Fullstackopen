import {
  screen,
  render,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import SignInContainer from "../components/SignInContainer";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();
      render(<SignInContainer onSubmit={onSubmit} />);
      fireEvent.changeText(screen.getByPlaceholderText("Username"), "riyan911");
      fireEvent.changeText(screen.getByPlaceholderText("Password"), "password");

      fireEvent.press(screen.getByText("Sign in"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'riyan911',
          password: 'password',
        });
      });
    });
  });
});
