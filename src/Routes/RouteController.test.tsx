import React from "react";
import { RouteController } from "./RouteController";

import { Provider } from "react-redux";
import { store } from "../store/store";
import { render, waitFor } from "@testing-library/react-native";

import { cleanUser, setUser } from "../store/login/LoginSlice";
import IUserInfo from "../Interfaces/iUserInfo";

jest.useFakeTimers();
describe("<RouteController />", () => {
  it("Testing Open Login", async () => {
    store.dispatch(cleanUser());

    const { getByText, debug } = render(
      <Provider store={store}>
        <RouteController />
      </Provider>
    );

    const login = await waitFor(() => getByText("Login"));
    expect(login).toBeTruthy();
  });

  it("Testing Open Home", async () => {
    let user: IUserInfo = {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJ1YmVuc0BzY2",
      userId: "6207f78500e679092b819156",
      name: "Rubens 2",
      phone: "11971745599",
    };
    store.dispatch(setUser({ user }));

    const { getByText } = render(
      <Provider store={store}>
        <RouteController />
      </Provider>
    );

    const home = await waitFor(() => getByText("Home"));
    expect(home).toBeTruthy();
  });
});
