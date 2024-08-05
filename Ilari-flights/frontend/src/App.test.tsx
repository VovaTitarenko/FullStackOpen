import { fireEvent, render, screen } from "@testing-library/react";
import { test, expect, describe } from "vitest";
import App from "./App";

test("renders content", () => {
  render(<App />);

  const element = screen.getByText("Previous entries:");
  screen.debug(element);
  expect(element).toBeDefined();
});

describe("form input validation", () => {
  test("submitting with an empty form should spawn error message", () => {
    let container;
    container = render(<App />).container;
    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);
    const errorMessage = screen.getByTestId("errmessage");
    screen.debug(errorMessage);
    expect(errorMessage).toBeDefined();
  });
  test("non-date-string in dateField throws error", () => {
    render(<App />);
    const dateField = screen.getByTestId("date");
    const submitButton = screen.getByRole("button");
    fireEvent.change(dateField, { target: { value: "hahaha" } });

    fireEvent.click(submitButton);
    const errorMessage = screen.getByTestId("errmessage");
    screen.debug(errorMessage);
    expect(errorMessage).toBeDefined();
  });
  test("wrong date throws error", () => {
    render(<App />);
    const dateField = screen.getByTestId("date");
    const submitButton = screen.getByRole("button");
    fireEvent.change(dateField, { target: { value: "2020-20-01" } });

    fireEvent.click(submitButton);
    const errorMessage = screen.getByTestId("errmessage");
    screen.debug(errorMessage);
    expect(errorMessage).toBeDefined();
  });
  test("proper date without weather throws error", () => {
    render(<App />);
    const dateField = screen.getByTestId("date");
    const submitButton = screen.getByRole("button");
    fireEvent.change(dateField, { target: { value: "2020-01-20" } });

    fireEvent.click(submitButton);
    const errorMessage = screen.getByTestId("errmessage");
    screen.debug(errorMessage);
    expect(errorMessage).toBeDefined();
  });
  test("proper date and weather w/o visibility throw error", () => {
    render(<App />);
    const dateField = screen.getByTestId("date");
    const weatherRadio = screen.getByTestId("weather");
    const rainyRadioButton = screen.getByTestId("rainy");
    const visibilityRadio = screen.getByTestId("visibility");
    const submitButton = screen.getByRole("button");
    fireEvent.change(dateField, { target: { value: "2020-01-20" } });
    fireEvent.click(rainyRadioButton);
    fireEvent.click(submitButton);
    const errorMessage = screen.getByTestId("errmessage");
    screen.debug(errorMessage);
    expect(errorMessage).toBeDefined();
  });
  test("blank comment (including spaces) throws error", () => {
    render(<App />);
    const dateField = screen.queryByTestId("date");
    const weatherRadio = screen.queryByTestId("weather");
    const rainyRadioButton = screen.queryByTestId("rainy");
    const visibilityRadio = screen.queryByTestId("visibility");
    const okRadioButton = screen.queryByTestId("ok");
    const commentField = screen.queryByTestId("comment");
    const submitButton = screen.queryByRole("button");
    fireEvent.change(dateField!, { target: { value: "2020-01-20" } });
    fireEvent.click(rainyRadioButton!);
    fireEvent.click(okRadioButton!);
    fireEvent.change(commentField!, {
      target: { value: "  " },
    });
    expect(dateField).toBeDefined();
    expect(weatherRadio).toBeDefined();
    expect(visibilityRadio).toBeDefined();
    expect(commentField).toBeDefined();
    fireEvent.click(submitButton!);
    const errorMessage = screen.queryByTestId("errmessage");
    screen.debug(errorMessage!);
    expect(errorMessage).toBeDefined;
  });
  test("proper inputs get accepted w/o error", () => {
    render(<App />);
    const dateField = screen.queryByTestId("date");
    const weatherRadio = screen.queryByTestId("weather");
    const rainyRadioButton = screen.queryByTestId("rainy");
    const visibilityRadio = screen.queryByTestId("visibility");
    const okRadioButton = screen.queryByTestId("ok");
    const commentField = screen.queryByTestId("comment");
    const submitButton = screen.queryByRole("button");
    fireEvent.change(dateField!, { target: { value: "2020-01-20" } });
    fireEvent.click(rainyRadioButton!);
    fireEvent.click(okRadioButton!);
    fireEvent.change(commentField!, {
      target: { value: "Was a great flight!" },
    });
    expect(dateField).toBeDefined();
    expect(weatherRadio).toBeDefined();
    expect(visibilityRadio).toBeDefined();
    expect(commentField).toBeDefined();
    fireEvent.click(submitButton!);
    const errorMessage = screen.queryByTestId("errmessage");
    expect(errorMessage).toBe(null); // то есть ошибка не вылезла
    expect((dateField as HTMLInputElement | null)?.value).toBe(""); // state сбросился до дефолта
    expect((commentField as HTMLInputElement | null)?.value).toBe(""); // state сбросился до дефолта
  });
});
