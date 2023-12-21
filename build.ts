import "zx/globals";

async function build() {
  console.log("build by webpack start...");

  await $`pnpm run build:webpack`;

  console.log("build by webpack end...");

  console.log("build by rspack start...");

  await $`pnpm run build:rspack`;

  console.log("build by rspack end...");
}

build();
