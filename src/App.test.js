import { render, screen } from "@testing-library/react";
import App from "./App";

test("render", () => {
  render(<App />);
  const linkElement = screen.getByText(/WELCOME TO PORTFOLIO CRAFT/);
  expect(linkElement).toBeInTheDocument();
});
