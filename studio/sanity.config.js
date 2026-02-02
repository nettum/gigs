import { defineConfig, isDev } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import schemas from "./schemas/schema";

const devOnlyPlugins = [visionTool()];

export default defineConfig({
  title: "Gigs",
  projectId: "n4t6nimq",
  dataset: "production",
  plugins: [structureTool(), ...(isDev ? devOnlyPlugins : [])],
  schema: {
    types: schemas,
  },
});
