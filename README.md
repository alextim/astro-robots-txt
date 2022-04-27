# astro-robots-txt

This **[Astro integration][astro-integration]** generates a _robots.txt_ for your Astro project during build.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT) ![Build Status](https://img.shields.io/github/workflow/status/alextim/astro-robots-txt/publish)

------
The _robots.txt_ file informs search engines which pages on your website should be crawled. [See Google's own advice on robots.txt](https://developers.google.com/search/docs/advanced/robots/intro) to learn more.

## Why astro-robots-txt?

For Astro project you usually create the _robots.txt_ in a text editor and place it to the `public/` directory.
In that case you must manually synchronize `site` option in _astro.config.*_ with `Sitemap:` record in _robots.txt_.  
It brakes DRY principle.  

Sometimes, especially during development, it's needed to prevent your site from being indexed. To achieve this you need place meta tag `<meta name="robots" content="noindex">` in the `<head>` section of pages or add `X-Robots-Tag: noindex` in HTTP header response, then add lines `User-agent: *` and `Disallow: \` to _robots.txt_.  
Again you do it manually in two separate places.

**astro-robots-txt** could help in both two cases.

------

## Installation

If you run into any hiccups, [feel free to log an issue on my GitHub](https://github.com/alextim/astro-robots-txt/issues).

### Install dependencies

First, install the **astro-robots-txt** integration like so:

```sh
#npm
npm install --save-dev astro-robots-txt

#yarn
yarn add -D astro-robots-txt

#pnpm
pnpm add -D astro-robots-txt
```

Then, apply this integration to your _astro.config.*_ file using the `integrations` property:

**astro.config.mjs**

```js
import { defineConfig } from 'astro/config';
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  // ...
  integrations: [robotsTxt()],
});
```

## Getting started

`astro-robots-txt` requires a deployment / site URL for generation. Add your site's URL under your _astro.config.*_ using the `site` property:

**astro.config.mjs**

```js
import { defineConfig } from 'astro/config';
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  // ...
  site: 'https://example.com',
  integrations: [robotsTxt()],
});
```

Now, [build your site for production](https://docs.astro.build/en/reference/cli-reference/#astro-build) via the `astro build --experimental-integrations` command. You should find your _robots.txt_ under `dist/robots.txt`!

The _robots.txt_'s content will be

```text
User-agent: *
Allow: /
Sitemap: https://example.com/sitemap.xml
```

You can also check our [Astro Integration Documentation][astro-integration] for more on integrations.

## Configuration

## Options

|   Name    |              Type               |             Default              |                             Description                              |
| :-------: | :-----------------------------: | :------------------------------: | :------------------------------------------------------------------: |
|  `host`   |            `String`             |                ``                |                          Host of your site                           |
| `sitemap` | `Boolean / String` / `String[]` |              `true`              |    Resulting output will be `Sitemap: your-site-url/sitemap.xml`     |
|           |                                 |                                  |        If `sitemap: false` - no `Sitemap` line in the output         |
|           |                                 |                                  | You could use for `sitemap` valid url string or array of url strings |
| `policy`  |           `Policy[]`            | [{ allow: '/', userAgent: '*' }] |                        List of `Policy` rules                        |

### Policy

|     Name     |         Type          | Required |                   Description                   |
| :----------: | :-------------------: | :------: | :---------------------------------------------: |
| `userAgent`  |       `String`        |   Yes    | You must provide name of user agent or wildcard |
|  `disallow`  | `String` / `String[]` |    No    |                disallowed paths                 |
|   `allow`    | `String` / `String[]` |    No    |                  allowed paths                  |
| `crawlDelay` |       `Number`        |    No    |                                                 |
| `cleanParam` | `String` / `String[]` |    No    |                                                 |

**Sample of _astro.config.mjs_**

```js
import { defineConfig } from 'astro/config';
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  site: 'https://example.com',
  integrations: [
    robotsTxt({
      host: 'example.com',
      sitemap: ['https://example.com/main-sitemap.xml', 'https://example.com/images-sitemap.xml'],
      policy: [
        {
          userAgent: 'Googlebot',
          allow: '/',
          disallow: ['/search'],
          crawlDelay: 2,
        },
        {
          userAgent: 'OtherBot',
          allow: ['/allow-for-all-bots', '/allow-only-for-other-bot'],
          disallow: ['/admin', '/login'],
          crawlDelay: 2,
        },
        {
          userAgent: '*',
          allow: '/',
          disallow: '/search',
          crawlDelay: 10,
          cleanParam: 'ref /articles/',
        },
      ],
    }),
  ],
});
```

:exclamation: Important Notes

Only official **@astrojs/\*** integrations are currently supported by Astro at present moment.  

To enable **astro-robots-txt** integrations working, use the `--experimental-integrations` flag during build.  

Use the following command to build your Astro site:

```sh
astro build --experimental-integrations
```

[astro-integration]: https://docs.astro.build/en/guides/integrations-guide/


**Inspirations:**

- [gatsby-plugin-robots-txt](https://github.com/mdreizin/gatsby-plugin-robots-txt)
- [is-valid-hostname](https://github.com/miguelmota/is-valid-hostname)
