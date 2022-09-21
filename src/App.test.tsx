import React from "react";
import { describe, expect, it, test } from "@jest/globals";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import App from "./App";

describe("<App />", () => {
  it("Check Initial Case", async () => {
    const tree = renderer.create(<App />).toJSON() as ReactTestRendererJSON;
    expect(tree.children?.length).toBe(1);
    expect(tree).toMatchSnapshot();
  });

  it("Check Button Press", async () => {
    const page = render(<App />);
    const textInfo: renderer.ReactTestInstance = page.getByText("Teste Rubens");
    expect(textInfo).toBeTruthy();

    const button: renderer.ReactTestInstance = page.getByTestId("buttonID");
    expect(button).toBeTruthy();
    fireEvent.press(button);

    const successMessage = await waitFor(() => page.getByText("Teste 2"));
    expect(successMessage).toBeTruthy();
  });
});
