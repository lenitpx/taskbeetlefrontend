import { describe, it, expect, vi, beforeEach } from "vitest";
import api from "../lib/api";

describe("API Interceptor 401 Handling", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        localStorage.clear();
        
        // We mock window.location.assign because changing .href directly 
        // often fails in JSDOM environments.
        Object.defineProperty(window, 'location', {
            writable: true,
            value: { href: '', assign: vi.fn() }
        });
    });

    it("should clear token and redirect to /login on 401", async () => {
        localStorage.setItem("token", "expired-token");

        // Simulate a 401 error object that Axios would pass to the interceptor
        const mockError = {
            response: { status: 401 },
            isAxiosError: true
        };

        let caughtError;

        try {
        // Manually trigger the 'rejected' handler of the response interceptor
            // @ts-ignore
            await api.interceptors.response.handlers[0].rejected(mockError);
        } catch (e) {
            caughtError = e;
        }

        expect(localStorage.getItem("token")).toBeNull();
        expect(window.location.href).toBe("/login");
        expect(caughtError).toBeDefined();
    });

    it("should NOT remove token or redirect on 403 Forbidden", async () => {
        localStorage.setItem("token", "valid-but-limited-token");
        const errorResponse = { response: { status: 403 } };

        try {
            // @ts-ignore
            await api.interceptors.response.handlers[0].rejected(errorResponse);
        } catch (e) {}

        expect(localStorage.getItem("token")).toBe("valid-but-limited-token");
        expect(window.location.href).not.toBe("/login");
    });
});