
				import createSSRHandler from './entry.mjs';
				export default createSSRHandler({"cacheOnDemandPages":false});
				export const config = { name: "Astro SSR", generator: "@astrojs/netlify@4.1.0", path: "/*", preferStatic: true };
			