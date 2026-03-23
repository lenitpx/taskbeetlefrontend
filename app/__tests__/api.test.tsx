import { describe, it, expect, vi, beforeEach } from "vitest";
import api from "~/lib/api";

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

    try {
      // Manually trigger the 'rejected' handler of the response interceptor
      // @ts-ignore
      await api.interceptors.response.handlers[0].rejected(mockError);
    } catch (e) {
      // Error re-throw is expected behavior
    }

    expect(localStorage.getItem("token")).toBeNull();
    expect(window.location.href).toBe("/login");
  });
});