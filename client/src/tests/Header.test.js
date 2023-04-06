/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-node-access */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Header from "../components/Header";
import Nav from "../components/Navbar";

// const user = {
//   email: "testi@reijjo.com",
//   username: "testiukko",
// };
const user = "";

describe("<Header />", () => {
  let container;

  beforeEach(() => {
    container = render(
      <BrowserRouter>
        <Header user={user} />
      </BrowserRouter>
    ).container;
  });

  test("renders header", () => {
    const element = container.querySelector(".br-cover.relative.bg-center");
    expect(element).toHaveTextContent("Camagru 2.0");
  });
});

describe("<Nav />", () => {
  let container;

  beforeEach(() => {
    container = render(
      <BrowserRouter>
        <Nav user={user} />
      </BrowserRouter>
    ).container;
  });

  test("Register and Login buttons appear", () => {
    const element = container.querySelector(".navilapi");
    expect(element).toHaveTextContent("Register");
    expect(element).toHaveTextContent("Login");
  });
});
