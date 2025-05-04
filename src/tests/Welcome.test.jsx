import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Welcome from "../components/Welcome";
import { MemoryRouter } from "react-router-dom";
describe("Welcome", () => {
    it("Welcome message is rendered", () => {
        const { container } = render(
            <MemoryRouter>
                <Welcome />
            </MemoryRouter>
        );
        expect(container).toMatchSnapshot();
    });
});
