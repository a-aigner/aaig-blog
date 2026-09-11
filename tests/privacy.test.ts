import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const PAGE = path.resolve(__dirname, "../app/privacy/page.tsx");

describe("privacy notice", () => {
  // A privacy notice with "[TO BE COMPLETED: street address]" rendered on it is
  // worse than no notice: it is a published admission that nobody checked. The
  // page marks every fact that needs a human, and this refuses to let the site
  // build with one still marked.
  it("has no unfilled placeholders left in it", () => {
    const src = fs.readFileSync(PAGE, "utf8");
    const marks = src.match(/<Fill what="([^"]+)"/g) ?? [];
    expect(marks, `still to fill in:\n${marks.join("\n")}`).toEqual([]);
  });

  it("names the supervisory authority and the objection right", () => {
    const src = fs.readFileSync(PAGE, "utf8");
    expect(src).toContain("Bayerisches Landesamt für Datenschutzaufsicht");
    expect(src).toContain("Art. 21");
  });

  it("only claims no cookies while no cookie-setting code exists", () => {
    // The claim is load-bearing and cheap to invalidate by accident, so it is
    // pinned to the absence it describes.
    const src = fs.readFileSync(PAGE, "utf8");
    expect(src).toContain("sets no cookies");
    const app = path.resolve(__dirname, "../app");
    const files: string[] = [];
    const walk = (d: string) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.(tsx?|jsx?)$/.test(e.name)) files.push(p);
    });
    walk(app);
    walk(path.resolve(__dirname, "../components"));
    const offenders = files
      // the notice itself names these APIs in order to say it does not use
      // them, so scanning it for the words finds only its own sentence
      .filter((f) => f !== PAGE)
      .filter((f) => {
        const src = fs.readFileSync(f, "utf8");
        // a use, not a mention: a property access or an assignment
        return /\b(localStorage|sessionStorage)\s*[.[]|document\.cookie\s*=/.test(src);
      });
    expect(offenders, "these write to the device, so the claim is false").toEqual([]);
  });
});
