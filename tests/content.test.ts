import { describe, it, expect } from "vitest";
import path from "node:path";
import {
  getAllProjects,
  getProject,
  getProjectArticles,
  getArticle,
  getAdjacentArticles,
} from "@/lib/content";

const FIXTURES = path.resolve(__dirname, "fixtures/content");

describe("content layer", () => {
  it("lists projects sorted by order", () => {
    const projects = getAllProjects(FIXTURES);
    expect(projects.map((p) => p.slug)).toEqual(["alpha", "beta", "gamma"]);
    expect(projects[0].title).toBe("Alpha Project");
    expect(projects[0].featured).toBe(true);
    expect(projects[0].gradient).toBe("violet");
  });

  it("reads a single project's meta and body", () => {
    const { meta, content } = getProject("alpha", FIXTURES);
    expect(meta.stack).toEqual(["Python", "REST APIs"]);
    expect(meta.links.github).toBe("https://github.com/example/alpha");
    expect(content).toContain("The story of Alpha.");
  });

  it("lists a project's articles newest-first with reading time", () => {
    const articles = getProjectArticles("alpha", FIXTURES);
    expect(articles.map((a) => a.slug)).toEqual(["second", "first"]);
    expect(articles[0].title).toBe("Second Article");
    expect(articles[1].readingTime).toBe("1 min read");
  });

  it("reads a single article", () => {
    const { meta, content } = getArticle("alpha", "first", FIXTURES);
    expect(meta.title).toBe("First Article");
    expect(meta.projectSlug).toBe("alpha");
    expect(content).toContain("Body of the first article");
  });

  it("computes prev/next within a project (date order)", () => {
    // newest-first list is [second, first]; "next" = newer, "prev" = older
    const adj = getAdjacentArticles("alpha", "second", FIXTURES);
    expect(adj.next).toBeNull();
    expect(adj.prev?.slug).toBe("first");
  });

  it("computes next as the newer neighbor", () => {
    const adj = getAdjacentArticles("alpha", "first", FIXTURES);
    expect(adj.next?.slug).toBe("second");
    expect(adj.prev).toBeNull();
  });

  it("returns empty article list for a project with none", () => {
    expect(getProjectArticles("beta", FIXTURES)).toEqual([]);
  });

  it("keeps newest-first as the default a project does not ask about", () => {
    expect(getProject("alpha", FIXTURES).meta.readingOrder).toBe("newest-first");
  });

  it("reverses the list for a project that reads as one narrative", () => {
    expect(getProject("gamma", FIXTURES).meta.readingOrder).toBe("oldest-first");
    expect(getProjectArticles("gamma", FIXTURES).map((a) => a.slug)).toEqual(["one", "two"]);
  });

  it("keeps prev older and next newer whatever order the project displays", () => {
    // The footer arrows must not invert just because the list is reversed:
    // reading forward through an oldest-first project means following `next`.
    const first = getAdjacentArticles("gamma", "one", FIXTURES);
    expect(first.prev).toBeNull();
    expect(first.next?.slug).toBe("two");

    const last = getAdjacentArticles("gamma", "two", FIXTURES);
    expect(last.prev?.slug).toBe("one");
    expect(last.next).toBeNull();
  });

  it("carries a part label only where an article sets one", () => {
    expect(getProjectArticles("gamma", FIXTURES).map((a) => a.part)).toEqual(["I · Beginning", "II · Ending"]);
    expect(getProjectArticles("alpha", FIXTURES).every((a) => a.part === undefined)).toBe(true);
  });
});
