# Third-party notices

Midnight Lite is under the MIT license ([LICENSE](LICENSE)). It includes or uses the work below, under its own
licenses.

## Included in the source

### shadcn/ui · MIT

The components in `src/components/ui/` start from shadcn/ui (https://github.com/shadcn-ui/ui) and were changed for
this template; `src/app/shadcn.css` holds two custom variants (`data-open`, `data-closed`) from its Tailwind
stylesheet, the ones the tooltip uses.

```
MIT License

Copyright (c) 2023 shadcn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Fraunces and Geist fonts · SIL Open Font License 1.1

`public/og.png` shows Fraunces and Geist. The fonts themselves are not in this repository: Fraunces, Geist and Geist
Mono are downloaded from Google Fonts by `next/font` when you build, and served with your site as web fonts. They are
under the SIL Open Font License 1.1; the full license and the copyright notices are in
[licenses/OFL.txt](licenses/OFL.txt):

- Fraunces: Copyright 2020 The Fraunces Project Authors (https://github.com/undercasetype/Fraunces)
- Geist and Geist Mono: Copyright 2024 The Geist Project Authors (https://github.com/vercel/geist-font)

## Installed by npm

These packages are installed into `node_modules`, each with its own license file there. The site uses:

| Package | License |
| --- | --- |
| class-variance-authority | Apache-2.0 |
| cn | MIT |
| lucide-react | ISC |
| next | MIT |
| radix-ui | MIT |
| react | MIT |
| react-dom | MIT |
| tw-animate-css | MIT |

Tools used only to develop and build the site:

| Package | License |
| --- | --- |
| @tailwindcss/postcss | MIT |
| @types/node | MIT |
| @types/react | MIT |
| @types/react-dom | MIT |
| eslint | MIT |
| eslint-config-next | MIT |
| tailwindcss | MIT |
| typescript | Apache-2.0 |

The build tools pull in further packages under permissive or notice licenses, for example lightningcss (MPL-2.0),
caniuse-lite (CC-BY-4.0) and, optionally, sharp with libvips (Apache-2.0, LGPL-3.0). They run on your machine
during the build and are not part of the built site.
