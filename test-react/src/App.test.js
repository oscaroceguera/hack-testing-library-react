import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);

    // wait for the user to resolve
    // needs only be used in our special case
    // await screen.findByText(/Signed in as/);

    screen.debug();

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "JavaScript" },
    });

    screen.debug();
  });
});