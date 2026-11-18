
const { spawnSync } = require("child_process");

const REGISTRY_URL = "https://reactbits.dev/r/registry.json";

async function main() {
  console.log("\nFetching the official React Bits registry...\n");

  const response = await fetch(REGISTRY_URL);

  if (!response.ok) {
    throw new Error(`Registry request failed: ${response.status}`);
  }

  const registry = await response.json();

  // Select every TypeScript + Tailwind component.
  const components = [
    ...new Set(
      registry.items
        .map((item) => item.name)
        .filter((name) => name.endsWith("-TS-TW"))
    ),
  ];

  console.log(`Found ${components.length} components.\n`);
  console.log("Starting installation...\n");

  const failed = [];

  for (let i = 0; i < components.length; i++) {
    const name = components[i];

    console.log(`\n[${i + 1}/${components.length}] Installing ${name}`);

    const result = spawnSync(
      "npx.cmd",
      [
        "--yes",
        "shadcn@latest",
        "add",
        `@react-bits/${name}`,
        "--yes",
        "--overwrite",
      ],
      {
        stdio: "inherit",
        shell: true,
      }
    );

    if (result.error || result.status !== 0) {
      console.log(`FAILED: ${name}`);
      failed.push(name);
    }
  }

  console.log("\n========== INSTALLATION REPORT ==========");
  console.log(`Total components: ${components.length}`);
  console.log(`Failed components: ${failed.length}`);

  if (failed.length) {
    console.log("\nComponents to retry:");
    failed.forEach((name) => console.log(name));
  } else {
    console.log("\nAll components installed successfully!");
  }
}

main().catch((error) => {
  console.error("\nInstallation stopped:", error);
  process.exitCode = 1;
});
