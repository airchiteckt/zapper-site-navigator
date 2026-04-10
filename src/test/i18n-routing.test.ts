import { describe, expect, it } from "vitest";
import { getPreferredLanguage } from "@/lib/i18n-routing";

describe("getPreferredLanguage", () => {
  it("prioritizes the language prefix in the path", () => {
    expect(
      getPreferredLanguage({
        pathname: "/en/contatti",
      }),
    ).toBe("en");
  });

  it("uses the querystring language on unprefixed paths", () => {
    expect(
      getPreferredLanguage({
        pathname: "/",
        search: "?lang=fr",
      }),
    ).toBe("fr");
  });

  it("falls back to italian on unprefixed paths without querystring", () => {
    expect(
      getPreferredLanguage({
        pathname: "/",
      }),
    ).toBe("it");
  });

  it("uses the provided fallback language when supported", () => {
    expect(
      getPreferredLanguage({
        pathname: "/",
        fallbackLanguage: "en",
      }),
    ).toBe("en");
  });

  it("falls back to italian when the provided fallback language is unsupported", () => {
    expect(
      getPreferredLanguage({
        pathname: "/",
        fallbackLanguage: "pt-BR",
      }),
    ).toBe("it");
  });
});