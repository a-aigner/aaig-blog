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
    expect(projects.map((p) => p.slug)).toEqual(["alpha", "beta"]);
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
    expect(articles[1].readingTime).toMatch(/min read$/);
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

  it("returns empty article list for a project with none", () => {
    expect(getProjectArticles("beta", FIXTURES)).toEqual([]);
  });
});
