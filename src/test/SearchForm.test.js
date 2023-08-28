import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SearchForm from "../components/SearchForm";
import { fetchCapsules } from "../services/api";

jest.mock("../services/api"); // Mock the API service module

describe("SearchForm component", () => {
  it("renders form elements correctly", () => {
    const { getByLabelText, getByText } = render(
      <SearchForm onSearch={() => {}} />
    );

    expect(getByLabelText("Status:")).toBeInTheDocument();
    expect(getByLabelText("Capsule Serial:")).toBeInTheDocument();
    expect(getByLabelText("Type:")).toBeInTheDocument();
    expect(getByText("Search")).toBeInTheDocument();
  });

  it("calls onSearch with filtered capsules when form is submitted", async () => {
    const capsulesData = [
      { capsule_serial: "C101", status: "active", type: "Dragon 2.0" },
      { capsule_serial: "C102", status: "retired", type: "Dragon 1.0" },
    ];

    fetchCapsules.mockResolvedValue(capsulesData);

    const onSearchMock = jest.fn();
    const { getByLabelText, getByText } = render(
      <SearchForm onSearch={onSearchMock} />
    );

    fireEvent.change(getByLabelText("Status:"), {
      target: { value: "active" },
    });
    fireEvent.change(getByLabelText("Type:"), {
      target: { value: "Dragon 2.0" },
    });
    fireEvent.click(getByText("Search"));

    await waitFor(() => {
      expect(onSearchMock).toHaveBeenCalledWith(capsulesData);
    });
  });

  it("updates capsuleSerial state when input value changes", () => {
    const { getByLabelText } = render(<SearchForm onSearch={() => {}} />);

    const inputElement = getByLabelText("Capsule Serial:");
    fireEvent.change(inputElement, { target: { value: "C101" } });

    expect(inputElement.value).toBe("C101");
  });
});
