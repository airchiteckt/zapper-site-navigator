import { describe, expect, it } from "vitest";
import { getPreferredLanguage } from "@/lib/i18n-routing";

describe("getPreferredLanguage", () => {
  it("prioritizes the language prefix in the path", () => {
    expect(
      getPreferredLanguage({
        pathname: "/en/contatti",
        navigatorLanguages: ["it-IT"],
        navigatorLanguage: "it-IT",
      }),
    ).toBe("en");
  });

  it("uses the querystring language before the browser language on unprefixed paths", () => {
    expect(
      getPreferredLanguage({
        pathname: "/",
        search: "?lang=fr",
        navigatorLanguages: ["it-IT"],
        navigatorLanguage: "it-IT",
      }),
    ).toBe("fr");
  });

  it("uses the browser language on unprefixed paths", () => {
    expect(
      getPreferredLanguage({
        pathname: "/",
        navigatorLanguages: ["it-IT", "en-US"],
        navigatorLanguage: "en-US",
      }),
    ).toBe("en");
  });

  it("prioritizes navigator.language over the broader languages list", () => {
    expect(
      getPreferredLanguage({
        pathname: "/",
        navigatorLanguages: ["en-US", "it-IT"],
        navigatorLanguage: "it-IT",
      }),
    ).toBe("it");
  });

  it("falls back to italian when the browser language is unsupported", () => {
    expect(
      getPreferredLanguage({
        pathname: "/",
        navigatorLanguages: ["pt-BR"],
        navigatorLanguage: "pt-BR",
      }),
    ).toBe("it");
  });
});