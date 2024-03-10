import { defineConfig, isDev } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { vercelDeployTool } from "sanity-plugin-vercel-deploy";
import schemas from "./schemas/schema";

const devOnlyPlugins = [visionTool()];

export default defineConfig({
  title: "Gigs",
  projectId: "n4t6nimq",
  dataset: "production",
  plugins: [structureTool(), vercelDeployTool(), ...(isDev ? devOnlyPlugins : [])],
  schema: {
    types: schemas,
  },
});
