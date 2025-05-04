import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import ErrorPage from "../components/ErrorPage";
import { MemoryRouter } from "react-router-dom";
describe("ErrorPage", () => {
    it("Error message is rendered", () => {
        const { container } = render(
            <MemoryRouter>
                <ErrorPage />
            </MemoryRouter>
        );
        expect(container).toMatchSnapshot();
    });
});
