import React from "react";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { Platform } from "react-native";
import MockAdapter from "axios-mock-adapter";
import api from "../../Services/APIs/Common/api";

import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import { useNavigation } from "@react-navigation/native";
import LoginController from "./LoginController";

import { Provider } from "react-redux";
import { store } from "../../store/store";

let mock: MockAdapter;
jest.setTimeout(30000);
jest.useFakeTimers();

const fakeLogin = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJ1YmVuc0BzY2",
  userId: "6207f78500e679092b819156",
  name: "Rubens 2",
  phone: "11971745577",
};

beforeAll(() => {
  console.log(" IS MOCKING = " + (global as any).__isMocking__);
  if ((global as any).__isMocking__) {
    mock = new MockAdapter(api);
  }
});

afterEach(() => {
  if ((global as any).__isMocking__) {
    mock.reset();
  }
});

describe("<LoginController />", () => {
  it("Check Initial Case", async () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <LoginController />
        </Provider>
      )
      .toJSON() as ReactTestRendererJSON;
    expect(tree.children?.length).toBe(1);
    expect(tree).toMatchSnapshot();
  });

  it("Check Empty Form", async () => {
    const { getByText, getByTestId, getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginController />
      </Provider>
    );

    const emailInput = getByPlaceholderText("E-mail");
    expect(emailInput).toBeTruthy();

    const passInput = getByPlaceholderText("Senha");
    expect(passInput).toBeTruthy();

    const button = getByTestId("loginButton");
    expect(button).toBeTruthy();
    fireEvent.press(button);

    await waitFor(() => {
      expect(getByText("E-mail é obrigatório")).toBeTruthy();
      expect(getByText("Senha é obrigatório")).toBeTruthy();
    });
  });

  it("Check Invalid E-mail", async () => {
    const { getByText, getByTestId, getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginController />
      </Provider>
    );

    const emailInput = getByPlaceholderText("E-mail");
    expect(emailInput).toBeTruthy();

    const passInput = getByPlaceholderText("Senha");
    expect(passInput).toBeTruthy();

    const button = getByTestId("loginButton");
    expect(button).toBeTruthy();

    fireEvent.changeText(emailInput, "hello");
    fireEvent.changeText(passInput, "123");
    fireEvent.press(button);

    await waitFor(() => {
      expect(getByText("E-mail não válido")).toBeTruthy();
      expect(
        getByText("Senha é curta - deveria ter ao menos 4 caracteres")
      ).toBeTruthy();
    });
  });

  it("Check Invalid User", async () => {
    if ((global as any).__isMocking__) {
      mock
        .onPost("/storeProducts/login")
        .reply(201, { message: "User Not Found" });
    }
    const { getByText, getByTestId, getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginController />
      </Provider>
    );

    const emailInput = getByPlaceholderText("E-mail");
    expect(emailInput).toBeTruthy();

    const passInput = getByPlaceholderText("Senha");
    expect(passInput).toBeTruthy();

    const button = getByTestId("loginButton");
    expect(button).toBeTruthy();

    fireEvent.changeText(emailInput, "rubens@schoolguardian.app");
    fireEvent.changeText(passInput, "123456789");
    fireEvent.press(button);

    await waitFor(
      () => {
        const textUser = getByText("User Not Found");
        expect(textUser).toBeTruthy();
      },
      {
        timeout: 20500,
      }
    );
  });

  it("Check Valid User", async () => {
    if ((global as any).__isMocking__) {
      mock.onPost("/storeProducts/login").reply(200, fakeLogin);
    }
    const { getByText, getByTestId, getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginController />
      </Provider>
    );

    const emailInput = getByPlaceholderText("E-mail");
    expect(emailInput).toBeTruthy();

    const passInput = getByPlaceholderText("Senha");
    expect(passInput).toBeTruthy();

    const button = getByTestId("loginButton");
    expect(button).toBeTruthy();

    fireEvent.changeText(emailInput, "rubens@schoolguardian.app");
    fireEvent.changeText(passInput, "123456");
    fireEvent.press(button);

    await waitFor(
      () => {
        const textUser = getByText("Login com Sucesso");
        expect(textUser).toBeTruthy();
      },
      {
        timeout: 20500,
      }
    );
  });
});
