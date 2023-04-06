/* eslint-disable jest/valid-expect */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
// import { userEvent } from "@testing-library/user-event";
import Register from "../components/Register";
// import Notification from "../components/Notification";

jest.mock("axios");

describe("<Register />", () => {
  let container;

  beforeEach(() => {
    container = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    ).container;
  });

  test("All the fields are there", () => {
    const element = container.querySelector(
      ".flex.h-screen.items-center.justify-center.rounded-sm.bg-cover.bg-center"
    );
    expect(element).toHaveTextContent("Register");
  });
});
