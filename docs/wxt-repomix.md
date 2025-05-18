This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.
The content has been processed where security check has been disabled.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: docs/**/*
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Security check has been disabled - content may contain sensitive information
- Files are sorted by Git change count (files with more changes are at the bottom)

## Additional Info

# Directory Structure
```
docs/
  .vitepress/
    components/
      BlogHome.vue
      BlogLayout.vue
      BlogPostPreview.vue
      EntrypointPatterns.vue
      ExampleSearch.vue
      ExampleSearchFilterByItem.vue
      ExampleSearchResult.vue
      Icon.vue
      UsingWxtSection.vue
    composables/
      useBlogDate.ts
      useListExtensionDetails.ts
    loaders/
      blog.data.ts
      cli.data.ts
    theme/
      custom.css
      index.ts
    utils/
      head.ts
      menus.ts
      types.ts
    config.ts
    Dockerfile
  api/
    cli/
      wxt-build.md
      wxt-clean.md
      wxt-init.md
      wxt-prepare.md
      wxt-submit-init.md
      wxt-submit.md
      wxt-zip.md
      wxt.md
  blog/
    .drafts/
      2024-10-19-real-world-messaging.md
    2024-12-06-using-imports-module.md
  guide/
    essentials/
      config/
        auto-imports.md
        browser-startup.md
        build-mode.md
        entrypoint-loaders.md
        environment-variables.md
        hooks.md
        manifest.md
        runtime.md
        typescript.md
        vite.md
      assets.md
      content-scripts.md
      e2e-testing.md
      entrypoints.md
      es-modules.md
      extension-apis.md
      frontend-frameworks.md
      i18n.md
      messaging.md
      project-structure.md
      publishing.md
      remote-code.md
      scripting.md
      storage.md
      target-different-browsers.md
      testing-updates.md
      unit-testing.md
      wxt-modules.md
    resources/
      community.md
      compare.md
      faq.md
      how-wxt-works.md
      migrate.md
      upgrading.md
    installation.md
    introduction.md
  public/
    _redirects
    hero-logo.svg
    logo.svg
    robots.txt
  tapes/
    init-demo.tape
  analytics.md
  auto-icons.md
  blog.md
  examples.md
  i18n.md
  index.md
  storage.md
  typedoc.json
  unocss.md
```

# Files

## File: docs/.vitepress/components/BlogHome.vue
````vue
<script lang="ts" setup>
import { computed } from 'vue';
// @ts-expect-error: Vitepress data-loader magic, this import is correct
import { data } from '../loaders/blog.data';
import BlogPostPreview from './BlogPostPreview.vue';

const posts = computed(() =>
  data
    .map((post) => ({
      ...post,
      ...post.frontmatter,
      date: new Date(post.frontmatter.date),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime()),
);
</script>

<template>
  <div class="container">
    <div>
      <div class="vp-doc">
        <h1>Blog</h1>
      </div>

      <ul>
        <BlogPostPreview v-for="post of posts" :key="post.url" :post />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container > div {
  padding: 32px;
  max-width: 900px;
  width: 100%;
  min-width: 0;
}

h1 {
  padding-bottom: 16px;
}

ul {
  display: flex;
  flex-direction: column;
  list-style: none;
}
ul,
li {
  padding: 0;
  margin: 0;
}

ul li {
  padding-top: 16px;
  margin-top: 16px;
  border-top: 1px solid var(--vp-c-default);
}
ul li:last-child {
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--vp-c-default);
}
</style>
````

## File: docs/.vitepress/components/BlogLayout.vue
````vue
<script lang="ts" setup>
import useBlogDate from '../composables/useBlogDate';
import { useData } from 'vitepress';

const { frontmatter } = useData();
const date = useBlogDate(() => frontmatter.value.date);
</script>

<template>
  <div class="vp-doc">
    <main class="container-content">
      <h1 v-html="$frontmatter.title" />
      <p class="meta-row">
        <a
          class="author"
          v-for="author of $frontmatter.authors"
          :key="author.github"
          :href="`https://github.com/${author.github}`"
        >
          <img :src="`https://github.com/${author.github}.png?size=96`" />
          <span>{{ author.name }}</span>
        </a>
        <span>&bull;</span>
        <span>{{ date }}</span>
      </p>
      <Content />
    </main>
  </div>
</template>

<style scoped>
vp-doc {
  display: flex;
}
main {
  max-width: 1080px;
  padding: 32px;
  margin: auto;
}
@media (min-width: 768px) {
  main {
    padding: 64px;
  }
}
.meta-row {
  display: flex;
  color: var(--vp-c-text-2);
  gap: 16px;
  overflow: hidden;
  padding-bottom: 32px;
}
.meta-row > * {
  flex-shrink: 0;
}
.author {
  display: flex;
  gap: 8px;
  align-items: center;
  color: var(--vp-c-text-2);
  font-weight: normal;
  text-decoration: none;
}
.author img {
  width: 24px;
  height: 24px;
  border-radius: 100%;
}
.author span {
  padding: 0;
  margin: 0;
}
.author:hover {
  text-decoration: underline;
  color: var(--vp-c-text-2);
}
</style>
````

## File: docs/.vitepress/components/BlogPostPreview.vue
````vue
<script lang="ts" setup>
import useBlogDate from '../composables/useBlogDate';

const props = defineProps<{
  post: {
    title: string;
    description?: string;
    date: Date;
    url: string;
    authors: Array<{ name: string; github: string }>;
  };
}>();

const date = useBlogDate(() => props.post.date);
</script>

<template>
  <li class="blog-list-item">
    <a :href="post.url">
      <div class="vp-doc">
        <h3 class="title" v-html="post.title" />
        <p class="description" v-html="post.description" />
        <p class="meta">
          {{ post.authors.map((author) => author.name).join(', ') }}
          &bull;
          {{ date }}
        </p>
      </div>
    </a>
  </li>
</template>

<style scoped>
li {
  padding: 0;
  margin: 0;
}

p {
  margin: 0;
}
h3 {
  margin: 0;
  padding: 0;
  border: none;
}

li > a > div {
  display: flex;
  flex-direction: column;
  margin: 0 -16px;
  padding: 16px;
  border-radius: 16px;
}
li > a > div:hover {
  background: var(--vp-c-default);
}
li .title {
  color: var(--vp-c-text);
  margin-bottom: 12px;
}
li .description {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}
li .meta {
  font-weight: 400;
  font-size: 12px;
  color: var(--vp-c-text-2);
}
</style>
````

## File: docs/.vitepress/components/EntrypointPatterns.vue
````vue
<script lang="ts" setup>
const props = defineProps<{
  patterns: Array<[intput: string, output: string]>;
}>();
</script>

<template>
  <table class="no-vertical-dividers">
    <thead>
      <tr>
        <th style="width: 100%">Filename</th>
        <th></th>
        <th>Output Path</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="pattern of patterns">
        <td style="white-space: nowrap; padding-right: 8px">
          <code>entrypoints/{{ pattern[0] }}</code>
        </td>
        <td style="padding: 6px; opacity: 50%">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M4 11v2h12l-5.5 5.5l1.42 1.42L19.84 12l-7.92-7.92L10.5 5.5L16 11H4Z"
            />
          </svg>
        </td>
        <td style="white-space: nowrap; padding-left: 8px">
          <code>/{{ pattern[1] }}</code>
        </td>
      </tr>
    </tbody>
  </table>
</template>
````

## File: docs/.vitepress/components/ExampleSearch.vue
````vue
<script lang="ts" setup>
import { ref, onMounted, computed, toRaw, Ref } from 'vue';
import ExampleSearchFilterByItem from './ExampleSearchFilterByItem.vue';
import ExampleSearchResult from './ExampleSearchResult.vue';
import { ExamplesMetadata, KeySelectedObject } from '../utils/types';

const props = defineProps<{
  tag?: string;
}>();

const exampleMetadata = ref<ExamplesMetadata>();
onMounted(async () => {
  const res = await fetch(
    'https://raw.githubusercontent.com/wxt-dev/examples/main/metadata.json',
  );
  exampleMetadata.value = await res.json();
});

const searchText = ref('');
const selectedApis = ref<KeySelectedObject>({});
const selectedPermissions = ref<KeySelectedObject>({});
const selectedPackages = ref<KeySelectedObject>({});

function useRequiredItems(selectedItems: Ref<KeySelectedObject>) {
  return computed(() =>
    Array.from(
      Object.entries(toRaw(selectedItems.value)).reduce(
        (set, [pkg, checked]) => {
          if (checked) set.add(pkg);
          return set;
        },
        new Set<string>(),
      ),
    ),
  );
}
const requiredApis = useRequiredItems(selectedApis);
const requiredPermissions = useRequiredItems(selectedPermissions);
const requiredPackages = useRequiredItems(selectedPackages);

function doesExampleMatchSelected(
  exampleItems: string[],
  requiredItems: Ref<string[]>,
) {
  const exampleItemsSet = new Set(exampleItems);
  return !requiredItems.value.find((item) => !exampleItemsSet.has(item));
}

const filteredExamples = computed(() => {
  const text = searchText.value.toLowerCase();
  return exampleMetadata.value.examples.filter((example) => {
    const matchesText = example.searchText.toLowerCase().includes(text);
    const matchesApis = doesExampleMatchSelected(example.apis, requiredApis);
    const matchesPermissions = doesExampleMatchSelected(
      example.permissions,
      requiredPermissions,
    );
    const matchesPackages = doesExampleMatchSelected(
      example.packages,
      requiredPackages,
    );
    return matchesText && matchesApis && matchesPermissions && matchesPackages;
  });
});
</script>

<template>
  <div class="example-layout">
    <div class="search">
      <input v-model="searchText" placeholder="Search for an example..." />
    </div>

    <div class="filters">
      <ExampleSearchFilterByItem
        label="APIs"
        :items="exampleMetadata?.allApis"
        v-model="selectedApis"
      />
      <ExampleSearchFilterByItem
        label="Permissions"
        :items="exampleMetadata?.allPermissions"
        v-model="selectedPermissions"
      />
      <ExampleSearchFilterByItem
        label="Packages"
        :items="exampleMetadata?.allPackages"
        v-model="selectedPackages"
      />
    </div>

    <div class="results">
      <p v-if="exampleMetadata == null">Loading examples...</p>
      <template v-else>
        <ul class="search-results">
          <ExampleSearchResult
            v-for="example of filteredExamples"
            :key="example.name"
            :example
          />
        </ul>
        <p v-if="filteredExamples.length === 0">No matching examples</p>
      </template>
    </div>
  </div>
</template>

<style scoped>
.example-layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas:
    'search'
    'results';
  gap: 16px;
}
@media only screen and (min-width: 720px) {
  .example-layout {
    grid-template-columns: 256px 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'filters search'
      'filters results';
  }
}
.search {
  grid-area: search;
  background: var(--vp-c-bg-soft);
  padding: 20px;
  width: 100%;
  display: flex;
  border-radius: 16px;
}
.filters {
  display: none;
  grid-area: filters;
}
@media only screen and (min-width: 720px) {
  .filters {
    display: flex;
    flex-direction: column;
    gap: 2px;
    border-radius: 16px;
    overflow: hidden;
    align-self: flex-start;
  }
}
.results {
  grid-area: results;
}

.box {
  border-radius: 16px;
  overflow: hidden;
}

.search input {
  min-width: 0;
  flex: 1;
  font-size: 16px;
}

.checkbox-col {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 200px;
  font-size: 14px;
  gap: 4px;
}

.filter-btn {
  color: var(--vp-c-brand-1);
}

.checkbox-col .header {
  font-size: 12px;
  font-weight: bold;
  opacity: 50%;
}

.checkbox-col p {
  display: flex;
  gap: 4px;
  align-items: flex-start;
  text-wrap: wrap;
  overflow-wrap: anywhere;
  line-height: 140%;
}

span {
  padding-top: 1px;
}

.checkbox-col input[type='checkbox'] {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.checkbox-col-container {
  display: flex;
}

.search-results {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
}
@media only screen and (min-width: 800px) {
  .search-results {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media only screen and (min-width: 1024px) {
  .search-results {
    grid-template-columns: repeat(3, 1fr);
  }
}

a {
  background-color: red;
}
</style>
````

## File: docs/.vitepress/components/ExampleSearchFilterByItem.vue
````vue
<script lang="ts" setup>
import { computed, toRaw } from 'vue';
import { KeySelectedObject } from '../utils/types';

const props = defineProps<{
  label: string;
  items?: string[];
}>();

const selectedItems = defineModel<KeySelectedObject>({
  required: true,
});

const count = computed(() => {
  return Object.values(toRaw(selectedItems.value)).filter(Boolean).length;
});

function toggleItem(pkg: string) {
  selectedItems.value = {
    ...toRaw(selectedItems.value),
    [pkg]: !selectedItems.value[pkg],
  };
}
</script>

<template>
  <div class="filter-container">
    <p class="header">
      <span>Filter by {{ label }}</span> <span v-if="count">({{ count }})</span>
    </p>
    <div class="scroll-container">
      <ul>
        <li v-for="item in items">
          <label :title="item">
            <input
              type="checkbox"
              :checked="selectedItems[item]"
              @input="toggleItem(item)"
            />
            <span>{{ item }}</span>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.filter-container {
  height: 300px;
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg-soft);
}

.scroll-container {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.scroll-container ul {
  position: absolute;
  overflow-y: auto;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: small;
  padding: 8px 16px 16px 16px;
}

.header {
  padding: 8px 16px;
  font-size: 12px;
  font-weight: bold;
  opacity: 50%;
}
label {
  display: flex;
  gap: 4px;
  align-items: flex-start;
  text-wrap: wrap;
  overflow-wrap: anywhere;
  line-height: 140%;
  cursor: pointer;
  text-wrap: nowrap;
}
span {
  padding-top: 1px;
}
input[type='checkbox'] {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}
</style>
````

## File: docs/.vitepress/components/ExampleSearchResult.vue
````vue
<script lang="ts" setup>
import { Example } from '../utils/types';

const props = defineProps<{
  example: Example;
}>();
</script>

<template>
  <li>
    <a :href="example.url" target="_blank">
      <p class="name">{{ example.name }}</p>
      <p class="description">{{ example.description }}</p>
      <p class="link">Open &rarr;</p>
    </a>
  </li>
</template>

<style scoped>
* {
  min-width: 0;
}
a {
  padding: 16px;
  display: flex;
  flex-direction: column;
  border: 2px solid var(--vp-c-bg-soft);
  border-radius: 16px;
  color: var(--vp-c-text-1) !important;
  gap: 8px;
}

a:hover {
  outline: 2px solid var(--vp-c-brand-2);
}
.name {
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.description {
  height: 53px;
  opacity: 70%;
  font-size: 14px;
  font-weight: normal;
  line-height: 120%;
  min-height: 0;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.link {
  opacity: 0;
  transition: 250ms;
  color: var(--vp-c-brand-2);
  font-weight: bold;
  text-align: right;
}
a:hover .link {
  opacity: 100%;
}
</style>
````

## File: docs/.vitepress/components/Icon.vue
````vue
<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  name: string;
  icon?: string;
}>();

const src = computed(() => {
  if (props.icon) return props.icon;
  return `https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/${props.name.toLowerCase()}.svg`;
});
</script>

<template>
  <img :src="src" :alt="`${name} Logo`" />
</template>

<style scoped>
img {
  display: inline;
  transform: translateY(5px);
  margin-right: 8px;
  width: 20px;
}
</style>
````

## File: docs/.vitepress/components/UsingWxtSection.vue
````vue
<script lang="ts" setup>
import { computed } from 'vue';
import useListExtensionDetails, {
  ChromeExtension,
} from '../composables/useListExtensionDetails';

// Add extension IDs here. Order doesn't matter, will be sorted by a combination of weekly active users and rating.
// Change the commit message or PR title to: "docs: Added "[extension name]" to the homepage"
const chromeExtensionIds = [
  'ocfdgncpifmegplaglcnglhioflaimkd', // GitHub: Better Line Counts
  'mgmdkjcljneegjfajchedjpdhbadklcf', // Anime Skip Player
  'bfbnagnphiehemkdgmmficmjfddgfhpl', // UltraWideo
  'elfaihghhjjoknimpccccmkioofjjfkf', // StayFree - Website Blocker & Web Analytics
  'okifoaikfmpfcamplcfjkpdnhfodpkil', // Doozy: Ai Made Easy
  'lknmjhcajhfbbglglccadlfdjbaiifig', // tl;dv - Record, Transcribe & ChatGPT for Google Meet
  'oglffgiaiekgeicdgkdlnlkhliajdlja', // Youtube中文配音
  'agjnjboanicjcpenljmaaigopkgdnihi', // PreMiD
  'aiakblgmlabokilgljkglggnpflljdgp', // Markdown Sticky Notes
  'nomnkbngkijpffepcgbbofhcnafpkiep', // DocVersionRedirector
  'ceicccfeikoipigeghddpocceifjelph', // Plex Skipper
  'aelkipgppclpfimeamgmlonimflbhlgf', // GitHub Custom Notifier
  'djnlaiohfaaifbibleebjggkghlmcpcj', // Fluent Read
  'nhclljcpfmmaiojbhhnkpjcfmacfcian', // Facebook Video Controls
  'mblkhbaakhbhiimkbcnmeciblfhmafna', // ElemSnap - Quick capture of webpage elements and conversion to images,
  'oajalfneblkfiejoadecnmodfpnaeblh', // MS Edge TTS (Text to Speech)
  'nedcanggplmbbgmlpcjiafgjcpdimpea', // YTBlock - Block any content from YouTube™
  'oadbjpccljkplmhnjekgjamejnbadlne', // demo.fun - Interactive product demos that convert
  'iopdafdcollfgaoffingmahpffckmjni', // SmartEReply: Elevate Your LinkedIn™ Engagement with AI 🚀📈
  'khjdmjcmpolknpccmaaipmidphjokhdf', // WorkFlowy MultiFlow
  'fencadnndhdeggodopebjgdfdlhcimfk', // 香草布丁🌿🍮- https://github.com/Xdy1579883916/vanilla-pudding
  'bnacincmbaknlbegecpioobkfgejlojp', // MaxFocus: Link Preview
  'bcpgdpedphodjcjlminjbdeejccjbimp', // 汇率转换-中文版本
  'loeilaonggnalkaiiaepbegccilkmjjp', // Currency Converter Plus
  'npcnninnjghigjfiecefheeibomjpkak', // Respond Easy
  'cfkdcideecefncbglkhneoflfnmhoicc', // mindful - stay focused on your goals
  'lnhejcpclabmbgpiiomjbhalblnnbffg', // 1Proompt
  'fonflmjnjbkigocpoommgmhljdpljain', // NiceTab - https://github.com/web-dahuyou/NiceTab
  'fcffekbnfcfdemeekijbbmgmkognnmkd', // Draftly for LinkedIn
  'nkndldfehcidpejfkokbeghpnlbppdmo', // YouTube Summarized - Summarize any YouTube video
  'dbichmdlbjdeplpkhcejgkakobjbjalc', // 社媒助手 - https://github.com/iszhouhua/social-media-copilot
  'opepfpjeogkbgeigkbepobceinnfmjdd', // Dofollow Links for SEO
  'pdnenlnelpdomajfejgapbdpmjkfpjkp', // ChatGPT Writer: Use AI on Any Site (GPT-4o, Claude, Gemini, and More)
  'jobnhifpphkgoelnhnopgkdhbdkiadmj', // discord message translator
  'ncokhechhpjgjonhjnlaneglmdkfkcbj', // Habit Tracker app widget for daily habit tracking
  'lnjaiaapbakfhlbjenjkhffcdpoompki', // Catppuccin for GitHub File Explorer Icons
  'cpaedhbidlpnbdfegakhiamfpndhjpgf', // WebChat: Chat with anyone on any website
  'fcphghnknhkimeagdglkljinmpbagone', // YouTube Auto HD + FPS
  'lpomjgbicdemjkgmbnkjncgdebogkhlb', // MultiViewer Companion
  'ggiafipgeeaaahnjamgpjcgkdpanhddg', // Sync Watch - Watch videos together on any site
  'nmldnjcblcihmegipecakhmnieiofmgl', // Keyword Rank Checker
  'gppllamhaciichleihemgilcpledblpn', // YouTube Simple View - Hide distractions & more
  'pccbghdfdnnkkbcdcibchpbffdgednkf', // Propbar - Property Data Enhancer
  'lfknakglefggmdkjdfhhofkjnnolffkh', // Text Search Pro - Search by case and whole-word match!
  'mbenhbocjckkbaojacmaepiameldglij', // Invoice Generator
  'phlfhkmdofajnbhgmbmjkbkdgppgoppb', // Monthly Bill Tracker
  'macmkmchfoclhpbncclinhjflmdkaoom', // Wandpen - Instantly improve your writing with AI
  'lhmgechokhmdekdpgkkemoeecelcaonm', // YouTube Hider - Remove Comments By Keywords, Usernames & Tools
  'imgheieooppmahcgniieddodaliodeeg', // QA Compass - Record standardized bug reports easily
  'npgghjedpchajflknnbngajkjkdhncdo', // aesthetic Notion, styled
  'hmdcmlfkchdmnmnmheododdhjedfccka', // Eye Dropper
  'eihpmapodnppeemkhkbhikmggfojdkjd', // Cursorful - Screen Recorder with Auto Zoom
  'hjjkgbibknbahijglkffklflidncplkn', // Show IP – Live View of Website IPs for Developers
  'ilbikcehnpkmldojkcmlldkoelofnbde', // Strong Password Generator
  'ocllfkhcdopiafndigclebelbecaiocp', // ZenGram: Mindful Instagram, Your Way
  'odffpjnpocjfcaclnenaaaddghkgijdb', // Blync: Preview Links, Selection Search, AI Assistant
  'kofbbilhmnkcmibjbioafflgmpkbnmme', // HTML to Markdown - Convert webpages to markdown
  'boecmgggeigllcdocgioijmleimjbfkg', // Walmart WFS Profit Calculator
  'dlnjcbkmomenmieechnmgglgcljhoepd', // Youtube Live Chat Fullscreen
  'keiealdacakpnbbljlmhfgcebmaadieg', // Python Code Runner
  'hafcajcllbjnoolpfngclfmmgpikdhlm', // Monochromate
  'bmoggiinmnodjphdjnmpcnlleamkfedj', // AliasVault - Open-Source Password & (Email) Alias Manager
  'hlnhhamckimoaiekbglafiebkfimhapb', // SnapThePrice: AI-Powered Real-time Lowest Price Finder
  'gdjampjdgjmbifnhldgcnccdjkcoicmg', // radiofrance - news & broadcasts (French), music (international)
  'jlnhphlghikichhgbnkepenehbmloenb', // Blens - Time Tracker and AI Insight
  'njnammmpdodmfkodnfpammnpdcbhnlcm', // Always Light Mode - Setting website always in light mode
  'lblmfclcfniabobmamfkdogcgdagbhhb', // DesignPicker - Color Picker & Font Detector
  'pamnlaoeobcmhkliljfaofekeddpmfoh', // Web to PDF
  'jmbcbeepjfenihlocplnbmbhimcoooka', // Online CSV Viewer
  'nkjcoophmpcmmgadnljnlpbpfdfacgbo', // YouTube Video Transcript
  'lcaieahkjgeggeiihblhcjbbjlppgieh', // NetSuite Record Scripts
  'gmocfknjllodfiomnljmaehcplnekhlo', // VueTracker
  'ggcfemmoabhhelfkhknhbnkmeahloiod', // CanCopy - A web extension that allow you to copy any content from website
  'modkelfkcfjpgbfmnbnllalkiogfofhb', // Language Learning with AI
  'npfopljnjbamegincfjelhjhnonnjloo', // Bilibili Feed History Helper
  'edkhpdceeinkcacjdgebjehipmnbomce', // NZBDonkey - The ultimate NZB file download tool
  'cckggnbnimdbbpmdinkkgbbncopbloob', // WeChat Markdown Editor(微信 Markdown 编辑器)
  'jcblcjolcojmfopefcighfmkkefbaofg', // Tab Grab
];

const { data, err, isLoading } = useListExtensionDetails(chromeExtensionIds);
const sortedExtensions = computed(() => {
  if (!data.value?.length) return [];

  return [...data.value]
    .filter((item) => item != null)
    .map((item) => ({
      ...item,
      // Sort based on the user count weighted by the rating
      sortKey: ((item.rating ?? 5) / 5) * item.weeklyActiveUsers,
    }))
    .filter((item) => !!item)
    .sort((l, r) => r.sortKey - l.sortKey);
});

function getStoreUrl(extension: ChromeExtension) {
  const url = new URL(extension.storeUrl);
  url.searchParams.set('utm_source', 'wxt.dev');
  return url.href;
}
</script>

<template>
  <p v-if="isLoading" style="text-align: center; opacity: 50%">Loading...</p>
  <p
    v-else-if="err || sortedExtensions.length === 0"
    style="text-align: center; opacity: 50%"
  >
    Failed to load extension details.
  </p>
  <ul v-else>
    <li
      v-for="extension of sortedExtensions"
      :key="extension.id"
      class="relative"
    >
      <img
        :src="extension.iconUrl"
        :alt="`${extension.name} icon`"
        referrerpolicy="no-referrer"
      />
      <div class="relative">
        <a
          :href="getStoreUrl(extension)"
          target="_blank"
          :title="extension.name"
          class="extension-name"
          >{{ extension.name }}</a
        >
        <p class="description" :title="extension.shortDescription">
          {{ extension.shortDescription }}
        </p>
      </div>
      <p class="user-count">
        <span>{{ extension.weeklyActiveUsers.toLocaleString() }} users</span
        ><template v-if="extension.rating != null"
          >,
          <span>{{ extension.rating }} stars</span>
        </template>
      </p>
    </li>
  </ul>
  <p class="centered pr">
    <a
      href="https://github.com/wxt-dev/wxt/edit/main/docs/.vitepress/components/UsingWxtSection.vue"
      target="_blank"
      >Open a PR</a
    >
    to add your extension to the list!
  </p>
</template>

<style scoped>
li img {
  width: 116px;
  height: 116px;
  padding: 16px;
  border-radius: 8px;
  background-color: var(--vp-c-default-soft);
}

ul {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  align-items: stretch;
  gap: 16px;
  list-style: none;
  margin: 16px 0;
  padding: 0;
}
@media (min-width: 960px) {
  ul {
    grid-template-columns: repeat(2, 1fr);
  }
}

li {
  margin: 0 !important;
  padding: 16px;
  display: flex;
  background-color: var(--vp-c-bg-soft);
  border-radius: 12px;
  flex: 1;
  gap: 24px;
  align-items: center;
}

.centered {
  text-align: center;
}

li a,
li .user-count,
li .description {
  padding: 0;
  margin: 0;
}
li .user-count {
  opacity: 70%;
  font-size: small;
  position: absolute;
  bottom: 12px;
  right: 16px;
}

li a {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  margin: 0;
  text-decoration: none;
}
li a:hover {
  text-decoration: underline;
}

li div {
  flex: 1;
}

li .description {
  opacity: 90%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 16px;
}

li .extension-name {
  font-size: large;
}

.pr {
  opacity: 70%;
}

.relative {
  position: relative;
}
</style>
````

## File: docs/.vitepress/composables/useBlogDate.ts
````typescript
import { computed, toValue, MaybeRefOrGetter } from 'vue';

const MONTH_FORMATTER = new Intl.DateTimeFormat(
  globalThis?.navigator?.language,
  {
    month: 'long',
  },
);

export default function (date: MaybeRefOrGetter<Date | string>) {
  return computed(() => {
    const d = new Date(toValue(date));
    return `${MONTH_FORMATTER.format(d)} ${d.getDate()}, ${d.getFullYear()}`;
  });
}
````

## File: docs/.vitepress/composables/useListExtensionDetails.ts
````typescript
import { ref } from 'vue';

export interface ChromeExtension {
  id: string;
  name: string;
  iconUrl: string;
  weeklyActiveUsers: number;
  shortDescription: string;
  storeUrl: string;
  rating: number | undefined;
}

const operationName = 'WxtDocsUsedBy';
const query = `query ${operationName}($ids:[String!]!) {
  chromeExtensions(ids: $ids) {
    id
    name
    iconUrl
    weeklyActiveUsers
    shortDescription
    storeUrl
    rating
  }
}`;

export default function (ids: string[]) {
  const data = ref<ChromeExtension[]>();
  const err = ref<unknown>();
  const isLoading = ref(true);

  fetch('https://queue.wxt.dev/api', {
    method: 'POST',
    body: JSON.stringify({
      operationName,
      query,
      variables: { ids },
    }),
  })
    .then(async (res) => {
      isLoading.value = false;
      const {
        data: { chromeExtensions },
      } = await res.json();
      data.value = chromeExtensions;
      err.value = undefined;
    })
    .catch((error) => {
      isLoading.value = false;
      console.error(error);
      data.value = undefined;
      err.value = error;
    });

  return {
    data,
    err,
    isLoading,
  };
}
````

## File: docs/.vitepress/loaders/blog.data.ts
````typescript
import { createContentLoader } from 'vitepress';

export default createContentLoader('blog/*.md');
````

## File: docs/.vitepress/loaders/cli.data.ts
````typescript
import { resolve } from 'node:path';
import consola from 'consola';
import spawn from 'nano-spawn';

const cliDir = resolve('packages/wxt/src/cli/commands');
const cliDirGlob = resolve(cliDir, '**');

export default {
  watch: [cliDirGlob],
  async load() {
    consola.info(`Generating CLI docs`);

    const [wxt, build, zip, prepare, clean, init, submit, submitInit] =
      await Promise.all([
        getWxtHelp(''),
        getWxtHelp('build'),
        getWxtHelp('zip'),
        getWxtHelp('prepare'),
        getWxtHelp('clean'),
        getWxtHelp('init'),
        getPublishExtensionHelp(''),
        getPublishExtensionHelp('init'),
      ]);

    consola.success(`Generated CLI docs`);
    return {
      wxt,
      build,
      zip,
      prepare,
      clean,
      init,
      submit,
      submitInit,
    };
  },
};

async function getHelp(command: string): Promise<string> {
  const args = command.split(' ');
  const res = await spawn(args[0], [...args.slice(1), '--help'], {
    cwd: 'packages/wxt',
  });
  return res.stdout;
}

function getWxtHelp(command: string): Promise<string> {
  return getHelp(`pnpm -s wxt ${command}`.trim());
}

async function getPublishExtensionHelp(command: string): Promise<string> {
  const res = await getHelp(
    `./node_modules/.bin/publish-extension ${command}`.trim(),
  );
  return res.replace(/\$ publish-extension/g, '$ wxt submit');
}

export interface Command {
  name: string;
  docs: string;
}
````

## File: docs/.vitepress/theme/custom.css
````css
/* Colors */
:root {
  --wxt-c-green-1: #0b8a00;
  --wxt-c-green-2: #096600;
  --wxt-c-green-3: #096600;
  --wxt-c-green-soft: rgba(11, 138, 0, 0.14);
}

.dark {
  --wxt-c-green-1: #67d45e;
  --wxt-c-green-2: #329929;
  --wxt-c-green-3: #21651b;
  --wxt-c-green-soft: rgba(103, 212, 94, 0.14);
}

/* https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/styles/vars.css */

:root {
  --vp-c-brand-1: var(--wxt-c-green-1);
  --vp-c-brand-2: var(--wxt-c-green-2);
  --vp-c-brand-3: var(--wxt-c-green-3);
  --vp-c-brand-soft: var(--wxt-c-green-soft);
}

/* Customize Individual Components */

.vp-doc .no-vertical-dividers th,
.vp-doc .no-vertical-dividers td {
  border: none;
}

.vp-doc .no-vertical-dividers tr {
  border: 1px solid var(--vp-c-divider);
}

body {
  overflow-y: scroll;
}

.VPSidebar {
  user-select: none;
}

.VPSidebarItem .badge {
  display: inline-block;
  min-width: 1.6em;
  padding: 0.3em 0.4em 0.2em;
  border-radius: 1rem;
  font-size: 0.75em;
  line-height: 1;
  margin-left: 0.5rem;
  text-align: center;
  vertical-align: middle;
  background-color: var(--vp-c-default-2);
}

.light-netlify {
  display: inline;
}
.dark .light-netlify {
  display: none;
}
.dark-netlify {
  display: none;
}
.dark .dark-netlify {
  display: inline;
}
````

## File: docs/.vitepress/theme/index.ts
````typescript
import DefaultTheme from 'vitepress/theme';
import Icon from '../components/Icon.vue';
import EntrypointPatterns from '../components/EntrypointPatterns.vue';
import UsingWxtSection from '../components/UsingWxtSection.vue';
import ExampleSearch from '../components/ExampleSearch.vue';
import BlogLayout from '../components/BlogLayout.vue';
import './custom.css';
import 'virtual:group-icons.css';

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    ctx.app
      .component('Icon', Icon)
      .component('EntrypointPatterns', EntrypointPatterns)
      .component('UsingWxtSection', UsingWxtSection)
      .component('ExampleSearch', ExampleSearch)
      .component('blog', BlogLayout);
  },
};
````

## File: docs/.vitepress/utils/head.ts
````typescript
import { HeadConfig } from 'vitepress/types/shared';

export function meta(
  property: string,
  content: string,
  options?: { useName: boolean },
): HeadConfig {
  return [
    'meta',
    {
      [options?.useName ? 'name' : 'property']: property,
      content,
    },
  ];
}

export function script(
  src: string,
  props: Record<string, string> = {},
): HeadConfig {
  return [
    'script',
    {
      ...props,
      src,
    },
  ];
}
````

## File: docs/.vitepress/utils/menus.ts
````typescript
import { DefaultTheme } from 'vitepress';

type SidebarItem = DefaultTheme.SidebarItem;
type NavItem = DefaultTheme.NavItem;
type NavItemWithLink = DefaultTheme.NavItemWithLink;
type NavItemWithChildren = DefaultTheme.NavItemWithChildren;
type NavItemChildren = DefaultTheme.NavItemChildren;

export function navItem(text: string): NavItemChildren;
export function navItem(text: string, link: string): NavItemChildren;
export function navItem(text: string, items: any[]): NavItemWithChildren;
export function navItem(text: string, arg2?: unknown): any {
  if (typeof arg2 === 'string') {
    return { text, link: arg2 };
  } else if (Array.isArray(arg2)) {
    return { text, items: arg2 };
  }
  return { text };
}

export function menuRoot(items: SidebarItem[]) {
  return items.map((item, index) => {
    // item.collapsed = false; // uncomment to expand all level-0 items
    return item;
  });
}

export function menuGroup(
  text: string,
  items: SidebarItem[],
  collapsible?: boolean,
): SidebarItem;
export function menuGroup(
  text: string,
  base: string,
  items: SidebarItem[],
  collapsible?: boolean,
): SidebarItem;
export function menuGroup(
  text: string,
  a: string | SidebarItem[],
  b?: SidebarItem[] | boolean,
  c?: boolean,
): SidebarItem {
  if (typeof a === 'string' && Array.isArray(b)) {
    return {
      text,
      base: a,
      items: b,
      collapsed: c,
    };
  }
  if (typeof a !== 'string' && !Array.isArray(b))
    return {
      text,
      items: a,
      collapsed: b,
    };

  throw Error('Unknown overload');
}

export function menuItems(items: SidebarItem[]) {
  return {
    items,
  };
}

export function menuItem(
  text: string,
  link: string,
  items?: SidebarItem[],
): SidebarItem {
  if (items) {
    return { text, link, items };
  }
  return { text, link };
}

/**
 * Clean up and add badges to typedoc leaf sections
 */
export function prepareTypedocSidebar(items: SidebarItem[]) {
  // skip contents file
  const filtered = items.slice(1);

  // remove Typedoc's collapse: true from text nodes
  const prepareItems = (items: DefaultTheme.SidebarItem[], depth = 0) => {
    for (const item of items) {
      if (item.items) {
        prepareItems(item.items, depth + 1);
        const hasLeaves = item.items.some((item) => !item.items);
        if (hasLeaves) {
          item.text += ` <span class="badge">${item.items.length}</span>`;
        }
      } else {
        delete item.collapsed;
      }
    }
  };

  // process
  prepareItems(filtered);

  // return
  return filtered;
}
````

## File: docs/.vitepress/utils/types.ts
````typescript
export interface Example {
  name: string;
  description?: string;
  url: string;
  searchText: string;
  apis: string[];
  permissions: string[];
  packages: string[];
}

export type ExamplesMetadata = {
  examples: Example[];
  allApis: string[];
  allPermissions: string[];
  allPackages: string[];
};

export type KeySelectedObject = Record<string, boolean | undefined>;
````

## File: docs/.vitepress/config.ts
````typescript
import { DefaultTheme, defineConfig } from 'vitepress';
import typedocSidebar from '../api/reference/typedoc-sidebar.json';
import {
  menuGroup,
  menuItem,
  menuRoot,
  navItem,
  prepareTypedocSidebar,
} from './utils/menus';
import { meta, script } from './utils/head';
import footnote from 'markdown-it-footnote';
import { version as wxtVersion } from '../../packages/wxt/package.json';
import { version as i18nVersion } from '../../packages/i18n/package.json';
import { version as autoIconsVersion } from '../../packages/auto-icons/package.json';
import { version as unocssVersion } from '../../packages/unocss/package.json';
import { version as storageVersion } from '../../packages/storage/package.json';
import { version as analyticsVersion } from '../../packages/analytics/package.json';
import addKnowledge from 'vitepress-knowledge';
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
  localIconLoader,
} from 'vitepress-plugin-group-icons';
import { Feed } from 'feed';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const origin = 'https://wxt.dev';

const title = 'Next-gen Web Extension Framework';
const titleSuffix = ' – WXT';
const description =
  "WXT provides the best developer experience, making it quick, easy, and fun to develop web extensions. With built-in utilities for building, zipping, and publishing your extension, it's easy to get started.";
const ogTitle = `${title}${titleSuffix}`;
const ogUrl = origin;
const ogImage = `${origin}/social-preview.png`;

const otherPackages = {
  analytics: analyticsVersion,
  'auto-icons': autoIconsVersion,
  i18n: i18nVersion,
  storage: storageVersion,
  unocss: unocssVersion,
};

const knowledge = addKnowledge<DefaultTheme.Config>({
  serverUrl: 'https://knowledge.wxt.dev',
  paths: {
    '/': 'docs',
    '/api/': 'api-reference',
    '/blog/': 'blog',
  },
  layoutSelectors: {
    blog: '.container-content',
  },
  pageSelectors: {
    'examples.md': '#VPContent > .VPPage',
    'blog.md': '#VPContent > .VPPage',
  },
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: knowledge,

  titleTemplate: `:title${titleSuffix}`,
  title: 'WXT',
  description,
  vite: {
    clearScreen: false,
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          'wxt.config.ts': localIconLoader(
            import.meta.url,
            '../public/logo.svg',
          ),
        },
      }),
    ],
  },
  lastUpdated: true,
  sitemap: {
    hostname: origin,
  },

  async buildEnd(site) {
    // @ts-expect-error: knowledge.buildEnd is not typed, but it exists.
    await knowledge.buildEnd(site);

    // Only construct the RSS document for production builds
    const { default: blogDataLoader } = await import('./loaders/blog.data');
    const posts = await blogDataLoader.load();
    const feed = new Feed({
      copyright: 'MIT',
      id: 'wxt',
      title: 'WXT Blog',
      link: `${origin}/blog`,
    });
    posts.forEach((post) => {
      feed.addItem({
        date: post.frontmatter.date,
        link: new URL(post.url, origin).href,
        title: post.frontmatter.title,
        description: post.frontmatter.description,
      });
    });
    // console.log('rss.xml:');
    // console.log(feed.rss2());
    await writeFile(join(site.outDir, 'rss.xml'), feed.rss2(), 'utf8');
  },

  head: [
    meta('og:type', 'website'),
    meta('og:title', ogTitle),
    meta('og:image', ogImage),
    meta('og:url', ogUrl),
    meta('og:description', description),
    meta('twitter:card', 'summary_large_image', { useName: true }),
    script('https://umami.aklinker1.io/script.js', {
      'data-website-id': 'c1840c18-a12c-4a45-a848-55ae85ef7915',
      async: '',
    }),
  ],

  markdown: {
    config: (md) => {
      md.use(footnote);
      md.use(groupIconMdPlugin);
    },
    languageAlias: {
      mjs: 'js',
    },
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      src: '/logo.svg',
      alt: 'WXT logo',
    },

    footer: {
      message: [
        '<a class="light-netlify" href="https://www.netlify.com"> <img src="https://www.netlify.com/v3/img/components/netlify-color-bg.svg" alt="Deploys by Netlify" style="display: inline;" /></a>',
        '<a class="dark-netlify" href="https://www.netlify.com"> <img src="https://www.netlify.com/v3/img/components/netlify-color-accent.svg" alt="Deploys by Netlify" style="display: inline;" /></a>',
        'Released under the <a href="https://github.com/wxt-dev/wxt/blob/main/LICENSE">MIT License</a>.',
      ].join('<br/>'),
      copyright:
        'Copyright © 2023-present <a href="https://github.com/aklinker1">Aaron Klinker</a>',
    },

    editLink: {
      pattern: 'https://github.com/wxt-dev/wxt/edit/main/docs/:path',
    },

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/ZFsZqGery9' },
      { icon: 'github', link: 'https://github.com/wxt-dev/wxt' },
    ],

    nav: [
      navItem('Guide', '/guide/installation'),
      navItem('Examples', '/examples'),
      navItem('API', '/api/reference/wxt'),
      navItem('Blog', '/blog'),
      navItem(`v${wxtVersion}`, [
        navItem('wxt', [
          navItem(`v${wxtVersion}`, '/'),
          navItem(
            `Changelog`,
            'https://github.com/wxt-dev/wxt/blob/main/packages/wxt/CHANGELOG.md',
          ),
        ]),
        navItem(
          'Other Packages',
          Object.entries(otherPackages).map(([name, version]) =>
            navItem(`@wxt-dev/${name} — ${version}`, `/${name}`),
          ),
        ),
      ]),
    ],

    sidebar: {
      '/guide/': menuRoot([
        menuGroup('Get Started', '/guide/', [
          menuItem('Introduction', 'introduction.md'),
          menuItem('Installation', 'installation.md'),
        ]),
        menuGroup('Essentials', '/guide/essentials/', [
          menuItem('Project Structure', 'project-structure.md'),
          menuItem('Entrypoints', 'entrypoints.md'),
          menuGroup(
            'Configuration',
            '/guide/essentials/config/',
            [
              menuItem('Manifest', 'manifest.md'),
              menuItem('Browser Startup', 'browser-startup.md'),
              menuItem('Auto-imports', 'auto-imports.md'),
              menuItem('Environment Variables', 'environment-variables.md'),
              menuItem('Runtime Config', 'runtime.md'),
              menuItem('Vite', 'vite.md'),
              menuItem('Build Mode', 'build-mode.md'),
              menuItem('TypeScript', 'typescript.md'),
              menuItem('Hooks', 'hooks.md'),
              menuItem('Entrypoint Loaders', 'entrypoint-loaders.md'),
            ],
            true,
          ),
          menuItem('Extension APIs', 'extension-apis.md'),
          menuItem('Assets', 'assets.md'),
          menuItem('Target Different Browsers', 'target-different-browsers.md'),
          menuItem('Content Scripts', 'content-scripts.md'),
          menuItem('Storage', 'storage.md'),
          menuItem('Messaging', 'messaging.md'),
          menuItem('I18n', 'i18n.md'),
          menuItem('Scripting', 'scripting.md'),
          menuItem('WXT Modules', 'wxt-modules.md'),
          menuItem('Frontend Frameworks', 'frontend-frameworks.md'),
          menuItem('ES Modules', 'es-modules.md'),
          menuItem('Remote Code', 'remote-code.md'),
          menuItem('Unit Testing', 'unit-testing.md'),
          menuItem('E2E Testing', 'e2e-testing.md'),
          menuItem('Publishing', 'publishing.md'),
          menuItem('Testing Updates', 'testing-updates.md'),
        ]),
        menuGroup('Resources', '/guide/resources/', [
          menuItem('Compare', 'compare.md'),
          menuItem('FAQ', 'faq.md'),
          menuItem('Community', 'community.md'),
          menuItem('Upgrading WXT', 'upgrading.md'),
          menuItem('Migrate to WXT', 'migrate.md'),
          menuItem('How WXT Works', 'how-wxt-works.md'),
        ]),
      ]),
      '/api/': menuRoot([
        menuGroup(
          'CLI Reference',
          '/api/cli/',
          [
            menuItem('wxt', 'wxt.md'),
            menuItem('wxt build', 'wxt-build.md'),
            menuItem('wxt zip', 'wxt-zip.md'),
            menuItem('wxt prepare', 'wxt-prepare.md'),
            menuItem('wxt clean', 'wxt-clean.md'),
            menuItem('wxt init', 'wxt-init.md'),
            menuItem('wxt submit', 'wxt-submit.md'),
            menuItem('wxt submit init', 'wxt-submit-init.md'),
          ],
          true,
        ),
        menuGroup('API Reference', prepareTypedocSidebar(typedocSidebar), true),
      ]),
    },
  },
});
````

## File: docs/.vitepress/Dockerfile
````
FROM lipanski/docker-static-website:latest
COPY dist .
````

## File: docs/api/cli/wxt-build.md
````markdown
# `wxt build`

<script setup>
import { data } from '../../.vitepress/loaders/cli.data.ts'
</script>

<div class="language-sh vp-adaptive-theme active"><pre class="shiki shiki-themes github-light github-dark vp-code"><code>{{ data.build }}</code></pre></div>
````

## File: docs/api/cli/wxt-clean.md
````markdown
# `wxt clean`

<script setup>
import { data } from '../../.vitepress/loaders/cli.data.ts'
</script>

<div class="language-sh vp-adaptive-theme active"><pre class="shiki shiki-themes github-light github-dark vp-code"><code>{{ data.clean }}</code></pre></div>
````

## File: docs/api/cli/wxt-init.md
````markdown
# `wxt init`

<script setup>
import { data } from '../../.vitepress/loaders/cli.data.ts'
</script>

<div class="language-sh vp-adaptive-theme active"><pre class="shiki shiki-themes github-light github-dark vp-code"><code>{{ data.init }}</code></pre></div>
````

## File: docs/api/cli/wxt-prepare.md
````markdown
# `wxt prepare`

<script setup>
import { data } from '../../.vitepress/loaders/cli.data.ts'
</script>

<div class="language-sh vp-adaptive-theme active"><pre class="shiki shiki-themes github-light github-dark vp-code"><code>{{ data.prepare }}</code></pre></div>
````

## File: docs/api/cli/wxt-submit-init.md
````markdown
# `wxt submit init`

> Alias for [`publish-browser-extension`](https://www.npmjs.com/package/publish-browser-extension)

<script setup>
import { data } from '../../.vitepress/loaders/cli.data.ts'
</script>

<div class="language-sh vp-adaptive-theme active"><pre class="shiki shiki-themes github-light github-dark vp-code"><code>{{ data.submitInit }}</code></pre></div>
````

## File: docs/api/cli/wxt-submit.md
````markdown
# `wxt submit`

> Alias for [`publish-browser-extension`](https://www.npmjs.com/package/publish-browser-extension)

<script setup>
import { data } from '../../.vitepress/loaders/cli.data.ts'
</script>

<div class="language-sh vp-adaptive-theme active"><pre class="shiki shiki-themes github-light github-dark vp-code"><code>{{ data.submit }}</code></pre></div>
````

## File: docs/api/cli/wxt-zip.md
````markdown
# `wxt zip`

<script setup>
import { data } from '../../.vitepress/loaders/cli.data.ts'
</script>

<div class="language-sh vp-adaptive-theme active"><pre class="shiki shiki-themes github-light github-dark vp-code"><code>{{ data.zip }}</code></pre></div>
````

## File: docs/api/cli/wxt.md
````markdown
# `wxt`

<script setup>
import { data } from '../../.vitepress/loaders/cli.data.ts'
</script>

<div class="language-sh vp-adaptive-theme active"><pre class="shiki shiki-themes github-light github-dark vp-code"><code>{{ data.wxt }}</code></pre></div>
````

## File: docs/blog/.drafts/2024-10-19-real-world-messaging.md
````markdown
---
layout: blog
title: Real World Messaging
description: |
  The extension messaging APIs are difficult to learn. Let's go beyond the simple examples from Chrome and Firefox's documentation to build our own simple messaging system from scratch.
authors:
  - name: Aaron Klinker
    github: aklinker1
date: 2024-10-20T04:54:23.601Z
---

Test content **bold** _italic_
````

## File: docs/blog/2024-12-06-using-imports-module.md
````markdown
---
layout: blog
title: Introducing <code>#imports</code>
description: Learn how WXT's new <code>#imports</code> module works and how to use it.
authors:
  - name: Aaron Klinker
    github: aklinker1
date: 2024-12-06T14:39:00.000Z
---

WXT v0.20 introduced a new way of manually importing its APIs: **the `#imports` module**. This module was introduced to simplify import statements and provide more visibility into all the APIs WXT provides.

<!-- prettier-ignore -->
```ts
import { browser } from 'wxt/browser'; // [!code --]
import { createShadowRootUi } from 'wxt/utils/content-script-ui/shadow-root'; // [!code --]
import { defineContentScript } from 'wxt/utils/define-content-script'; // [!code --]
import { injectScript } from 'wxt/utils/inject-script'; // [!code --]
import { // [!code ++]
  browser, createShadowRootUi, defineContentScript, injectScript // [!code ++]
} from '#imports'; // [!code ++]
```

The `#imports` module is considered a "virtual module", because the file doesn't actually exist. At build-time, imports are split into individual statements for each API:

:::code-group

```ts [What you write]
import { defineContentScript, injectScript } from '#imports';
```

```ts [What the bundler sees]
import { defineContentScript } from 'wxt/utils/define-content-script';
import { injectScript } from 'wxt/utils/inject-script';
```

:::

Think of `#imports` as a convenient way to access all of WXT's APIs from one place, without impacting performance or bundle size.

This enables better tree-shaking compared to v0.19 and below.

:::tip Need to lookup the full import path of an API?
Open up your project's `.wxt/types/imports-module.d.ts` file.
:::

## Mocking

When writing tests, you might need to mock APIs from the `#imports` module. While mocking these APIs is very easy, it may not be immediately clear how to accomplish it.

Let's look at an example using Vitest. When [configured with `wxt/testing`](/guide/essentials/unit-testing#vitest), Vitest sees the same transformed code as the bundler. That means to mock an API from `#imports`, you need to call `vi.mock` with the real import path, not `#imports`:

```ts
import { injectScript } from '#imports';
import { vi } from 'vitest';

vi.mock('wxt/utils/inject-script')
const injectScriptMock = vi.mocked(injectScript);

injectScriptMock.mockReturnValueOnce(...);
```

## Conclusion

You don't have to use `#imports` if you don't like - you can continue importing APIs from their submodules. However, using `#imports` is the recommended approach moving forwards.

- As more APIs are added, you won't have to memorize additional import paths.
- If breaking changes are made to import paths in future major versions, `#imports` won't break.

Happy Coding 😄

> P.S. Yes, this is exactly how [Nuxt's `#imports`](https://nuxt.com/docs/guide/concepts/auto-imports#explicit-imports) works! We use the exact same library, [`unimport`](https://github.com/unjs/unimport).

---

[Discuss this blog post on Github](https://github.com/wxt-dev/wxt/discussions/1543).
````

## File: docs/guide/essentials/config/auto-imports.md
````markdown
# Auto-imports

WXT uses [`unimport`](https://www.npmjs.com/package/unimport), the same tool as Nuxt, to setup auto-imports.

```ts
export default defineConfig({
  // See https://www.npmjs.com/package/unimport#configurations
  imports: {
    // ...
  },
});
```

By default, WXT automatically sets up auto-imports for all of it's own APIs and some of your project directories:

- `<srcDir>/components/*`
- `<srcDir>/composables/*`
- `<srcDir>/hooks/*`
- `<srcDir>/utils/*`

All named and default exports from files in these directories are available everywhere else in your project without having to import them.

To see the complete list of auto-imported APIs, run [`wxt prepare`](/api/cli/wxt-prepare) and look at your project's `.wxt/types/imports-module.d.ts` file.

## TypeScript

For TypeScript and your editor to recognize auto-imported variables, you need to run the [`wxt prepare` command](/api/cli/wxt-prepare).

Add this command to your `postinstall` script so your editor has everything it needs to report type errors after installing dependencies:

```jsonc
// package.json
{
  "scripts": {
    "postinstall": "wxt prepare", // [!code ++]
  },
}
```

## ESLint

ESLint doesn't know about the auto-imported variables unless they are explicitly defined in the ESLint's `globals`. By default, WXT will generate the config if it detects ESLint is installed in your project. If the config isn't generated automatically, you can manually tell WXT to generate it.

:::code-group

```ts [ESLint 9]
export default defineConfig({
  imports: {
    eslintrc: {
      enabled: 9,
    },
  },
});
```

```ts [ESLint 8]
export default defineConfig({
  imports: {
    eslintrc: {
      enabled: 8,
    },
  },
});
```

:::

Then in your ESLint config, import and use the generated file:

:::code-group

```js [ESLint 9]
// eslint.config.mjs
import autoImports from './.wxt/eslint-auto-imports.mjs';

export default [
  autoImports,
  {
    // The rest of your config...
  },
];
```

```js [ESLint 8]
// .eslintrc.mjs
export default {
  extends: ['./.wxt/eslintrc-auto-import.json'],
  // The rest of your config...
};
```

:::

## Disabling Auto-imports

Not all developers like auto-imports. To disable them, set `imports` to `false`.

```ts
export default defineConfig({
  imports: false, // [!code ++]
});
```

## Explicit Imports (`#imports`)

You can manually import all of WXT's APIs via the `#imports` module:

```ts
import {
  createShadowRootUi,
  ContentScriptContext,
  MatchPattern,
} from '#imports';
```

To learn more about how the `#imports` module works, read the [related blog post](/blog/2024-12-06-using-imports-module).

If you've disabled auto-imports, you should still use `#imports` to import all of WXT's APIs from a single place.
````

## File: docs/guide/essentials/config/browser-startup.md
````markdown
---
outline: deep
---

# Browser Startup

> See the [API Reference](/api/reference/wxt/interfaces/WebExtConfig) for a full list of config.

During development, WXT uses [`web-ext` by Mozilla](https://www.npmjs.com/package/web-ext) to automatically open a browser window with your extension installed.

:::danger
Chrome 137 removed support for the `--load-extension` CLI flag, which WXT relied on to open the browser with an extension installed. So this feature will not work for Chrome.

You have two options:

1. Install [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) (which still supports the `--load-extension` flag) and [point the `chrome` binary to it](#set-browser-binaries), or
2. [Disable this feature](#disable-opening-browser) and manually load your extension

:::

## Config Files

You can configure browser startup in 3 places:

1. `<rootDir>/web-ext.config.ts`: Ignored from version control, this file lets you configure your own options for a specific project without affecting other developers

   ```ts [web-ext.config.ts]
   import { defineWebExtConfig } from 'wxt';

   export default defineWebExtConfig({
     // ...
   });
   ```

2. `<rootDir>/wxt.config.ts`: Via the [`webExt` config](/api/reference/wxt/interfaces/InlineConfig#webext), included in version control
3. `$HOME/web-ext.config.ts`: Provide default values for all WXT projects on your computer

## Recipes

### Set Browser Binaries

To set or customize the browser opened during development:

```ts [web-ext.config.ts]
export default defineWebExtConfig({
  binaries: {
    chrome: '/path/to/chrome-beta', // Use Chrome Beta instead of regular Chrome
    firefox: 'firefoxdeveloperedition', // Use Firefox Developer Edition instead of regular Firefox
    edge: '/path/to/edge', // Open MS Edge when running "wxt -b edge"
  },
});
```

By default, WXT will try to automatically discover where Chrome/Firefox are installed. However, if you have chrome installed in a non-standard location, you need to set it manually as shown above.

### Persist Data

By default, to keep from modifying your browser's existing profiles, `web-ext` creates a brand new profile every time you run the `dev` script.

Right now, Chromium based browsers are the only browsers that support overriding this behavior and persisting data when running the `dev` script multiple times.

To persist data, set the `--user-data-dir` flag:

:::code-group

```ts [Mac/Linux]
export default defineWebExtConfig({
  chromiumArgs: ['--user-data-dir=./.wxt/chrome-data'],
});
```

```ts [Windows]
import { resolve } from 'node:path';

export default defineWebExtConfig({
  // On Windows, the path must be absolute
  chromiumProfile: resolve('.wxt/chrome-data'),
  keepProfileChanges: true,
});
```

:::

Now, next time you run the `dev` script, a persistent profile will be created in `.wxt/chrome-data/{profile-name}`. With a persistent profile, you can install devtools extensions to help with development, allow the browser to remember logins, etc, without worrying about the profile being reset the next time you run the `dev` script.

:::tip
You can use any directory you'd like for `--user-data-dir`, the examples above create a persistent profile for each WXT project. To create a profile for all WXT projects, you can put the `chrome-data` directory inside your user's home directory.
:::

### Disable Opening Browser

If you prefer to load the extension into your browser manually, you can disable the auto-open behavior:

```ts [web-ext.config.ts]
export default defineWebExtConfig({
  disabled: true,
});
```
````

## File: docs/guide/essentials/config/build-mode.md
````markdown
# Build Modes

Because WXT is powered by Vite, it supports [modes](https://vite.dev/guide/env-and-mode.html#modes) in the same way.

When running any dev or build commands, pass the `--mode` flag:

```sh
wxt --mode production
wxt build --mode development
wxt zip --mode testing
```

By default, `--mode` is `development` for the dev command and `production` for all other commands (build, zip, etc).

## Get Mode at Runtime

You can access the current mode in your extension using `import.meta.env.MODE`:

```ts
switch (import.meta.env.MODE) {
  case 'development': // ...
  case 'production': // ...

  // Custom modes specified with --mode
  case 'testing': // ...
  case 'staging': // ...
  // ...
}
```
````

## File: docs/guide/essentials/config/entrypoint-loaders.md
````markdown
# Entrypoint Loaders

To generate the manifest and other files at build-time, WXT must import each entrypoint to get their options, like content script `matches`. For HTML files, this is easy. For JS/TS entrypoints, the process is more complicated.

When loading your JS/TS entrypoints, they are imported into a NodeJS environment, not the `browser` environment that they normally run in. This can lead to issues commonly seen when running browser-only code in a NodeJS environment, like missing global variables.

WXT does several pre-processing steps to try and prevent errors during this process:

1. Use `linkedom` to make a small set of browser globals (`window`, `document`, etc) available.
2. Use `@webext-core/fake-browser` to create a fake version of the `chrome` and `browser` globals expected by extensions.
3. Pre-process the JS/TS code, stripping out the `main` function then tree-shaking unused code from the file

However, this process is not perfect. It doesn't setup all the globals found in the browser and the APIs may behave differently. As such, **_you should avoid using browser or extension APIs outside the `main` function of your entrypoints!_**

:::tip
If you're running into errors while importing entrypoints, run `wxt prepare --debug` to see more details about this process. When debugging, WXT will print out the pre-processed code to help you identify issues.
:::

Once the environment has been polyfilled and your code pre-processed, it's up the entrypoint loader to import your code, extracting the options from the default export.
````

## File: docs/guide/essentials/config/environment-variables.md
````markdown
# Environment Variables

## Dotenv Files

WXT supports [dotenv files the same way as Vite](https://vite.dev/guide/env-and-mode.html#env-files). Create any of the following files:

```
.env
.env.local
.env.[mode]
.env.[mode].local
.env.[browser]
.env.[browser].local
.env.[mode].[browser]
.env.[mode].[browser].local
```

And any environment variables listed inside them will be available at runtime:

```sh
# .env
WXT_API_KEY=...
```

```ts
await fetch(`/some-api?apiKey=${import.meta.env.WXT_API_KEY}`);
```

Remember to prefix any environment variables with `WXT_` or `VITE_`, otherwise they won't be available at runtime, as per [Vite's convention](https://vite.dev/guide/env-and-mode.html#env-files).

## Built-in Environment Variables

WXT provides some custom environment variables based on the current command:

| Usage                              | Type      | Description                                           |
| ---------------------------------- | --------- | ----------------------------------------------------- |
| `import.meta.env.MANIFEST_VERSION` | `2 │ 3`   | The target manifest version                           |
| `import.meta.env.BROWSER`          | `string`  | The target browser                                    |
| `import.meta.env.CHROME`           | `boolean` | Equivalent to `import.meta.env.BROWSER === "chrome"`  |
| `import.meta.env.FIREFOX`          | `boolean` | Equivalent to `import.meta.env.BROWSER === "firefox"` |
| `import.meta.env.SAFARI`           | `boolean` | Equivalent to `import.meta.env.BROWSER === "safari"`  |
| `import.meta.env.EDGE`             | `boolean` | Equivalent to `import.meta.env.BROWSER === "edge"`    |
| `import.meta.env.OPERA`            | `boolean` | Equivalent to `import.meta.env.BROWSER === "opera"`   |

You can set the [`targetBrowsers`](/api/reference/wxt/interfaces/InlineConfig#targetbrowsers) option to make the `BROWSER` variable a more specific type, like `"chrome" | "firefox"`.

You can also access all of [Vite's environment variables](https://vite.dev/guide/env-and-mode.html#env-variables):

| Usage                  | Type      | Description                                                                 |
| ---------------------- | --------- | --------------------------------------------------------------------------- |
| `import.meta.env.MODE` | `string`  | The [mode](/guide/essentials/config/build-mode) the extension is running in |
| `import.meta.env.PROD` | `boolean` | When `NODE_ENV='production'`                                                |
| `import.meta.env.DEV`  | `boolean` | Opposite of `import.meta.env.PROD`                                          |

:::details Other Vite Environment Variables
Vite provides two other environment variables, but they aren't useful in WXT projects:

- `import.meta.env.BASE_URL`: Use `browser.runtime.getURL` instead.
- `import.meta.env.SSR`: Always `false`.
  :::

## Manifest

To use environment variables in the manifest, you need to use the function syntax:

```ts
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-vue'],
  manifest: { // [!code --]
    oauth2: { // [!code --]
      client_id: import.meta.env.WXT_APP_CLIENT_ID // [!code --]
    } // [!code --]
  } // [!code --]
  manifest: () => ({ // [!code ++]
    oauth2: { // [!code ++]
      client_id: import.meta.env.WXT_APP_CLIENT_ID // [!code ++]
    } // [!code ++]
  }), // [!code ++]
});
```

WXT can't load your `.env` files until after the config file has been loaded. So by using the function syntax for `manifest`, it defers creating the object until after the `.env` files are loaded into the process.
````

## File: docs/guide/essentials/config/hooks.md
````markdown
# Hooks

WXT includes a system that lets you hook into the build process and make changes.

## Adding Hooks

The easiest way to add a hook is via the `wxt.config.ts`. Here's an example hook that modifies the `manifest.json` file before it is written to the output directory:

```ts [wxt.config.ts]
export default defineConfig({
  hooks: {
    'build:manifestGenerated': (wxt, manifest) => {
      if (wxt.config.mode === 'development') {
        manifest.title += ' (DEV)';
      }
    },
  },
});
```

Most hooks provide the `wxt` object as the first argument. It contains the resolved config and other info about the current build. The other arguments can be modified by reference to change different parts of the build system.

Putting one-off hooks like this in your config file is simple, but if you find yourself writing lots of hooks, you should extract them into [WXT Modules](/guide/essentials/wxt-modules) instead.

## Execution Order

Because hooks can be defined in multiple places, including [WXT Modules](/guide/essentials/wxt-modules), the order which they're executed can matter. Hooks are executed in the following order:

1. NPM modules in the order listed in the [`modules` config](/api/reference/wxt/interfaces/InlineConfig#modules)
2. User modules in [`/modules` folder](/guide/essentials/project-structure), loaded alphabetically
3. Hooks listed in your `wxt.config.ts`

To see the order for your project, run `wxt prepare --debug` flag and search for the "Hook execution order":

```
⚙ Hook execution order:
⚙   1. wxt:built-in:unimport
⚙   2. src/modules/auto-icons.ts
⚙   3. src/modules/example.ts
⚙   4. src/modules/i18n.ts
⚙   5. wxt.config.ts > hooks
```

Changing execution order is simple:

- Prefix your user modules with a number (lower numbers are loaded first):
  <!-- prettier-ignore -->
  ```html
  📁 modules/
     📄 0.my-module.ts
     📄 1.another-module.ts
  ```
- If you need to run an NPM module after user modules, just make it a user module and prefix the filename with a number!
  ```ts
  // modules/2.i18n.ts
  export { default } from '@wxt-dev/i18n/module';
  ```
````

## File: docs/guide/essentials/config/manifest.md
````markdown
# Manifest

In WXT, there is no `manifest.json` file in your source code. Instead, WXT generates the manifest from multiple sources:

- Global options [defined in your `wxt.config.ts` file](#global-options)
- Entrypoint-specific options [defined in your entrypoints](/guide/essentials/entrypoints#defining-manifest-options)
- [WXT Modules](/guide/essentials/wxt-modules) added to your project can modify your manifest
- [Hooks](/guide/essentials/config/hooks) defined in your project can modify your manifest

Your extension's `manifest.json` will be output to `.output/{target}/manifest.json` when running `wxt build`.

## Global Options

To add a property to your manifest, use the `manifest` config inside your `wxt.config.ts`:

```ts
export default defineConfig({
  manifest: {
    // Put manual changes here
  },
});
```

You can also define the manifest as a function, and use JS to generate it based on the target browser, mode, and more.

```ts
export default defineConfig({
  manifest: ({ browser, manifestVersion, mode, command }) => {
    return {
      // ...
    };
  },
});
```

### MV2 and MV3 Compatibility

When adding properties to the manifest, always define the property in it's MV3 format when possible. When targeting MV2, WXT will automatically convert these properties to their MV2 format.

For example, for this config:

```ts
export default defineConfig({
  manifest: {
    action: {
      default_title: 'Some Title',
    },
    web_accessible_resources: [
      {
        matches: ['*://*.google.com/*'],
        resources: ['icon/*.png'],
      },
    ],
  },
});
```

WXT will generate the following manifests:

:::code-group

```json [MV2]
{
  "manifest_version": 2,
  // ...
  "browser_action": {
    "default_title": "Some Title"
  },
  "web_accessible_resources": ["icon/*.png"]
}
```

```json [MV3]
{
  "manifest_version": 3,
  // ...
  "action": {
    "default_title": "Some Title"
  },
  "web_accessible_resources": [
    {
      "matches": ["*://*.google.com/*"],
      "resources": ["icon/*.png"]
    }
  ]
}
```

:::

You can also specify properties specific to a single manifest version, and they will be stripped out when targeting the other manifest version.

## Name

> [Chrome Docs](https://developer.chrome.com/docs/extensions/mv3/manifest/name/)

If not provided via the `manifest` config, the manifest's `name` property defaults to your `package.json`'s `name` property.

## Version and Version Name

> [Chrome Docs](https://developer.chrome.com/docs/extensions/mv3/manifest/version/)

Your extension's `version` and `version_name` is based on the `version` from your `package.json`.

- `version_name` is the exact string listed
- `version` is the string cleaned up, with any invalid suffixes removed

Example:

```json
// package.json
{
  "version": "1.3.0-alpha2"
}
```

```json
// .output/<target>/manifest.json
{
  "version": "1.3.0",
  "version_name": "1.3.0-alpha2"
}
```

If a version is not present in your `package.json`, it defaults to `"0.0.0"`.

## Icons

WXT automatically discovers your extension's icon by looking at files in the `public/` directory:

```
public/
├─ icon-16.png
├─ icon-24.png
├─ icon-48.png
├─ icon-96.png
└─ icon-128.png
```

Specifically, an icon must match one of these regex to be discovered:

<<< @/../packages/wxt/src/core/utils/manifest.ts#snippet

If you don't like these filename or you're migrating to WXT and don't want to rename the files, you can manually specify an `icon` in your manifest:

```ts
export default defineConfig({
  manifest: {
    icons: {
      16: '/extension-icon-16.png',
      24: '/extension-icon-24.png',
      48: '/extension-icon-48.png',
      96: '/extension-icon-96.png',
      128: '/extension-icon-128.png',
    },
  },
});
```

Alternatively, you can use [`@wxt-dev/auto-icons`](https://www.npmjs.com/package/@wxt-dev/auto-icons) to let WXT generate your icon at the required sizes.

## Permissions

> [Chrome docs](https://developer.chrome.com/docs/extensions/reference/permissions/)

Most of the time, you need to manually add permissions to your manifest. Only in a few specific situations are permissions added automatically:

- During development: the `tabs` and `scripting` permissions will be added to enable hot reloading.
- When a `sidepanel` entrypoint is present: The `sidepanel` permission is added.

```ts
export default defineConfig({
  manifest: {
    permissions: ['storage', 'tabs'],
  },
});
```

## Host Permissions

> [Chrome docs](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions#host-permissions)

```ts
export default defineConfig({
  manifest: {
    host_permissions: ['https://www.google.com/*'],
  },
});
```

:::warning
If you use host permissions and target both MV2 and MV3, make sure to only include the required host permissions for each version:

```ts
export default defineConfig({
  manifest: ({ manifestVersion }) => ({
    host_permissions: manifestVersion === 2 ? [...] : [...],
  }),
});
```

:::

## Default Locale

```ts
export default defineConfig({
  manifest: {
    name: '__MSG_extName__',
    description: '__MSG_extDescription__',
    default_locale: 'en',
  },
});
```

> See [I18n docs](/guide/essentials/i18n) for a full guide on internationalizing your extension.

## Actions

In MV2, you have two options: [`browser_action`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action) and [`page_action`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/page_action). In MV3, they were merged into a single [`action`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/action) API.

By default, whenever an `action` is generated, WXT falls back to `browser_action` when targeting MV2.

### Action With Popup

To generate a manifest where a UI appears after clicking the icon, just create a [Popup entrypoint](/guide/essentials/entrypoints#popup). If you want to use a `page_action` for MV2, add the following meta tag to the HTML document's head:

```html
<meta name="manifest.type" content="page_action" />
```

### Action Without Popup

If you want to use the `activeTab` permission or the `browser.action.onClicked` event, but don't want to show a popup:

1. Delete the [Popup entrypoint](/guide/essentials/entrypoints#popup) if it exists
2. Add the `action` key to your manifest:
   ```ts
   export default defineConfig({
     manifest: {
       action: {},
     },
   });
   ```

Same as an action with a popup, WXT will fallback on using `browser_action` for MV2. To use a `page_action` instead, add that key as well:

```ts
export default defineConfig({
  manifest: {
    action: {},
    page_action: {},
  },
});
```
````

## File: docs/guide/essentials/config/runtime.md
````markdown
# Runtime Config

> This API is still a WIP, with more features coming soon!

Define runtime configuration in a single place, `<srcDir>/app.config.ts`:

```ts
import { defineAppConfig } from '#imports';

// Define types for your config
declare module 'wxt/utils/define-app-config' {
  export interface WxtAppConfig {
    theme?: 'light' | 'dark';
  }
}

export default defineAppConfig({
  theme: 'dark',
});
```

:::warning
This file is committed to the repo, so don't put any secrets here. Instead, use [Environment Variables](#environment-variables)
:::

To access runtime config, WXT provides the `useAppConfig` function:

```ts
import { useAppConfig } from '#imports';

console.log(useAppConfig()); // { theme: "dark" }
```

## Environment Variables in App Config

You can use environment variables in the `app.config.ts` file.

```ts
declare module 'wxt/utils/define-app-config' {
  export interface WxtAppConfig {
    apiKey?: string;
    skipWelcome: boolean;
  }
}

export default defineAppConfig({
  apiKey: import.meta.env.WXT_API_KEY,
  skipWelcome: import.meta.env.WXT_SKIP_WELCOME === 'true',
});
```

This has several advantages:

- Define all expected environment variables in a single file
- Convert strings to other types, like booleans or arrays
- Provide default values if an environment variable is not provided
````

## File: docs/guide/essentials/config/typescript.md
````markdown
# TypeScript Configuration

When you run [`wxt prepare`](/api/cli/wxt-prepare), WXT generates a base TSConfig file for your project at `<rootDir>/.wxt/tsconfig.json`.

At a minimum, you need to create a TSConfig in your root directory that looks like this:

```jsonc
// <rootDir>/tsconfig.json
{
  "extends": ".wxt/tsconfig.json",
}
```

Or if you're in a monorepo, you may not want to extend the config. If you don't extend it, you need to add `.wxt/wxt.d.ts` to the TypeScript project:

```ts
/// <reference path="./.wxt/wxt.d.ts" />
```

## Compiler Options

To specify custom compiler options, add them in `<rootDir>/tsconfig.json`:

```jsonc
// <rootDir>/tsconfig.json
{
  "extends": ".wxt/tsconfig.json",
  "compilerOptions": {
    "jsx": "preserve",
  },
}
```

## TSConfig Paths

WXT provides a default set of path aliases.

| Alias | To            | Example                                         |
| ----- | ------------- | ----------------------------------------------- |
| `~~`  | `<rootDir>/*` | `import "~~/scripts"`                           |
| `@@`  | `<rootDir>/*` | `import "@@/scripts"`                           |
| `~`   | `<srcDir>/*`  | `import { toLowerCase } from "~/utils/strings"` |
| `@`   | `<srcDir>/*`  | `import { toLowerCase } from "@/utils/strings"` |

To add your own, DO NOT add them to your `tsconfig.json`! Instead, use the [`alias` option](/api/reference/wxt/interfaces/InlineConfig#alias) in `wxt.config.ts`.

This will add your custom aliases to `<rootDir>/.wxt/tsconfig.json` next time you run `wxt prepare`. It also adds your alias to the bundler so it can resolve imports.

```ts
import { resolve } from 'node:path';

export default defineConfig({
  alias: {
    // Directory:
    testing: resolve('utils/testing'),
    // File:
    strings: resolve('utils/strings.ts'),
  },
});
```

```ts
import { fakeTab } from 'testing/fake-objects';
import { toLowerCase } from 'strings';
```
````

## File: docs/guide/essentials/config/vite.md
````markdown
# Vite

WXT uses [Vite](https://vitejs.dev/) under the hood to bundle your extension.

This page explains how to customize your project's Vite config. Refer to [Vite's documentation](https://vite.dev/config/) to learn more about configuring the bundler.

:::tip
In most cases, you shouldn't change Vite's build settings. WXT provides sensible defaults that output a valid extension accepted by all stores when publishing.
:::

## Change Vite Config

You can change Vite's config via the `wxt.config.ts` file:

```ts [wxt.config.ts]
import { defineConfig } from 'wxt';

export default defineConfig({
  vite: () => ({
    // Override config here, same as `defineConfig({ ... })`
    // inside vite.config.ts files
  }),
});
```

## Add Vite Plugins

To add a plugin, install the NPM package and add it to the Vite config:

```ts [wxt.config.ts]
import { defineConfig } from 'wxt';
import VueRouter from 'unplugin-vue-router/vite';

export default defineConfig({
  vite: () => ({
    plugins: [
      VueRouter({
        /* ... */
      }),
    ],
  }),
});
```

:::warning
Due to the way WXT orchestrates Vite builds, some plugins may not work as expected. For example, `vite-plugin-remove-console` normally only runs when you build for production (`vite build`). However, WXT uses a combination of dev server and builds during development, so you need to manually tell it when to run:

```ts [wxt.config.ts]
import { defineConfig } from 'wxt';
import removeConsole from 'vite-plugin-remove-console';

export default defineConfig({
  vite: (configEnv) => ({
    plugins:
      configEnv.mode === 'production'
        ? [removeConsole({ includes: ['log'] })]
        : [],
  }),
});
```

Search [GitHub issues](https://github.com/wxt-dev/wxt/issues?q=is%3Aissue+label%3A%22vite+plugin%22) if you run into issues with a specific plugin.

If an issue doesn't exist for your plugin, [open a new one](https://github.com/wxt-dev/wxt/issues/new/choose).
:::
````

## File: docs/guide/essentials/assets.md
````markdown
# Assets

## `/assets` Directory

Any assets imported or referenced inside the `<srcDir>/assets/` directory will be processed by WXT's bundler.

Here's how you access them:

:::code-group

```ts [JS]
import imageUrl from '~/assets/image.png';

const img = document.createElement('img');
img.src = imageUrl;
```

```html [HTML]
<!-- In HTML tags, you must use the relative path --->
<img src="../assets/image.png" />
```

```css [CSS]
.bg-image {
  background-image: url(~/assets/image.png);
}
```

```vue [Vue]
<script>
import image from '~/assets/image.png';
</script>

<template>
  <img :src="image" />
</template>
```

```jsx [JSX]
import image from '~/assets/image.png';

<img src={image} />;
```

:::

## `/public` Directory

Files inside `<rootDir>/public/` are copied into the output folder as-is, without being processed by WXT's bundler.

Here's how you access them:

:::code-group

```ts [JS]
import imageUrl from '/image.png';

const img = document.createElement('img');
img.src = imageUrl;
```

```html [HTML]
<img src="/image.png" />
```

```css [CSS]
.bg-image {
  background-image: url(/image.png);
}
```

```vue [Vue]
<template>
  <img src="/image.png" />
</template>
```

```jsx [JSX]
<img src="/image.png" />
```

:::

:::warning
Assets in the `public/` directory are **_not_** accessible in content scripts by default. To use a public asset in a content script, you must add it to your manifest's [`web_accessible_resources` array](/api/reference/wxt/type-aliases/UserManifest#web-accessible-resources).
:::

## Inside Content Scripts

Assets inside content scripts are a little different. By default, when you import an asset, it returns just the path to the asset. This is because Vite assumes you're loading assets from the same hostname.

But, inside content scripts, the hostname is whatever the tab is set to. So if you try to fetch the asset, manually or as an `<img>`'s `src`, it will be loaded from the tab's website, not your extension.

To fix this, you need to convert the image to a full URL using `browser.runtime.getURL`:

```ts [entrypoints/content.ts]
import iconUrl from '/icon/128.png';

export default defineContentScript({
  matches: ['*://*.google.com/*'],
  main() {
    console.log(iconUrl); // "/icon/128.png"
    console.log(browser.runtime.getURL(iconUrl)); // "chrome-extension://<id>/icon/128.png"
  },
});
```

## WASM

How a `.wasm` file is loaded varies greatly between packages, but most follow a basic setup: Use a JS API to load and execute the `.wasm` file.

For an extension, that means two things:

1. The `.wasm` file needs to be present in output folder so it can be loaded.
2. You must import the JS API to load and initialize the `.wasm` file, usually provided by the NPM package.

For an example, let's say you have a content script needs to parse TS code into AST. We'll use [`@oxc-parser/wasm`](https://www.npmjs.com/package/@oxc-parser/wasm) to do it!

First, we need to copy the `.wasm` file to the output directory. We'll do it with a [WXT module](/guide/essentials/wxt-modules):

```ts
// modules/oxc-parser-wasm.ts
import { resolve } from 'node:path';

export default defineWxtModule((wxt) => {
  wxt.hook('build:publicAssets', (_, assets) => {
    assets.push({
      absoluteSrc: resolve(
        'node_modules/@oxc-parser/wasm/web/oxc_parser_wasm_bg.wasm',
      ),
      relativeDest: 'oxc_parser_wasm_bg.wasm',
    });
  });
});
```

Run `wxt build`, and you should see the WASM file copied into your `.output/chrome-mv3` folder!

Next, since this is in a content script and we'll be fetching the WASM file over the network to load it, we need to add the file to the `web_accessible_resources`:

```ts [wxt.config.ts]
export default defineConfig({
  manifest: {
    web_accessible_resources: [
      {
        // We'll use this matches in the content script as well
        matches: ['*://*.github.com/*'],
        // Use the same path as `relativeDest` from the WXT module
        resources: ['/oxc_parser_wasm_bg.wasm'],
      },
    ],
  },
});
```

And finally, we need to load and initialize the `.wasm` file inside the content script to use it:

```ts [entrypoints/content.ts]
import initWasm, { parseSync } from '@oxc-parser/wasm';

export default defineContentScript({
  matches: '*://*.github.com/*',
  async main(ctx) {
    if (!location.pathname.endsWith('.ts')) return;

    // Get text from GitHub
    const code = document.getElementById(
      'read-only-cursor-text-area',
    )?.textContent;
    if (!code) return;
    const sourceFilename = document.getElementById('file-name-id')?.textContent;
    if (!sourceFilename) return;

    // Load the WASM file:
    await initWasm({
      module_or_path: browser.runtime.getURL('/oxc_parser_wasm_bg.wasm'),
    });

    // Once loaded, we can use `parseSync`!
    const ast = parseSync(code, { sourceFilename });
    console.log(ast);
  },
});
```

This code is taken directly from `@oxc-parser/wasm` docs with one exception: We manually pass in a file path. In a standard NodeJS or web project, the default path works just fine so you don't have to pass anything in. However, extensions are different. You should always explicitly pass in the full URL to the WASM file in your output directory, which is what `browser.runtime.getURL` returns.

Run your extension, and you should see OXC parse the TS file!
````

## File: docs/guide/essentials/content-scripts.md
````markdown
---
outline: deep
---

# Content Scripts

> To create a content script, see [Entrypoint Types](/guide/essentials/entrypoints#content-scripts).

## Context

The first argument to a content script's `main` function is its "context".

```ts
// entrypoints/example.content.ts
export default defineContentScript({
  main(ctx) {},
});
```

This object is responsible for tracking whether or not the content script's context is "invalidated". Most browsers, by default, do not stop content scripts if the extension is uninstalled, updated, or disabled. When this happens, content scripts start reporting this error:

```
Error: Extension context invalidated.
```

The `ctx` object provides several helpers to stop asynchronous code from running once the context is invalidated:

```ts
ctx.addEventListener(...);
ctx.setTimeout(...);
ctx.setInterval(...);
ctx.requestAnimationFrame(...);
// and more
```

You can also check if the context is invalidated manually:

```ts
if (ctx.isValid) {
  // do something
}
// OR
if (ctx.isInvalid) {
  // do something
}
```

## CSS

In regular web extensions, CSS for content scripts is usually a separate CSS file, that is added to a CSS array in the manifest:

```json
{
  "content_scripts": [
    {
      "css": ["content/style.css"],
      "js": ["content/index.js"],
      "matches": ["*://*/*"]
    }
  ]
}
```

In WXT, to add CSS to a content script, simply import the CSS file into your JS entrypoint, and WXT will automatically add the bundled CSS output to the `css` array.

```ts
// entrypoints/example.content/index.ts
import './style.css';

export default defineContentScript({
  // ...
});
```

To create a standalone content script that only includes a CSS file:

1. Create the CSS file: `entrypoints/example.content.css`
2. Use the `build:manifestGenerated` hook to add the content script to the manifest:
   ```ts [wxt.config.ts]
   export default defineConfig({
     hooks: {
       'build:manifestGenerated': (wxt, manifest) => {
         manifest.content_scripts ??= [];
         manifest.content_scripts.push({
           // Build extension once to see where your CSS get's written to
           css: ['content-scripts/example.css'],
           matches: ['*://*/*'],
         });
       },
     },
   });
   ```

## UI

WXT provides 3 built-in utilities for adding UIs to a page from a content script:

- [Integrated](#integrated) - `createIntegratedUi`
- [Shadow Root](#shadow-root) -`createShadowRootUi`
- [IFrame](#iframe) - `createIframeUi`

Each has their own set of advantages and disadvantages.

| Method      | Isolated Styles |   Isolated Events   | HMR | Use page's context |
| ----------- | :-------------: | :-----------------: | :-: | :----------------: |
| Integrated  |       ❌        |         ❌          | ❌  |         ✅         |
| Shadow Root |       ✅        | ✅ (off by default) | ❌  |         ✅         |
| IFrame      |       ✅        |         ✅          | ✅  |         ❌         |

### Integrated

Integrated content script UIs are injected alongside the content of a page. This means that they are affected by CSS on that page.

:::code-group

```ts [Vanilla]
// entrypoints/example-ui.content.ts
export default defineContentScript({
  matches: ['<all_urls>'],

  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: 'body',
      onMount: (container) => {
        // Append children to the container
        const app = document.createElement('p');
        app.textContent = '...';
        container.append(app);
      },
    });

    // Call mount to add the UI to the DOM
    ui.mount();
  },
});
```

```ts [Vue]
// entrypoints/example-ui.content/index.ts
import { createApp } from 'vue';
import App from './App.vue';

export default defineContentScript({
  matches: ['<all_urls>'],

  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: 'body',
      onMount: (container) => {
        // Create the app and mount it to the UI container
        const app = createApp(App);
        app.mount(container);
        return app;
      },
      onRemove: (app) => {
        // Unmount the app when the UI is removed
        app.unmount();
      },
    });

    // Call mount to add the UI to the DOM
    ui.mount();
  },
});
```

```tsx [React]
// entrypoints/example-ui.content/index.tsx
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

export default defineContentScript({
  matches: ['<all_urls>'],

  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: 'body',
      onMount: (container) => {
        // Create a root on the UI container and render a component
        const root = ReactDOM.createRoot(container);
        root.render(<App />);
        return root;
      },
      onRemove: (root) => {
        // Unmount the root when the UI is removed
        root.unmount();
      },
    });

    // Call mount to add the UI to the DOM
    ui.mount();
  },
});
```

```ts [Svelte]
// entrypoints/example-ui.content/index.ts
import App from './App.svelte';
import { mount, unmount } from 'svelte';

export default defineContentScript({
  matches: ['<all_urls>'],

  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: 'body',
      onMount: (container) => {
        // Create the Svelte app inside the UI container
        mount(App, {
          target: container,
        });
      },
      onRemove: (app) => {
        // Destroy the app when the UI is removed
        unmount(app);
      },
    });

    // Call mount to add the UI to the DOM
    ui.mount();
  },
});
```

```tsx [Solid]
// entrypoints/example-ui.content/index.ts
import { render } from 'solid-js/web';

export default defineContentScript({
  matches: ['<all_urls>'],

  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: 'body',
      onMount: (container) => {
        // Render your app to the UI container
        const unmount = render(() => <div>...</div>, container);
        return unmount;
      },
      onRemove: (unmount) => {
        // Unmount the app when the UI is removed
        unmount();
      },
    });

    // Call mount to add the UI to the DOM
    ui.mount();
  },
});
```

:::

See the [API Reference](/api/reference/wxt/utils/content-script-ui/integrated/functions/createIntegratedUi) for the complete list of options.

### Shadow Root

Often in web extensions, you don't want your content script's CSS affecting the page, or vise-versa. The [`ShadowRoot`](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot) API is ideal for this.

WXT's [`createShadowRootUi`](/api/reference/wxt/utils/content-script-ui/shadow-root/functions/createShadowRootUi) abstracts all the `ShadowRoot` setup away, making it easy to create UIs whose styles are isolated from the page. It also supports an optional `isolateEvents` parameter to further isolate user interactions.

To use `createShadowRootUi`, follow these steps:

1. Import your CSS file at the top of your content script
2. Set [`cssInjectionMode: "ui"`](/api/reference/wxt/interfaces/BaseContentScriptEntrypointOptions#cssinjectionmode) inside `defineContentScript`
3. Define your UI with `createShadowRootUi()`
4. Mount the UI so it is visible to users

:::code-group

```ts [Vanilla]
// 1. Import the style
import './style.css';

export default defineContentScript({
  matches: ['<all_urls>'],
  // 2. Set cssInjectionMode
  cssInjectionMode: 'ui',

  async main(ctx) {
    // 3. Define your UI
    const ui = await createShadowRootUi(ctx, {
      name: 'example-ui',
      position: 'inline',
      anchor: 'body',
      onMount(container) {
        // Define how your UI will be mounted inside the container
        const app = document.createElement('p');
        app.textContent = 'Hello world!';
        container.append(app);
      },
    });

    // 4. Mount the UI
    ui.mount();
  },
});
```

```ts [Vue]
// 1. Import the style
import './style.css';
import { createApp } from 'vue';
import App from './App.vue';

export default defineContentScript({
  matches: ['<all_urls>'],
  // 2. Set cssInjectionMode
  cssInjectionMode: 'ui',

  async main(ctx) {
    // 3. Define your UI
    const ui = await createShadowRootUi(ctx, {
      name: 'example-ui',
      position: 'inline',
      anchor: 'body',
      onMount: (container) => {
        // Define how your UI will be mounted inside the container
        const app = createApp(App);
        app.mount(container);
        return app;
      },
      onRemove: (app) => {
        // Unmount the app when the UI is removed
        app?.unmount();
      },
    });

    // 4. Mount the UI
    ui.mount();
  },
});
```

```tsx [React]
// 1. Import the style
import './style.css';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

export default defineContentScript({
  matches: ['<all_urls>'],
  // 2. Set cssInjectionMode
  cssInjectionMode: 'ui',

  async main(ctx) {
    // 3. Define your UI
    const ui = await createShadowRootUi(ctx, {
      name: 'example-ui',
      position: 'inline',
      anchor: 'body',
      onMount: (container) => {
        // Container is a body, and React warns when creating a root on the body, so create a wrapper div
        const app = document.createElement('div');
        container.append(app);

        // Create a root on the UI container and render a component
        const root = ReactDOM.createRoot(app);
        root.render(<App />);
        return root;
      },
      onRemove: (root) => {
        // Unmount the root when the UI is removed
        root?.unmount();
      },
    });

    // 4. Mount the UI
    ui.mount();
  },
});
```

```ts [Svelte]
// 1. Import the style
import './style.css';
import App from './App.svelte';
import { mount, unmount } from 'svelte';

export default defineContentScript({
  matches: ['<all_urls>'],
  // 2. Set cssInjectionMode
  cssInjectionMode: 'ui',

  async main(ctx) {
    // 3. Define your UI
    const ui = await createShadowRootUi(ctx, {
      name: 'example-ui',
      position: 'inline',
      anchor: 'body',
      onMount: (container) => {
        // Create the Svelte app inside the UI container
        mount(App, {
          target: container,
        });
      },
      onRemove: () => {
        // Destroy the app when the UI is removed
        unmount(app);
      },
    });

    // 4. Mount the UI
    ui.mount();
  },
});
```

```tsx [Solid]
// 1. Import the style
import './style.css';
import { render } from 'solid-js/web';

export default defineContentScript({
  matches: ['<all_urls>'],
  // 2. Set cssInjectionMode
  cssInjectionMode: 'ui',

  async main(ctx) {
    // 3. Define your UI
    const ui = await createShadowRootUi(ctx, {
      name: 'example-ui',
      position: 'inline',
      anchor: 'body',
      onMount: (container) => {
        // Render your app to the UI container
        const unmount = render(() => <div>...</div>, container);
      },
      onRemove: (unmount) => {
        // Unmount the app when the UI is removed
        unmount?.();
      },
    });

    // 4. Mount the UI
    ui.mount();
  },
});
```

:::

See the [API Reference](/api/reference/wxt/utils/content-script-ui/shadow-root/functions/createShadowRootUi) for the complete list of options.

Full examples:

- [react-content-script-ui](https://github.com/wxt-dev/examples/tree/main/examples/react-content-script-ui)
- [tailwindcss](https://github.com/wxt-dev/examples/tree/main/examples/tailwindcss)

### IFrame

If you don't need to run your UI in the same frame as the content script, you can use an IFrame to host your UI instead. Since an IFrame just hosts an HTML page, **_HMR is supported_**.

WXT provides a helper function, [`createIframeUi`](/api/reference/wxt/utils/content-script-ui/iframe/functions/createIframeUi), which simplifies setting up the IFrame.

1. Create an HTML page that will be loaded into your IFrame:
   ```html
   <!-- entrypoints/example-iframe.html -->
   <!doctype html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Your Content Script IFrame</title>
     </head>
     <body>
       <!-- ... -->
     </body>
   </html>
   ```
1. Add the page to the manifest's `web_accessible_resources`:
   ```ts [wxt.config.ts]
   export default defineConfig({
     manifest: {
       web_accessible_resources: [
         {
           resources: ['example-iframe.html'],
           matches: [...],
         },
       ],
     },
   });
   ```
1. Create and mount the IFrame:

   ```ts
   export default defineContentScript({
     matches: ['<all_urls>'],

     main(ctx) {
       // Define the UI
       const ui = createIframeUi(ctx, {
         page: '/example-iframe.html',
         position: 'inline',
         anchor: 'body',
         onMount: (wrapper, iframe) => {
           // Add styles to the iframe like width
           iframe.width = '123';
         },
       });

       // Show UI to user
       ui.mount();
     },
   });
   ```

See the [API Reference](/api/reference/wxt/utils/content-script-ui/iframe/functions/createIframeUi) for the complete list of options.

## Isolated World vs Main World

By default, all content scripts run in an isolated context where only the DOM is shared with the webpage it is running on - an "isolated world". In MV3, Chromium introduced the ability to run content scripts in the "main" world - where everything, not just the DOM, is available to the content script, just like if the script were loaded by the webpage.

You can enable this for a content script by setting the `world` option:

```ts
export default defineContentScript({
  world: 'MAIN',
});
```

However, this approach has several notable drawbacks:

- Doesn't support MV2
- `world: "MAIN"` is only supported by Chromium browsers
- Main world content scripts don't have access to the extension API

Instead, WXT recommends injecting a script into the main world manually using it's `injectScript` function. This will address the drawbacks mentioned before.

- `injectScript` supports both MV2 and MV3
- `injectScript` supports all browsers
- Having a "parent" content script means you can send messages back and forth, making it possible to access the extension API

To use `injectScript`, we need two entrypoints, one content script and one unlisted script:

<!-- prettier-ignore -->
```html
📂 entrypoints/
   📄 example.content.ts
   📄 example-main-world.ts
```

```ts
// entrypoints/example-main-world.ts
export default defineUnlistedScript(() => {
  console.log('Hello from the main world');
});
```

```ts
// entrypoints/example.content.ts
export default defineContentScript({
  matches: ['*://*/*'],
  async main() {
    console.log('Injecting script...');
    await injectScript('/example-main-world.js', {
      keepInDom: true,
    });
    console.log('Done!');
  },
});
```

```json
export default defineConfig({
  manifest: {
    // ...
    web_accessible_resources: [
      {
        resources: ["example-main-world.js"],
        matches: ["*://*/*"],
      }
    ]
  }
});
```

`injectScript` works by creating a `script` element on the page pointing to your script. This loads the script into the page's context so it runs in the main world.

`injectScript` returns a promise, that when resolved, means the script has been evaluated by the browser and you can start communicating with it.

:::warning Warning: `run_at` Caveat
For MV3, `injectScript` is synchronous and the injected script will be evaluated at the same time as your the content script's `run_at`.

However for MV2, `injectScript` has to `fetch` the script's text content and create an inline `<script>` block. This means for MV2, your script is injected asynchronously and it will not be evaluated at the same time as your content script's `run_at`.
:::

## Mounting UI to dynamic element

In many cases, you may need to mount a UI to a DOM element that does not exist at the time the web page is initially loaded. To handle this, use the `autoMount` API to automatically mount the UI when the target element appears dynamically and unmount it when the element disappears. In WXT, the `anchor` option is used to target the element, enabling automatic mounting and unmounting based on its appearance and removal.

```ts
export default defineContentScript({
  matches: ['<all_urls>'],

  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      // It observes the anchor
      anchor: '#your-target-dynamic-element',
      onMount: (container) => {
        // Append children to the container
        const app = document.createElement('p');
        app.textContent = '...';
        container.append(app);
      },
    });

    // Call autoMount to observe anchor element for add/remove.
    ui.autoMount();
  },
});
```

:::tip
When the `ui.remove` is called, `autoMount` also stops.
:::

See the [API Reference](/api/reference/wxt/utils/content-script-ui/types/interfaces/ContentScriptUi#automount) for the complete list of options.

## Dealing with SPAs

It is difficult to write content scripts for SPAs (single page applications) and websites using HTML5 history mode for navigation because content scripts are only ran on full page reloads. SPAs and websites that take advantage of HTML5 history mode **_do not perform a full reload when changing paths_**, and thus your content script isn't going to be ran when you expect it to be.

Let's look at an example. Say you want to add a UI to YouTube when watching a video:

```ts
export default defineContentScript({
  matches: ['*://*.youtube.com/watch*'],
  main(ctx) {
    console.log('YouTube content script loaded');

    mountUi(ctx);
  },
});

function mountUi(ctx: ContentScriptContext): void {
  // ...
}
```

You're only going to see "YouTube content script loaded" when reloading the watch page or when navigating directly to it from another website.

To get around this, you'll need to manually listen for the path to change and run your content script when the URL matches what you expect it to match.

```ts
const watchPattern = new MatchPattern('*://*.youtube.com/watch*');

export default defineContentScript({
  matches: ['*://*.youtube.com/*'],
  main(ctx) {
    ctx.addEventListener(window, 'wxt:locationchange', ({ newUrl }) => {
      if (watchPattern.includes(newUrl)) mainWatch(ctx);
    });
  },
});

function mainWatch(ctx: ContentScriptContext) {
  mountUi(ctx);
}
```
````

## File: docs/guide/essentials/e2e-testing.md
````markdown
# E2E Testing

## Playwright

[Playwright](https://playwright.dev) is the only good option for writing Chrome Extension end-to-end tests.

To add E2E tests to your project, follow Playwright's [Chrome Extension docs](https://playwright.dev/docs/chrome-extensions). When you have to pass the path to your extension, pass the output directory, `/path/to/project/.output/chrome-mv3`.

For a complete example, see the [WXT's Playwright Example](https://github.com/wxt-dev/examples/tree/main/examples/playwright-e2e-testing).
````

## File: docs/guide/essentials/entrypoints.md
````markdown
---
outline: deep
---

# Entrypoints

WXT uses the files inside the `entrypoints/` directory as inputs when bundling your extension. They can be HTML, JS, CSS, or any variant of those file types supported by Vite (TS, JSX, SCSS, etc).

## Folder Structure

Inside the `entrypoints/` directory, an entrypoint is defined as a single file or directory (with an `index` file) inside it.

:::code-group

<!-- prettier-ignore -->
```html [Single File]
📂 entrypoints/
   📄 {name}.{ext}
```

<!-- prettier-ignore -->
```html [Directory]
📂 entrypoints/
   📂 {name}/
      📄 index.{ext}
```

:::

The entrypoint's `name` dictates the type of entrypoint. For example, to add a ["Background" entrypoint](#background), either of these files would work:

:::code-group

<!-- prettier-ignore -->
```html [Single File]
📂 entrypoints/
   📄 background.ts
```

<!-- prettier-ignore -->
```html [Directory]
📂 entrypoints/
   📂 background/
      📄 index.ts
```

:::

Refer to the [Entrypoint Types](#entrypoint-types) section for the full list of listed entrypoints and their filename patterns.

### Including Other Files

When using an entrypoint directory, `entrypoints/{name}/index.{ext}`, you can add related files next to the `index` file.

<!-- prettier-ignore -->
```html
📂 entrypoints/
   📂 popup/
      📄 index.html     ← This file is the entrypoint
      📄 main.ts
      📄 style.css
   📂 background/
      📄 index.ts       ← This file is the entrypoint
      📄 alarms.ts
      📄 messaging.ts
   📂 youtube.content/
      📄 index.ts       ← This file is the entrypoint
      📄 style.css
```

:::danger
**DO NOT** put files related to an entrypoint directly inside the `entrypoints/` directory. WXT will treat them as entrypoints and try to build them, usually resulting in an error.

Instead, use a directory for that entrypoint:

<!-- prettier-ignore -->
```html
📂 entrypoints/
   📄 popup.html <!-- [!code --] -->
   📄 popup.ts <!-- [!code --] -->
   📄 popup.css <!-- [!code --] -->
   📂 popup/ <!-- [!code ++] -->
      📄 index.html <!-- [!code ++] -->
      📄 main.ts <!-- [!code ++] -->
      📄 style.css <!-- [!code ++] -->
```

:::

### Deeply Nested Entrypoints

While the `entrypoints/` directory might resemble the `pages/` directory of other web frameworks, like Nuxt or Next.js, **it does not support deeply nesting entrypoints** in the same way.

Entrypoints must be zero or one levels deep for WXT to discover and build them:

<!-- prettier-ignore -->
```html
📂 entrypoints/
   📂 youtube/ <!-- [!code --] -->
       📂 content/ <!-- [!code --] -->
          📄 index.ts <!-- [!code --] -->
          📄 ... <!-- [!code --] -->
       📂 injected/ <!-- [!code --] -->
          📄 index.ts <!-- [!code --] -->
          📄 ... <!-- [!code --] -->
   📂 youtube.content/ <!-- [!code ++] -->
      📄 index.ts <!-- [!code ++] -->
      📄 ... <!-- [!code ++] -->
   📂 youtube-injected/ <!-- [!code ++] -->
      📄 index.ts <!-- [!code ++] -->
      📄 ... <!-- [!code ++] -->
```

## Unlisted Entrypoints

In web extensions, there are two types of entrypoints:

1. **Listed**: Referenced in the `manifest.json`
2. **Unlisted**: Not referenced in the `manifest.json`

Throughout the rest of WXT's documentation, listed entrypoints are referred to by name. For example:

- Popup
- Options
- Background
- Content Script

However, not all entrypoints in web extensions are listed in the manifest. Some are not listed in the manifest, but are still used by extensions. For example:

- A welcome page shown in a new tab when the extension is installed
- JS files injected by content scripts into the main world

For more details on how to add unlisted entrypoints, see:

- [Unlisted Pages](#unlisted-pages)
- [Unlisted Scripts](#unlisted-scripts)
- [Unlisted CSS](#unlisted-css)

## Defining Manifest Options

Most listed entrypoints have options that need to be added to the `manifest.json`. However with WXT, instead of defining the options in a separate file, _you define these options inside the entrypoint file itself_.

For example, here's how to define `matches` for content scripts:

```ts [entrypoints/content.ts]
export default defineContentScript({
  matches: ['*://*.wxt.dev/*'],
  main() {
    // ...
  },
});
```

For HTML entrypoints, options are configured as `<meta>` tags. For example, to use a `page_action` for your MV2 popup:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta name="manifest.type" content="page_action" />
  </head>
</html>
```

> Refer to the [Entrypoint Types](#entrypoint-types) sections for a list of options configurable inside each entrypoint, and how to define them.

When building your extension, WXT will look at the options defined in your entrypoints, and generate the manifest accordingly.

## Entrypoint Types

### Background

[Chrome Docs](https://developer.chrome.com/docs/extensions/mv3/manifest/background/) &bull; [Firefox Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/background)

<EntrypointPatterns
  :patterns="[
    ['background.[jt]s', 'background.js'],
    ['background/index.[jt]s', 'background.js'],
  ]"
/>

:::code-group

```ts [Minimal]
export default defineBackground(() => {
  // Executed when background is loaded
});
```

```ts [With Manifest Options]
export default defineBackground({
  // Set manifest options
  persistent: undefined | true | false,
  type: undefined | 'module',

  // Set include/exclude if the background should be removed from some builds
  include: undefined | string[],
  exclude: undefined | string[],

  main() {
    // Executed when background is loaded, CANNOT BE ASYNC
  },
});
```

:::

For MV2, the background is added as a script to the background page. For MV3, the background becomes a service worker.

When defining your background entrypoint, keep in mind that WXT will import this file in a NodeJS environment during the build process. That means you cannot place any runtime code outside the `main` function.

<!-- prettier-ignore -->
```ts
browser.action.onClicked.addListener(() => { // [!code --]
  // ... // [!code --]
}); // [!code --]

export default defineBackground(() => {
  browser.action.onClicked.addListener(() => { // [!code ++]
    // ... // [!code ++]
  }); // [!code ++]
});
```

Refer to the [Entrypoint Loaders](/guide/essentials/config/entrypoint-loaders) documentation for more details.

### Bookmarks

[Chrome Docs](https://developer.chrome.com/docs/extensions/mv3/override/) &bull; [Firefox Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/chrome_url_overrides)

<EntrypointPatterns
  :patterns="[
    ['bookmarks.html', 'bookmarks.html'],
    ['bookmarks/index.html', 'bookmarks.html'],
  ]"
/>

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Title</title>
    <!-- Set include/exclude if the page should be removed from some builds -->
    <meta name="manifest.include" content="['chrome', ...]" />
    <meta name="manifest.exclude" content="['chrome', ...]" />
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

When you define a Bookmarks entrypoint, WXT will automatically update the manifest to override the browser's bookmarks page with your own HTML page.

### Content Scripts

[Chrome Docs](https://developer.chrome.com/docs/extensions/mv3/content_scripts/) &bull; [Firefox Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts)

<EntrypointPatterns
  :patterns="[
    ['content.[jt]sx?', 'content-scripts/content.js'],
    ['content/index.[jt]sx?', 'content-scripts/content.js'],
    ['{name}.content.[jt]sx?', 'content-scripts/{name}.js'],
    ['{name}.content/index.[jt]sx?', 'content-scripts/{name}.js'],
  ]"
/>

```ts
export default defineContentScript({
  // Set manifest options
  matches: string[],
  excludeMatches: undefined | [],
  includeGlobs: undefined | [],
  excludeGlobs: undefined | [],
  allFrames: undefined | true | false,
  runAt: undefined | 'document_start' | 'document_end' | 'document_idle',
  matchAboutBlank: undefined | true | false,
  matchOriginAsFallback: undefined | true | false,
  world: undefined | 'ISOLATED' | 'MAIN',

  // Set include/exclude if the background should be removed from some builds
  include: undefined | string[],
  exclude: undefined | string[],

  // Configure how CSS is injected onto the page
  cssInjectionMode: undefined | "manifest" | "manual" | "ui",

  // Configure how/when content script will be registered
  registration: undefined | "manifest" | "runtime",

  main(ctx: ContentScriptContext) {
    // Executed when content script is loaded, can be async
  },
});
```

When defining content script entrypoints, keep in mind that WXT will import this file in a NodeJS environment during the build process. That means you cannot place any runtime code outside the `main` function.

<!-- prettier-ignore -->
```ts
browser.runtime.onMessage.addListener((message) => { // [!code --]
  // ... // [!code --]
}); // [!code --]

export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message) => { // [!code ++]
    // ... // [!code ++]
  }); // [!code ++]
});
```

Refer to the [Entrypoint Loaders](/guide/essentials/config/entrypoint-loaders) documentation for more details.

See [Content Script UI](/guide/essentials/content-scripts) for more info on creating UIs and including CSS in content scripts.

### Devtools

[Chrome Docs](https://developer.chrome.com/docs/extensions/mv3/devtools/) &bull; [Firefox Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/devtools_page)

<EntrypointPatterns
  :patterns="[
    ['devtools.html', 'devtools.html'],
    ['devtools/index.html', 'devtools.html'],
  ]"
/>

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Set include/exclude if the page should be removed from some builds -->
    <meta name="manifest.include" content="['chrome', ...]" />
    <meta name="manifest.exclude" content="['chrome', ...]" />
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

Follow the [Devtools Example](https://github.com/wxt-dev/examples/tree/main/examples/devtools-extension#readme) to add different panels and panes.

### History

[Chrome Docs](https://developer.chrome.com/docs/extensions/mv3/override/) &bull; [Firefox Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/chrome_url_overrides)

<EntrypointPatterns
  :patterns="[
    ['history.html', 'history.html'],
    ['history/index.html', 'history.html'],
  ]"
/>

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Title</title>
    <!-- Set include/exclude if the page should be removed from some builds -->
    <meta name="manifest.include" content="['chrome', ...]" />
    <meta name="manifest.exclude" content="['chrome', ...]" />
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

When you define a History entrypoint, WXT will automatically update the manifest to override the browser's history page with your own HTML page.

### Newtab

[Chrome Docs](https://developer.chrome.com/docs/extensions/mv3/override/) &bull; [Firefox Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/chrome_url_overrides)

<EntrypointPatterns
  :patterns="[
    ['newtab.html', 'newtab.html'],
    ['newtab/index.html', 'newtab.html'],
  ]"
/>

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Title</title>
    <!-- Set include/exclude if the page should be removed from some builds -->
    <meta name="manifest.include" content="['chrome', ...]" />
    <meta name="manifest.exclude" content="['chrome', ...]" />
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

When you define a Newtab entrypoint, WXT will automatically update the manifest to override the browser's new tab page with your own HTML page.

### Options

[Chrome Docs](https://developer.chrome.com/docs/extensions/mv3/options/) &bull; [Firefox Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/options_ui)

<EntrypointPatterns
  :patterns="[
    ['options.html', 'options.html'],
    ['options/index.html', 'options.html'],
  ]"
/>

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Options Title</title>

    <!-- Customize the manifest options -->
    <meta name="manifest.open_in_tab" content="true|false" />
    <meta name="manifest.chrome_style" content="true|false" />
    <meta name="manifest.browser_style" content="true|false" />

    <!-- Set include/exclude if the page should be removed from some builds -->
    <meta name="manifest.include" content="['chrome', ...]" />
    <meta name="manifest.exclude" content="['chrome', ...]" />
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

### Popup

[Chrome Docs](https://developer.chrome.com/docs/extensions/reference/action/) &bull; [Firefox Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/action)

<EntrypointPatterns
  :patterns="[
    ['popup.html', 'popup.html'],
    ['popup/index.html', 'popup.html'],
  ]"
/>

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Set the `action.default_title` in the manifest -->
    <title>Default Popup Title</title>

    <!-- Customize the manifest options -->
    <meta
      name="manifest.default_icon"
      content="{
        16: '/icon-16.png',
        24: '/icon-24.png',
        ...
      }"
    />
    <meta name="manifest.type" content="page_action|browser_action" />
    <meta name="manifest.browser_style" content="true|false" />

    <!-- Set include/exclude if the page should be removed from some builds -->
    <meta name="manifest.include" content="['chrome', ...]" />
    <meta name="manifest.exclude" content="['chrome', ...]" />
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

### Sandbox

[Chrome Docs](https://developer.chrome.com/docs/extensions/mv3/manifest/sandbox/)

:::warning Chromium Only
Firefox does not support sandboxed pages.
:::

<EntrypointPatterns
  :patterns="[
    ['sandbox.html', 'sandbox.html'],
    ['sandbox/index.html', 'sandbox.html'],
    ['{name}.sandbox.html', '{name}.html'],
    ['{name}.sandbox/index.html', '{name}.html'],
  ]"
/>

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Title</title>

    <!-- Set include/exclude if the page should be removed from some builds -->
    <meta name="manifest.include" content="['chrome', ...]" />
    <meta name="manifest.exclude" content="['chrome', ...]" />
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

### Side Panel

[Chrome Docs](https://developer.chrome.com/docs/extensions/reference/sidePanel/) &bull; [Firefox Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Sidebars)

<EntrypointPatterns
  :patterns="[
    ['sidepanel.html', 'sidepanel.html'],
    ['sidepanel/index.html', 'sidepanel.html'],
    ['{name}.sidepanel.html', '{name}.html` '],
    ['{name}.sidepanel/index.html', '{name}.html` '],
  ]"
/>

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Default Side Panel Title</title>

    <!-- Customize the manifest options -->
    <meta
      name="manifest.default_icon"
      content="{
        16: '/icon-16.png',
        24: '/icon-24.png',
        ...
      }"
    />
    <meta name="manifest.open_at_install" content="true|false" />
    <meta name="manifest.browser_style" content="true|false" />

    <!-- Set include/exclude if the page should be removed from some builds -->
    <meta name="manifest.include" content="['chrome', ...]" />
    <meta name="manifest.exclude" content="['chrome', ...]" />
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

In Chrome, side panels use the `side_panel` API, while Firefox uses the `sidebar_action` API.

### Unlisted CSS

<EntrypointPatterns
  :patterns="[
    ['{name}.(css|scss|sass|less|styl|stylus)', '{name}.css'],
    ['{name}/index.(css|scss|sass|less|styl|stylus)', '{name}.css'],
    ['content.(css|scss|sass|less|styl|stylus)', 'content-scripts/content.css'],
    ['content/index.(css|scss|sass|less|styl|stylus)', 'content-scripts/content.css'],
    ['{name}.content.(css|scss|sass|less|styl|stylus)', 'content-scripts/{name}.css'],
    ['{name}.content/index.(css|scss|sass|less|styl|stylus)', 'content-scripts/{name}.css'],
  ]"
/>

```css
body {
  /* ... */
}
```

Follow Vite's guide to setup your preprocessor of choice: https://vitejs.dev/guide/features.html#css-pre-processors

CSS entrypoints are always unlisted. To add CSS to a content script, see the [Content Script](/guide/essentials/content-scripts#css) docs.

### Unlisted Pages

<EntrypointPatterns
  :patterns="[
    ['{name}.html', '{name}.html'],
    ['{name}/index.html', '{name}.html'],
  ]"
/>

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Title</title>

    <!-- Set include/exclude if the page should be removed from some builds -->
    <meta name="manifest.include" content="['chrome', ...]" />
    <meta name="manifest.exclude" content="['chrome', ...]" />
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

At runtime, unlisted pages are accessible at `/{name}.html`:

```ts
const url = browser.runtime.getURL('/{name}.html');

console.log(url); // "chrome-extension://{id}/{name}.html"
window.open(url); // Open the page in a new tab
```

### Unlisted Scripts

<EntrypointPatterns
  :patterns="[
    ['{name}.[jt]sx?', '{name}.js'],
    ['{name}/index.[jt]sx?', '{name}.js'],
  ]"
/>

:::code-group

```ts [Minimal]
export default defineUnlistedScript(() => {
  // Executed when script is loaded
});
```

```ts [With Options]
export default defineUnlistedScript({
  // Set include/exclude if the script should be removed from some builds
  include: undefined | string[],
  exclude: undefined | string[],

  main() {
    // Executed when script is loaded
  },
});
```

:::

At runtime, unlisted scripts are accessible from `/{name}.js`:

```ts
const url = browser.runtime.getURL('/{name}.js');

console.log(url); // "chrome-extension://{id}/{name}.js"
```

You are responsible for loading/running these scripts where needed. If necessary, don't forget to add the script and/or any related assets to [`web_accessible_resources`](https://developer.chrome.com/docs/extensions/reference/manifest/web-accessible-resources).

When defining an unlisted script, keep in mind that WXT will import this file in a NodeJS environment during the build process. That means you cannot place any runtime code outside the `main` function.

<!-- prettier-ignore -->
```ts
document.querySelectorAll('a').forEach((anchor) => { // [!code --]
  // ... // [!code --]
}); // [!code --]

export default defineUnlistedScript(() => {
  document.querySelectorAll('a').forEach((anchor) => { // [!code ++]
    // ... // [!code ++]
  }); // [!code ++]
});
```

Refer to the [Entrypoint Loaders](/guide/essentials/config/entrypoint-loaders) documentation for more details.
````

## File: docs/guide/essentials/es-modules.md
````markdown
# ES Modules

You source code should always be written as ESM. However, you have some control whether an entrypoint is bundled as ESM.

## HTML Pages <Badge type="warning" text="≥0.0.1" />

Vite only supports bundling JS from HTML pages as ESM. Ensure you have added `type="module"` to your `<script>` tags:

<!-- prettier-ignore -->
```html
<script src="./main.ts"></script> <!-- [!code --] -->
<script src="./main.ts" type="module"></script> <!-- [!code ++] -->
```

## Background <Badge type="warning" text="≥0.16.0" />

By default, your background will be bundled into a single file as IIFE. You can change this by setting `type: "module"` in your background entrypoint:

```ts
export default defineBackground({
  type: 'module', // [!code ++]
  main() {
    // ...
  },
});
```

This will change the output format to ESM, enable code-spliting between your background script and HTML pages, and set `"type": "module"` in your manifest.

:::warning
Only MV3 supports ESM background scripts/service workers. When targeting MV2, the `type` option is ignored and the background is always bundled into a single file as IIFE.
:::

## Content Scripts

WXT does not yet include built-in support for bundling content scripts as ESM. The plan is to add support for chunking to reduce bundle size, but not support HMR for now. There are several technical issues that make implementing a generic solution for HMR impossible. See [Content Script ESM Support #357](https://github.com/wxt-dev/wxt/issues/357) for details.

If you can't wait, and need ESM support right now, you can implement ESM support manually. See the [ESM Content Script UI](https://github.com/wxt-dev/examples/tree/main/examples/esm-content-script-ui) example to learn how.
````

## File: docs/guide/essentials/extension-apis.md
````markdown
# Extension APIs

[Chrome Docs](https://developer.chrome.com/docs/extensions/reference/api) • [Firefox Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Browser_support_for_JavaScript_APIs)

Different browsers provide different global variables for accessing the extension APIs (chrome provides `chrome`, firefox provides `browser`, etc).

WXT merges these two into a unified API accessed through the `browser` variable.

```ts
import { browser } from 'wxt/browser';

browser.action.onClicked.addListener(() => {
  // ...
});
```

:::tip
With auto-imports enabled, you don't even need to import this variable from `wxt/browser`!
:::

The `browser` variable WXT provides is a simple export of the `browser` or `chrome` globals provided by the browser at runtime:

<<< @/../packages/browser/src/index.mjs#snippet

This means you can use the promise-style API for both MV2 and MV3, and it will work across all browsers (Chromium, Firefox, Safari, etc).

## Accessing Types

All types can be accessed via WXT's `Browser` namespace:

```ts
import { type Browser } from 'wxt/browser';

function handleMessage(message: any, sender: Browser.runtime.MessageSender) {
  // ...
}
```

## Using `webextension-polyfill`

If you want to use the `webextension-polyfill` when importing `browser`, you can do so by installing the `@wxt-dev/webextension-polyfill` package.

See it's [Installation Guide](https://github.com/wxt-dev/wxt/blob/main/packages/webextension-polyfill/README.md) to get started.

## Feature Detection

Depending on the manifest version, browser, and permissions, some APIs are not available at runtime. If an API is not available, it will be `undefined`.

:::warning
Types will not help you here. The types WXT provides for `browser` assume all APIs exist. You are responsible for knowing whether an API is available or not.
:::

To check if an API is available, use feature detection:

```ts
if (browser.runtime.onSuspend != null) {
  browser.runtime.onSuspend.addListener(() => {
    // ...
  });
}
```

Here, [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) is your best friend:

```ts
browser.runtime.onSuspend?.addListener(() => {
  // ...
});
```

Alternatively, if you're trying to use similar APIs under different names (to support MV2 and MV3), you can do something like this:

```ts
(browser.action ?? browser.browser_action).onClicked.addListener(() => {
  //
});
```
````

## File: docs/guide/essentials/frontend-frameworks.md
````markdown
# Frontend Frameworks

## Built-in Modules

WXT has preconfigured modules for the most popular frontend frameworks:

- [`@wxt-dev/module-react`](https://github.com/wxt-dev/wxt/tree/main/packages/module-react)
- [`@wxt-dev/module-vue`](https://github.com/wxt-dev/wxt/tree/main/packages/module-vue)
- [`@wxt-dev/module-svelte`](https://github.com/wxt-dev/wxt/tree/main/packages/module-svelte)
- [`@wxt-dev/module-solid`](https://github.com/wxt-dev/wxt/tree/main/packages/module-solid)

Install the module for your framework, then add it to your config:

:::code-group

```ts [React]
import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
});
```

```ts [Vue]
import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
});
```

```ts [Svelte]
import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-svelte'],
});
```

```ts [Solid]
import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-solid'],
});
```

:::

## Adding Vite Plugins

If your framework doesn't have an official WXT module, no worries! WXT supports any framework with a Vite plugin.

Just add the Vite plugin to your config and you're good to go! Use the framework in HTML pages or content scripts and it will just work 👍

```ts
import { defineConfig } from 'wxt';
import react from '@vitejs/plugin-react';

export default defineConfig({
  vite: () => ({
    plugins: [react()],
  }),
});
```

> The WXT modules just simplify the configuration and add auto-imports. They're not much different than the above.

## Multiple Apps

Since web extensions usually contain multiple UIs across multiple entrypoints (popup, options, changelog, side panel, content scripts, etc), you'll need to create individual app instances, one per entrypoint.

Usually, this means each entrypoint should be a directory with it's own files inside it. Here's the recommended folder structure:

<!-- prettier-ignore -->
```html
📂 {srcDir}/
   📂 assets/          <---------- Put shared assets here
      📄 tailwind.css
   📂 components/
      📄 Button.tsx
   📂 entrypoints/
      📂 options/       <--------- Use a folder with an index.html file in it
         📁 pages/      <--------- A good place to put your router pages if you have them
         📄 index.html
         📄 App.tsx
         📄 main.tsx    <--------- Create and mount your app here
         📄 style.css   <--------- Entrypoint-specific styles
         📄 router.ts
```

## Configuring Routers

All frameworks come with routers for building a multi-page app using the URL's path... But web extensions don't work like this. Since HTML files are static, `chrome-extension://{id}/popup.html`, there's no way to change the entire path for routing.

Instead, you need to configure the router to run in "hash" mode, where the routing information is a part of the URL's hash, not the path (ie: `popup.html#/` and `popup.html#/account/settings`).

Refer to your router's docs for information about hash mode and how to enable it. Here's a non-extensive list of a few popular routers:

- [`react-router`](https://reactrouter.com/en/main/routers/create-hash-router)
- [`vue-router`](https://router.vuejs.org/guide/essentials/history-mode.html#Hash-Mode)
- [`svelte-spa-router`](https://www.npmjs.com/package/svelte-spa-router#hash-based-routing)
- [`solid-router`](https://github.com/solidjs/solid-router?tab=readme-ov-file#hash-mode-router)
````

## File: docs/guide/essentials/i18n.md
````markdown
# I18n

[Chrome Docs](https://developer.chrome.com/docs/extensions/reference/api/i18n) • [Firefox Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/i18n)

This page discusses how to setup internationalization using the vanilla `browser.i18n` APIs and mentions some alternatives if you want to use something else.

[[toc]]

## Usage

1. Add `default_locale` to your manifest:
   ```ts
   export default defineConfig({
     manifest: {
       default_locale: 'en',
     },
   });
   ```
2. Create `messages.json` files in the `public/` directory:

   <!-- prettier-ignore -->
   ```html
   📂 {srcDir}/
      📂 public/
         📂 _locales/
            📂 en/
               📄 messages.json
            📂 de/
               📄 messages.json
            📂 ko/
               📄 messages.json
   ```

   ```jsonc
   // public/_locales/en/messages.json
   {
     "helloWorld": {
       "message": "Hello world!",
     },
   }
   ```

3. Get the translation:
   ```ts
   browser.i18n.getMessage('helloWorld');
   ```
4. _Optional_: Add translations for extension name and description:

```json
{
  "extName": {
    "message": "..."
  },
  "extDescription": {
    "message": "..."
  },
  "helloWorld": {
    "message": "Hello world!"
  }
}
```

```ts
export default defineConfig({
  manifest: {
    name: '__MSG_extName__',
    description: '__MSG_extDescription__',
    default_locale: 'en',
  },
});
```

## Alternatives

The vanilla API has very few features, which is why you may want to consider using third-party NPM packages like `i18next`, `react-i18n`, `vue-i18n`, etc.

However, it is recommended you stick with the vanilla API (or a package based on top of the vanilla API, like [`@wxt-dev/i18n`](/i18n)), because:

- They can localize text in your manifest and CSS files
- Translations are loaded synchronously
- Translations are not bundled multiple times, keeping your extension small
- Zero configuration

However, there is one major downside to the vanilla API and any packages built on top of it:

- Language cannot be changed without changing your browser/system language

Here are some examples of how to setup a third party i18n library:

- [vue-i18n](https://github.com/wxt-dev/wxt-examples/tree/main/examples/vue-i18n)
````

## File: docs/guide/essentials/messaging.md
````markdown
# Messaging

[Chrome Docs](https://developer.chrome.com/docs/extensions/develop/concepts/messaging) • [Firefox Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts#communicating_with_background_scripts)

Read the docs linked above to learn more about using the vanilla messaging APIs.

## Alternatives

The vanilla APIs are difficult to use and are a pain point to many new extension developers. For this reason, WXT recommends installing an NPM package that wraps around the vanilla APIs.

Here are some popular messaging libraries that support all browsers and work with WXT:

- [`trpc-chrome`](https://www.npmjs.com/package/trpc-chrome) - [tRPC](https://trpc.io/) adapter for Web Extensions.
- [`webext-bridge`](https://www.npmjs.com/package/webext-bridge) - Messaging in WebExtensions made super easy. Out of the box.
- [`@webext-core/messaging`](https://www.npmjs.com/package/@webext-core/messaging) - Light weight, type-safe wrapper around the web extension messaging APIs
- [`@webext-core/proxy-service`](https://www.npmjs.com/package/@webext-core/proxy-service) - A type-safe wrapper around the web extension messaging APIs that lets you call a function from anywhere, but execute it in the background.
- [`Comctx`](https://github.com/molvqingtai/comctx) - Cross-context RPC solution with type safety and flexible adapters.
````

## File: docs/guide/essentials/project-structure.md
````markdown
# Project Structure

WXT follows a strict project structure. By default, it's a flat folder structure that looks like this:

<!-- prettier-ignore -->
```html
📂 {rootDir}/
   📁 .output/
   📁 .wxt/
   📁 assets/
   📁 components/
   📁 composables/
   📁 entrypoints/
   📁 hooks/
   📁 modules/
   📁 public/
   📁 utils/
   📄 .env
   📄 .env.publish
   📄 app.config.ts
   📄 package.json
   📄 tsconfig.json
   📄 web-ext.config.ts
   📄 wxt.config.ts
```

Here's a brief summary of each of these files and directories:

- `.output/`: All build artifacts will go here
- `.wxt/`: Generated by WXT, it contains TS config
- `assets/`: Contains all CSS, images, and other assets that should be processed by WXT
- `components/`: Auto-imported by default, contains UI components
- `composables/`: Auto-imported by default, contains source code for your project's composable functions for Vue
- `entrypoints/`: Contains all the entrypoints that get bundled into your extension
- `hooks/`: Auto-imported by default, contains source code for your project's hooks for React and Solid
- `modules/`: Contains [local WXT Modules](/guide/essentials/wxt-modules) for your project
- `public/`: Contains any files you want to copy into the output folder as-is, without being processed by WXT
- `utils/`: Auto-imported by default, contains generic utilities used throughout your project
- `.env`: Contains [Environment Variables](/guide/essentials/config/environment-variables)
- `.env.publish`: Contains Environment Variables for [publishing](/guide/essentials/publishing)
- `app.config.ts`: Contains [Runtime Config](/guide/essentials/config/runtime)
- `package.json`: The standard file used by your package manager
- `tsconfig.json`: Config telling TypeScript how to behave
- `web-ext.config.ts`: Configure [Browser Startup](/guide/essentials/config/browser-startup)
- `wxt.config.ts`: The main config file for WXT projects

## Adding a `src/` Directory

Many developers like having a `src/` directory to separate source code from configuration files. You can enable it inside the `wxt.config.ts` file:

```ts [wxt.config.ts]
export default defineConfig({
  srcDir: 'src',
});
```

After enabling it, your project structure should look like this:

<!-- prettier-ignore -->
```html
📂 {rootDir}/
   📁 .output/
   📁 .wxt/
   📁 modules/
   📁 public/
   📂 src/
      📁 assets/
      📁 components/
      📁 composables/
      📁 entrypoints/
      📁 hooks/
      📁 utils/
      📄 app.config.ts
   📄 .env
   📄 .env.publish
   📄 package.json
   📄 tsconfig.json
   📄 web-ext.config.ts
   📄 wxt.config.ts
```

## Customizing Other Directories

You can configure the following directories:

<!-- prettier-ignore -->
```ts [wxt.config.ts]
export default defineConfig({
  // Relative to project root
  srcDir: "src",             // default: "."
  modulesDir: "wxt-modules", // default: "modules"
  outDir: "dist",            // default: ".output"
  publicDir: "static",       // default: "public"

  // Relative to srcDir
  entrypointsDir: "entries", // default: "entrypoints"
})
```

You can use absolute or relative paths.
````

## File: docs/guide/essentials/publishing.md
````markdown
---
outline: deep
---

# Publishing

WXT can ZIP your extension and submit it to various stores for review or for self-hosting.

## First Time Publishing

If you're publishing an extension to a store for the first time, you must manually navigate the process. WXT doesn't help you create listings, each store has unique steps and requirements that you need to familiarize yourself with.

For specific details about each store, see the stores sections below.

- [Chrome Web Store](#chrome-web-store)
- [Firefox Addon Store](#firefox-addon-store)
- [Edge Addons](#edge-addons)

## Automation

WXT provides two commands to help automate submitting a new version for review and publishing:

- `wxt submit init`: Setup all the required secrets and options for the `wxt submit` command
- `wxt submit`: Submit new versions of your extension for review (and publish them automatically once approved)

To get started, run `wxt submit init` and follow the prompts, or run `wxt submit --help` to view all available options. Once finished, you should have a `.env.submit` file! WXT will use this file to submit your updates.

> In CI, make sure you add all the environment variables to the submit step.

To submit a new version for publishing, build all the ZIPs you plan on releasing:

```sh
wxt zip
wxt zip -b firefox
```

Then run the `wxt submit` command, passing in all the ZIP files you want to release. In this case, we'll do a release for all 3 major stores: Chrome Web Store, Edge Addons, and Firefox Addons Store.

If it's your first time running the command or you recently made changes to the release process, you'll want to test your secrets by passing the `--dry-run` flag.

```sh
wxt submit --dry-run \
  --chrome-zip .output/{your-extension}-{version}-chrome.zip \
  --firefox-zip .output/{your-extension}-{version}-firefox.zip --firefox-sources-zip .output/{your-extension}-{version}-sources.zip \
  --edge-zip .output/{your-extension}-{version}-chrome.zip
```

If the dry run passes, remove the flag and do the actual release:

```sh
wxt submit \
  --chrome-zip .output/{your-extension}-{version}-chrome.zip \
  --firefox-zip .output/{your-extension}-{version}-firefox.zip --firefox-sources-zip .output/{your-extension}-{version}-sources.zip \
  --edge-zip .output/{your-extension}-{version}-chrome.zip
```

:::warning
See the [Firefox Addon Store](#firefox-addon-store) section for more details about the `--firefox-sources-zip` option.
:::

## GitHub Action

Here's an example of a GitHub Action that submits new versions of an extension for review. Ensure that you've added all required secrets used in the workflow to the repo's settings.

```yml
name: Release

on:
  workflow_dispatch:

jobs:
  submit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Zip extensions
        run: |
          pnpm zip
          pnpm zip:firefox

      - name: Submit to stores
        run: |
          pnpm wxt submit \
            --chrome-zip .output/*-chrome.zip \
            --firefox-zip .output/*-firefox.zip --firefox-sources-zip .output/*-sources.zip
        env:
          CHROME_EXTENSION_ID: ${{ secrets.CHROME_EXTENSION_ID }}
          CHROME_CLIENT_ID: ${{ secrets.CHROME_CLIENT_ID }}
          CHROME_CLIENT_SECRET: ${{ secrets.CHROME_CLIENT_SECRET }}
          CHROME_REFRESH_TOKEN: ${{ secrets.CHROME_REFRESH_TOKEN }}
          FIREFOX_EXTENSION_ID: ${{ secrets.FIREFOX_EXTENSION_ID }}
          FIREFOX_JWT_ISSUER: ${{ secrets.FIREFOX_JWT_ISSUER }}
          FIREFOX_JWT_SECRET: ${{ secrets.FIREFOX_JWT_SECRET }}
```

The action above lays the foundation for a basic workflow, including `zip` and `submit` steps. To further enhance your GitHub Action and delve into more complex scenarios, consider exploring the following examples from real projects. They introduce advanced features such as version management, changelog generation, and GitHub releases, tailored for different needs:

- [`aklinker1/github-better-line-counts`](https://github.com/aklinker1/github-better-line-counts/blob/main/.github/workflows/submit.yml) - Conventional commits, automated version bump and changelog generation, triggered manually, optional dry run for testing
- [`GuiEpi/plex-skipper`](https://github.com/GuiEpi/plex-skipper/blob/main/.github/workflows/deploy.yml) - Triggered automatically when `package.json` version is changed, creates and uploads artifacts to GitHub release.

> These examples are designed to provide clear insights and are a good starting point for customizing your own workflows. Feel free to explore and adapt them to your project needs.

## Stores

### Chrome Web Store

> ✅ Supported &bull; [Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard) &bull; [Publishing Docs](https://developer.chrome.com/docs/webstore/publish/)

To create a ZIP for Chrome:

```sh
wxt zip
```

### Firefox Addon Store

> ✅ Supported &bull; [Developer Dashboard](https://addons.mozilla.org/developers/) &bull; [Publishing Docs](https://extensionworkshop.com/documentation/publish/submitting-an-add-on/)

Firefox requires you to upload a ZIP of your source code. This allows them to rebuild your extension and review the code in a readable way. More details can be found in [Firefox's docs](https://extensionworkshop.com/documentation/publish/source-code-submission/).

When running `wxt zip -b firefox`, WXT will zip both your extension and sources. Certain files (such as config files, hidden files, tests, and excluded entrypoints) are automatically excluded from your sources. However, it's important to manually check the ZIP to ensure it only contains the files necessary to rebuild your extension.

To customize which files are zipped, add the `zip` option to your config file.

```ts [wxt.config.ts]
import { defineConfig } from 'wxt';

export default defineConfig({
  zip: {
    // ...
  },
});
```

If it's your first time submitting to the Firefox Addon Store, or if you've updated your project layout, always test your sources ZIP! The commands below should allow you to rebuild your extension from inside the extracted ZIP.

:::code-group

```sh [pnpm]
pnpm i
pnpm zip:firefox
```

```sh [npm]
npm i
npm run zip:firefox
```

```sh [yarn]
yarn
yarn zip:firefox
```

```sh [bun]
bun i
bun zip:firefox
```

:::

Ensure that you have a `README.md` or `SOURCE_CODE_REVIEW.md` file with the above commands so that the Firefox team knows how to build your extension.

Make sure the build output is the exact same when running `wxt build -b firefox` in your main project and inside the zipped sources.

:::warning
If you use a `.env` files, they can affect the chunk hashes in the output directory. Either delete the .env file before running `wxt zip -b firefox`, or include it in your sources zip with the [`zip.includeSources`](/api/reference/wxt/interfaces/InlineConfig#includesources) option. Be careful to not include any secrets in your `.env` files.

See Issue [#377](https://github.com/wxt-dev/wxt/issues/377) for more details.
:::

#### Private Packages

If you use private packages and you don't want to provide your auth token to the Firefox team during the review process, you can use `zip.downloadPackages` to download any private packages and include them in the zip.

```ts [wxt.config.ts]
export default defineConfig({
  zip: {
    downloadPackages: [
      '@mycompany/some-package',
      //...
    ],
  },
});
```

Depending on your package manager, the `package.json` in the sources zip will be modified to use the downloaded dependencies via the `overrides` or `resolutions` field.

:::warning
WXT uses the command `npm pack <package-name>` to download the package. That means regardless of your package manager, you need to properly setup a `.npmrc` file. NPM and PNPM both respect `.npmrc` files, but Yarn and Bun have their own ways of authorizing private registries, so you'll need to add a `.npmrc` file.
:::

### Safari

> 🚧 Not supported yet

WXT does not currently support automated publishing for Safari. Safari extensions require a native MacOS or iOS app wrapper, which WXT does not create yet. For now, if you want to publish to Safari, follow this guide:

- [Converting a web extension for Safari](https://developer.apple.com/documentation/safariservices/safari_web_extensions/converting_a_web_extension_for_safari) - "Convert your existing extension to a Safari web extension using Xcode’s command-line tool."

When running the `safari-web-extension-converter` CLI tool, pass the `.output/safari-mv2` or `.output/safari-mv3` directory, not your source code directory.

```sh
pnpm wxt build -b safari
xcrun safari-web-extension-converter .output/safari-mv2
```

### Edge Addons

> ✅ Supported &bull; [Developer Dashboard](https://aka.ms/PartnerCenterLogin) &bull; [Publishing Docs](https://learn.microsoft.com/en-us/microsoft-edge/extensions-chromium/publish/publish-extension)

No need to create a specific ZIP for Edge. If you're already publishing to the Chrome Web Store, you can reuse your Chrome ZIP.

However, if you have features specifically for Edge, create a separate ZIP with:

```sh
wxt zip -b edge
```
````

## File: docs/guide/essentials/remote-code.md
````markdown
# Remote Code

WXT will automatically download and bundle imports with the `url:` prefix so the extension does not depend on remote code, [a requirement from Google for MV3](https://developer.chrome.com/docs/extensions/migrating/improve-security/#remove-remote-code).

## Google Analytics

For example, you can import Google Analytics:

```ts
// utils/google-analytics.ts
import 'url:https://www.googletagmanager.com/gtag/js?id=G-XXXXXX';

window.dataLayer = window.dataLayer || [];
// NOTE: This line is different from Google's documentation
window.gtag = function () {
  dataLayer.push(arguments);
};
gtag('js', new Date());
gtag('config', 'G-XXXXXX');
```

Then you can import this in your HTML files to enable Google Analytics:

```ts
// popup/main.ts
import '~/utils/google-analytics';

gtag('event', 'event_name', {
  key: 'value',
});
```
````

## File: docs/guide/essentials/scripting.md
````markdown
# Scripting

[Chrome Docs](https://developer.chrome.com/docs/extensions/reference/api/scripting) • [Firefox Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/scripting)

Refer to the browser docs above for basics on how the API works.

## Execute Script Return Values

When using `browser.scripting.executeScript`, you can execute content scripts or unlisted scripts. To return a value, just return a value from the script's `main` function.

```ts
// entrypoints/background.ts
const res = await browser.scripting.executeScript({
  target: { tabId },
  files: ['content-scripts/example.js'],
});
console.log(res); // "Hello John!"
```

```ts
// entrypoints/example.content.ts
export default defineContentScript({
  registration: 'runtime',
  main(ctx) {
    console.log('Script was executed!');
    return 'Hello John!';
  },
});
```
````

## File: docs/guide/essentials/storage.md
````markdown
# Storage

[Chrome Docs](https://developer.chrome.com/docs/extensions/reference/api/storage) • [Firefox Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage)

You can use the vanilla APIs (see docs above), use [WXT's built-in storage API](/storage), or install a package from NPM.

## Alternatives

1. [`wxt/utils/storage`](/storage) (recommended): WXT ships with its own wrapper around the vanilla storage APIs that simplifies common use cases

2. DIY: If you're migrating to WXT and already have a storage wrapper, keep using it. In the future, if you want to delete that code, you can use one of these alternatives, but there's no reason to replace working code during a migration.

3. Any other NPM package: [There are lots of wrappers around the storage API](https://www.npmjs.com/search?q=chrome%20storage), you can find one you like. Here's some popular ones:
   - [`webext-storage`](https://www.npmjs.com/package/webext-storage) - A more usable typed storage API for Web Extensions
   - [`@webext-core/storage`](https://www.npmjs.com/package/@webext-core/storage) - A type-safe, localStorage-esque wrapper around the web extension storage APIs
````

## File: docs/guide/essentials/target-different-browsers.md
````markdown
# Targeting Different Browsers

When building an extension with WXT, you can create multiple builds of your extension targeting different browsers and manifest versions.

## Target a Browser

Use the `-b` CLI flag to create a separate build of your extension for a specific browser. By default, `chrome` is targeted.

```sh
wxt            # same as: wxt -b chrome
wxt -b firefox
wxt -b custom
```

During development, if you target Firefox, Firefox will open. All other strings open Chrome by default. To customize which browsers open, see [Set Browser Binaries](/guide/essentials/config/browser-startup#set-browser-binaries).

Additionally, WXT defines several constants you can use at runtime to detect which browser is in use:

```ts
if (import.meta.env.BROWSER === 'firefox') {
  console.log('Do something only in Firefox builds');
}
if (import.meta.env.FIREFOX) {
  // Shorthand, equivalent to the if-statement above
}
```

Read about [Built-in Environment Variables](/guide/essentials/config/environment-variables.html#built-in-environment-variables) for more details.

## Target a Manifest Version

To target specific manifest versions, use the `--mv2` or `--mv3` CLI flags.

:::tip Default Manifest Version
By default, WXT will target MV2 for Safari and Firefox and MV3 for all other browsers.
:::

Similar to the browser, you can get the target manifest version at runtime using the [built-in environment variable](/guide/essentials/config/environment-variables.html#built-in-environment-variables):

```ts
if (import.meta.env.MANIFEST_VERSION === 2) {
  console.log('Do something only in MV2 builds');
}
```

## Filtering Entrypoints

Every entrypoint can be included or excluded when targeting specific browsers via the `include` and `exclude` options.

Here are some examples:

- Content script only built when targeting `firefox`:

  ```ts
  export default defineContentScript({
    include: ['firefox'],

    main(ctx) {
      // ...
    },
  });
  ```

- HTML file only built for all targets other than `chrome`:
  ```html
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="manifest.exclude" content="['chrome', ...]" />
    </head>
    <body>
      <!-- ... -->
    </body>
  </html>
  ```

Alternatively, you can use the [`filterEntrypoints` config](/api/reference/wxt/interfaces/InlineConfig#filterentrypoints) to list all the entrypoints you want to build.
````

## File: docs/guide/essentials/testing-updates.md
````markdown
# Testing Updates

## Testing Permission Changes

When `permissions`/`host_permissions` change during an update, depending on what exactly changed, the browser will disable your extension until the user accepts the new permissions.

You can test if your permission changes will result in a disabled extension:

- Chromium: Use [Google's Extension Update Testing tool](https://github.com/GoogleChromeLabs/extension-update-testing-tool)
- Firefox: See their [Test Permission Requests](https://extensionworkshop.com/documentation/develop/test-permission-requests/) page
- Safari: Everyone breaks something in production eventually... 🫡 Good luck soldier

## Update Event

You can setup a callback that runs after your extension updates like so:

```ts
browser.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'update') {
    // Do something
  }
});
```

If the logic is simple, write a unit test to cover this logic. If you feel the need to manually test this callback, you can either:

1. In dev mode, remove the `if` statement and reload the extension from `chrome://extensions`
2. Use [Google's Extension Update Testing tool](https://github.com/GoogleChromeLabs/extension-update-testing-tool)
````

## File: docs/guide/essentials/unit-testing.md
````markdown
# Unit Testing

[[toc]]

## Vitest

WXT provides first class support for Vitest for unit testing:

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import { WxtVitest } from 'wxt/testing';

export default defineConfig({
  plugins: [WxtVitest()],
});
```

This plugin does several things:

- Polyfills the extension API, `browser`, with an in-memory implementation using [`@webext-core/fake-browser`](https://webext-core.aklinker1.io/fake-browser/installation)
- Adds all vite config or plugins in `wxt.config.ts`
- Configures auto-imports (if enabled)
- Applies internal WXT vite plugins for things like [bundling remote code](/guide/essentials/remote-code)
- Sets up global variables provided by WXT (`import.meta.env.BROWSER`, `import.meta.env.MANIFEST_VERSION`, `import.meta.env.IS_CHROME`, etc)
- Configures aliases (`@/*`, `@@/*`, etc) so imports can be resolved

Here are real projects with unit testing setup. Look at the code and tests to see how they're written.

- [`aklinker1/github-better-line-counts`](https://github.com/aklinker1/github-better-line-counts)
- [`wxt-dev/examples`'s Vitest Example](https://github.com/wxt-dev/examples/tree/main/examples/vitest-unit-testing)

### Example Tests

This example demonstrates that you don't have to mock `browser.storage` (used by `wxt/utils/storage`) in tests - [`@webext-core/fake-browser`](https://webext-core.aklinker1.io/fake-browser/installation) implements storage in-memory so it behaves like it would in a real extension!

```ts
import { describe, it, expect } from 'vitest';
import { fakeBrowser } from 'wxt/testing';

const accountStorage = storage.defineItem<Account>('local:account');

async function isLoggedIn(): Promise<Account> {
  const value = await accountStorage.getValue();
  return value != null;
}

describe('isLoggedIn', () => {
  beforeEach(() => {
    // See https://webext-core.aklinker1.io/fake-browser/reseting-state
    fakeBrowser.reset();
  });

  it('should return true when the account exists in storage', async () => {
    const account: Account = {
      username: '...',
      preferences: {
        // ...
      },
    };
    await accountStorage.setValue(account);

    expect(await isLoggedIn()).toBe(true);
  });

  it('should return false when the account does not exist in storage', async () => {
    await accountStorage.deleteValue();

    expect(await isLoggedIn()).toBe(false);
  });
});
```

### Mocking WXT APIs

First, you need to understand how the `#imports` module works. When WXT (and vitest) sees this import during a preprocessing step, the import is replaced with multiple imports pointing to their "real" import path.

For example, this is what your write in your source code:

```ts
// What you write
import { injectScript, createShadowRootUi } from '#imports';
```

But Vitest sees this:

```ts
import { injectScript } from 'wxt/utils/inject-script';
import { createShadowRootUi } from 'wxt/utils/content-script-ui/shadow-root';
```

So in this case, if you wanted to mock `injectScript`, you need to pass in `"wxt/utils/inject-script"`, not `"#imports"`.

```ts
vi.mock("wxt/utils/inject-script", () => ({
  injectScript: ...
}))
```

Refer to your project's `.wxt/types/imports-module.d.ts` file to lookup real import paths for `#imports`. If the file doesn't exist, run [`wxt prepare`](/guide/essentials/config/typescript).

## Other Testing Frameworks

To use a different framework, you will likely have to disable auto-imports, setup import aliases, manually mock the extension APIs, and setup the test environment to support all of WXT's features that you use.

It is possible to do, but will require a bit more setup. Refer to Vitest's setup for an example of how to setup a test environment:

https://github.com/wxt-dev/wxt/blob/main/packages/wxt/src/testing/wxt-vitest-plugin.ts
````

## File: docs/guide/essentials/wxt-modules.md
````markdown
# WXT Modules

WXT provides a "module system" that let's you run code at different steps in the build process to modify it.

[[toc]]

## Adding a Module

There are two ways to add a module to your project:

1. **NPM**: install an NPM package, like [`@wxt-dev/auto-icons`](https://www.npmjs.com/package/@wxt-dev/auto-icons) and add it to your config:
   ```ts [wxt.config.ts]
   export default defineConfig({
     modules: ['@wxt-dev/auto-icons'],
   });
   ```
   > Searching for ["wxt module"](https://www.npmjs.com/search?q=wxt%20module) on NPM is a good way to find published WXT modules.
2. **Local**: add a file to your project's `modules/` directory:
   ```
   <rootDir>/
     modules/
       my-module.ts
   ```
   > To learn more about writing your own modules, read the [Writing Modules](/guide/essentials/wxt-modules) docs.

## Module Options

WXT modules may require or allow setting custom options to change their behavior. There are two types of options:

1. **Build-time**: Any config used during the build process, like feature flags
2. **Runtime**: Any config accessed at runtime, like callback functions

Build-time options are placed in your `wxt.config.ts`, while runtime options is placed in the [`app.config.ts` file](/guide/essentials/config/runtime). Refer to each module's documentation about what options are required and where they should be placed.

If you use TypeScript, modules augment WXT's types so you will get type errors if options are missing or incorrect.

## Execution Order

Modules are loaded in the same order as hooks are executed. Refer to the [Hooks documentation](/guide/essentials/config/hooks#execution-order) for more details.

## Writing Modules

Here's what a basic WXT module looks like:

```ts
import { defineWxtModule } from 'wxt/modules';

export default defineWxtModule({
  setup(wxt) {
    // Your module code here...
  },
});
```

Each module's setup function is executed after the `wxt.config.ts` file is loaded. The `wxt` object provides everything you need to write a module:

- Use `wxt.hook(...)` to hook into the build's lifecycle and make changes
- Use `wxt.config` to get the resolved config from the project's `wxt.config.ts` file
- Use `wxt.logger` to log messages to the console
- and more!

Refer to the [API reference](/api/reference/wxt/interfaces/Wxt) for a complete list of properties and functions available.

Also to make sure and read about all the [hooks that are available](https://wxt.dev/api/reference/wxt/interfaces/WxtHooks) - they are essential to writing modules.

### Recipes

Modules are complex and require a deeper understanding of WXT's code and how it works. The best way to learn is by example.

#### Update resolved config

```ts
import { defineWxtModule } from 'wxt/modules';

export default defineWxtModule({
  setup(wxt) {
    wxt.hook('config:resolved', () => {
      wxt.config.outDir = 'dist';
    });
  },
});
```

#### Add built-time config

```ts
import { defineWxtModule } from 'wxt/modules';
import 'wxt';

export interface MyModuleOptions {
  // Add your build-time options here...
}
declare module 'wxt' {
  export interface InlineConfig {
    // Add types for the "myModule" key in wxt.config.ts
    myModule: MyModuleOptions;
  }
}

export default defineWxtModule<AnalyticModuleOptions>({
  configKey: 'myModule',

  // Build time config is available via the second argument of setup
  setup(wxt, options) {
    console.log(options);
  },
});
```

#### Add runtime config

```ts
import { defineWxtModule } from 'wxt/modules';
import 'wxt/utils/define-app-config';

export interface MyModuleRuntimeOptions {
  // Add your runtime options here...
}
declare module 'wxt/utils/define-app-config' {
  export interface WxtAppConfig {
    myModule: MyModuleOptions;
  }
}
```

Runtime options are returned when calling

```ts
const config = useAppConfig();
console.log(config.myModule);
```

This is very useful when [generating runtime code](#generate-runtime-module).

#### Generate output file

```ts
import { defineWxtModule } from 'wxt/modules';

export default defineWxtModule({
  setup(wxt) {
    // Relative to the output directory
    const generatedFilePath = 'some-file.txt';

    wxt.hook('build:publicAssets', (_, assets) => {
      assets.push({
        relativeDest: generatedFilePath,
        contents: 'some generated text',
      });
    });

    wxt.hook('build:manifestGenerated', (_, manifest) => {
      manifest.web_accessible_resources ??= [];
      manifest.web_accessible_resources.push({
        matches: ['*://*'],
        resources: [generatedFilePath],
      });
    });
  },
});
```

This file could then be loaded at runtime:

```ts
const res = await fetch(browser.runtime.getURL('/some-text.txt'));
```

#### Add custom entrypoints

Once the existing files under the `entrypoints/` directory have been discovered, the `entrypoints:found` hook can be used to add custom entrypoints.

:::info
The `entrypoints:found` hook is triggered before validation is carried out on the list of entrypoints. Thus, any custom entrypoints will still be checked for duplicate names and logged during debugging.
:::

```ts
import { defineWxtModule } from 'wxt/modules';

export default defineWxtModule({
  setup(wxt) {
    wxt.hook('entrypoints:found', (_, entrypointInfos) => {
      // Add your new entrypoint
      entrypointInfos.push({
        name: 'my-custom-script',
        inputPath: 'path/to/custom-script.js',
        type: 'content-script',
      });
    });
  },
});
```

#### Generate runtime module

Create a file in `.wxt`, add an alias to import it, and add auto-imports for exported variables.

```ts
import { defineWxtModule } from 'wxt/modules';
import { resolve } from 'node:path';

export default defineWxtModule({
  imports: [
    // Add auto-imports
    { from: '#analytics', name: 'analytics' },
    { from: '#analytics', name: 'reportEvent' },
    { from: '#analytics', name: 'reportPageView' },
  ],

  setup(wxt) {
    const analyticsModulePath = resolve(
      wxt.config.wxtDir,
      'analytics/index.ts',
    );
    const analyticsModuleCode = `
      import { createAnalytics } from 'some-module';

      export const analytics = createAnalytics(useAppConfig().analytics);
      export const { reportEvent, reportPageView } = analytics;
    `;

    addAlias(wxt, '#analytics', analyticsModulePath);

    wxt.hook('prepare:types', async (_, entries) => {
      entries.push({
        path: analyticsModulePath,
        text: analyticsModuleCode,
      });
    });
  },
});
```

#### Generate declaration file

```ts
import { defineWxtModule } from 'wxt/modules';
import { resolve } from 'node:path';

export default defineWxtModule({
  setup(wxt) {
    const typesPath = resolve(wxt.config.wxtDir, 'my-module/types.d.ts');
    const typesCode = `
      // Declare global types, perform type augmentation
    `;

    wxt.hook('prepare:types', async (_, entries) => {
      entries.push({
        path: 'my-module/types.d.ts',
        text: `
          // Declare global types, perform type augmentation, etc
        `,
        // IMPORTANT - without this line your declaration file will not be a part of the TS project:
        tsReference: true,
      });
    });
  },
});
```

### Example Modules

You should also look through the code of modules other people have written and published. Here's some examples:

- [`@wxt-dev/auto-icons`](https://github.com/wxt-dev/wxt/blob/main/packages/auto-icons)
- [`@wxt-dev/i18n`](https://github.com/wxt-dev/wxt/blob/main/packages/i18n)
- [`@wxt-dev/module-vue`](https://github.com/wxt-dev/wxt/blob/main/packages/module-vue)
- [`@wxt-dev/module-solid`](https://github.com/wxt-dev/wxt/blob/main/packages/module-solid)
- [`@wxt-dev/module-react`](https://github.com/wxt-dev/wxt/blob/main/packages/module-react)
- [`@wxt-dev/module-svelte`](https://github.com/wxt-dev/wxt/blob/main/packages/module-svelte)
````

## File: docs/guide/resources/community.md
````markdown
# Community

This page is dedicated to all the awesome people how have made something for WXT or that works with WXT. Blog posts, YouTube videos, NPM packages, etc. If a section doesn't exist for the thing you made, add one!

[[toc]]

## Blog Posts

- [Building Modern Cross Browser Web Extensions](https://aabidk.dev/tags/wxt/) by Aabid ([@aabidk20](https://github.com/aabidk20))

## NPM Packages

- [`@webext-core/*`](https://webext-core.aklinker1.io/): Easy-to-use utilities for writing and testing web extensions that work on all browsers.
- [`Comctx`](https://github.com/molvqingtai/comctx): Cross-context RPC solution with type safety and flexible adapters.
````

## File: docs/guide/resources/compare.md
````markdown
# Compare

Lets compare the features of WXT vs [Plasmo](https://docs.plasmo.com/framework) (another framework) and [CRXJS](https://crxjs.dev/vite-plugin) (a bundler plugin).

## Overview

- ✅ - Full support
- 🟡 - Partial support
- ❌ - No support

| Features                                                |   WXT   | Plasmo  |  CRXJS  |
| ------------------------------------------------------- | :-----: | :-----: | :-----: |
| Maintained                                              |   ✅    | 🟡 [^n] | 🟡 [^m] |
| Supports all browsers                                   |   ✅    |   ✅    | 🟡 [^j] |
| MV2 Support                                             |   ✅    |   ✅    | 🟡 [^a] |
| MV3 Support                                             |   ✅    |   ✅    | 🟡 [^a] |
| Create Extension ZIPs                                   |   ✅    |   ✅    |   ❌    |
| Create Firefox Sources ZIP                              |   ✅    |   ❌    |   ❌    |
| First-class TypeScript support                          |   ✅    |   ✅    |   ✅    |
| Entrypoint discovery                                    | ✅ [^b] | ✅ [^b] |   ❌    |
| Inline entrypoint config                                |   ✅    |   ✅    | ❌ [^i] |
| Auto-imports                                            |   ✅    |   ❌    |   ❌    |
| Reusable module system                                  |   ✅    |   ❌    |   ❌    |
| Supports all frontend frameworks                        |   ✅    | 🟡 [^c] |   ✅    |
| Framework specific entrypoints (like `Popup.tsx`)       | 🟡 [^d] | ✅ [^e] |   ❌    |
| Automated publishing                                    |   ✅    |   ✅    |   ❌    |
| Remote Code Bundling (Google Analytics)                 |   ✅    |   ✅    |   ❌    |
| Unlisted HTML Pages                                     |   ✅    |   ✅    |   ✅    |
| Unlisted Scripts                                        |   ✅    |   ❌    |   ❌    |
| ESM Content Scripts                                     | ❌ [^l] |   ❌    |   ✅    |
| <strong style="opacity: 50%">Dev Mode</strong>          |         |         |         |
| `.env` Files                                            |   ✅    |   ✅    |   ✅    |
| Opens browser with extension installed                  |   ✅    |   ❌    |   ❌    |
| HMR for UIs                                             |   ✅    | 🟡 [^f] |   ✅    |
| Reload HTML Files on Change                             |   ✅    | 🟡 [^g] |   ✅    |
| Reload Content Scripts on Change                        |   ✅    | 🟡 [^g] |   ✅    |
| Reload Background on Change                             | 🟡 [^g] | 🟡 [^g] | 🟡 [^g] |
| Respects Content Script `run_at`                        |   ✅    |   ✅    | ❌ [^h] |
| <strong style="opacity: 50%">Built-in Wrappers</strong> |         |         |         |
| Storage                                                 |   ✅    |   ✅    | ❌ [^k] |
| Messaging                                               | ❌ [^k] |   ✅    | ❌ [^k] |
| Content Script UI                                       |   ✅    |   ✅    | ❌ [^k] |
| I18n                                                    |   ✅    |   ❌    |   ❌    |

[^a]: Either MV2 or MV3, not both.

[^b]: File based.

[^c]: Only React, Vue, and Svelte.

[^d]: `.html`, `.ts`, `.tsx`.

[^e]: `.html`, `.ts`, `.tsx`, `.vue`, `.svelte`.

[^f]: React only.

[^g]: Reloads entire extension.

[^h]: ESM-style loaders run asynchronously.

[^i]: Entrypoint options all configured in `manifest.json`.

[^j]: As of `v2.0.0-beta.23`, but v2 stable hasn't been released yet.

[^k]: There is no built-in wrapper around this API. However, you can still access the standard APIs via `chrome`/`browser` globals or use any 3rd party NPM package.

[^l]: WIP, moving very slowly. Follow [wxt-dev/wxt#357](https://github.com/wxt-dev/wxt/issues/357) for updates.

[^m]: See [crxjs/chrome-extension-tools#974](https://github.com/crxjs/chrome-extension-tools/discussions/974)

[^n]: Appears to be in maintenance mode with little to no maintainers nor feature development happening and _(see [wxt-dev/wxt#1404 (comment)](https://github.com/wxt-dev/wxt/pull/1404#issuecomment-2643089518))_
````

## File: docs/guide/resources/faq.md
````markdown
---
outline: false
---

# FAQ

Commonly asked questions about how to use WXT or why it behaves the way it does.

[[toc]]

## Why aren't content scripts added to the manifest?

During development, WXT registers content scripts dynamically so they can be reloaded individually when a file is saved without reloading your entire extension.

To list the content scripts registered during development, open the service worker's console and run:

```js
await chrome.scripting.getRegisteredContentScripts();
```

## How do I disable opening the browser automatically during development?

See https://wxt.dev/guide/essentials/config/browser-startup.html#disable-opening-browser

## How do I stay logged into a website during development?

See https://wxt.dev/guide/essentials/config/browser-startup.html#persist-data

## My component library doesn't work in content scripts!

This is usually caused by one of two things (or both) when using `createShadowRootUi`:

1. Styles are added outside the `ShadowRoot`

   :::details
   Some component libraries manually add CSS to the page by adding a `<style>` or `<link>` element. They place this element in the document's `<head>` by default. This causes your styles to be placed outside the `ShadowRoot` and it's isolation blocks the styles from being applied to your UI.

   When a library does this, **you need to tell the library where to put its styles**. Here's the documentation for a few popular component libraries:

   - Ant Design: [`StyleProvider`](https://ant.design/docs/react/compatible-style#shadow-dom-usage)
   - Mantine: [`MantineProvider#getRootElement` and `MantineProvider#cssVariablesSelector`](https://mantine.dev/theming/mantine-provider/)

   > If your library isn't listed above, try searching it's docs/issues for "shadow root", "shadow dom", or "css container". Not all libraries support shadow DOMs, you may have to open an issue to request this feature.

   Here's an example of configuring Antd's styles:

   ```tsx
   import { StyleProvider } from '@ant-design/cssinjs';
   import ReactDOM from 'react-dom/client';
   import App from './App.tsx';

   const ui = await create`ShadowRoot`Ui(ctx, {
     // ...
     onMount: (container, shadow) => {
       const cssContainer = shadow.querySelector('head')!;
       const root = ReactDOM.createRoot(container);
       root.render(
         <StyleProvider container={cssContainer}>
           <App />
         </StyleProvider>,
       );
       return root;
     },
   });
   ```

   :::

2. UI elements are added outside the `ShadowRoot`

   ::::::details
   This is mostly caused by `Teleport` or `Portal` components that render an element somewhere else in the DOM, usually in the document's `<body>`. This is usually done for dialogs or popover components. This renders the element is outside the `ShadowRoot`, so styles are not applied to it.

   To fix this, **you need to both provide a target to your app AND pass the target to the `Teleport`/`Portal`**.

   First, store the reference to the `ShadowRoot`'s `<body>` element (not the document's `<body>`):

   :::code-group

   ```ts [Vue]
   import { createApp } from 'vue';
   import App from './App.vue';

   const ui = await create`ShadowRoot`Ui(ctx, {
     // ...
     onMount: (container, shadow) => {
       const teleportTarget = shadow.querySelector('body')!;
       const app = createApp(App)
         .provide('TeleportTarget', teleportTarget)
         .mount(container);
       return app;
     },
   });
   ui.mount();
   ```

   ```tsx [React]
   // hooks/PortalTargetContext.ts
   import { createContext } from 'react';

   export const PortalTargetContext = createContext<HTMLElement>();

   // entrypoints/example.content.ts
   import ReactDOM from 'react-dom/client';
   import App from './App.tsx';
   import PortalTargetContext from '~/hooks/PortalTargetContext';

   const ui = await create`ShadowRoot`Ui(ctx, {
     // ...
     onMount: (container, shadow) => {
       const portalTarget = shadow.querySelector('body')!;
       const root = ReactDOM.createRoot(container);
       root.render(
         <PortalTargetContext.Provider value={portalTarget}>
           <App />
         </PortalTargetContext.Provider>,
       );
       return root;
     },
   });
   ui.mount();
   ```

   :::

   Then use the reference when teleporting/portaling part of your UI to a different place in the DOM:

   :::code-group

   ```vue [Vue]
   <script lang="ts" setup>
   import { Teleport } from 'vue';

   const teleportTarget = inject('TeleportTarget');
   </script>

   <template>
     <div>
       <Teleport :to="teleportTarget">
         <dialog>My dialog</dialog>
       </Teleport>
     </div>
   </template>
   ```

   ```tsx [React]
   import { useContext } from 'react';
   import { createPortal } from 'react-dom';
   import PortalTargetContext from '~/hooks/PortalTargetContext';

   const MyComponent = () => {
     const portalTarget = useContext(PortalTargetContext);

     return <div>{createPortal(<dialog>My dialog</dialog>, portalTarget)}</div>;
   };
   ```

   :::

   If you use ShadCN, [see this blog post](https://aabidk.dev/blog/building-modern-cross-browser-web-extensions-content-scripts-and-ui/#using-radixui-portals-to-move-the-dialog-to-shadow-dom).

   ::::::

Both issues have the same cause: the library puts something outside the `ShadowRoot`, and the `ShadowRoot`'s isolation prevents CSS from being applied to your UI.

Both issues have the same fix: tell the library to put elements inside the `ShadowRoot`, not outside it. See the details above for more information and example fixes for each problem.

## Is there an LLM trained on WXT's docs that I chat with?

Yes! There's a "Ask AI" button in the bottom right of the page, try it out! Or visit https://knowledge.wxt.dev/ for a fullscreen experience.

Additionally, if you want to train your own model or provide context to your editor, you can use the LLM knowledge files hosted by the site:

https://wxt.dev/knowledge/index.json

You don't need to crawl the entire website, these files already contain all the relevant docs for training a LLM on WXT. But feel free to crawl it and generate your own files if you want!

## How do I run my WXT project with docker / [devcontainers](https://containers.dev)?

To run the WXT dev server in a devcontainer, but load the dev build of your extension in your browser:

1. **Bind-mount your project directory to your host**  
   If you're using VS Code, you can open your project folder with the `Dev Containers: Open Folder in Container...` command. This keeps the folder synchronized between your host and the devcontainer, ensuring that the extension `dist` directory remains accessible from the host.

2. **Disable auto-opening the browser**  
   WXT automatically opens your browser during development, but since you're running inside a container, it won't be able to access it. Follow the instructions [here](https://wxt.dev/guide/essentials/config/browser-startup.html#disable-opening-browser) to disable browser auto-opening in your `wxt.config.ts`.

3. **Tell WXT to listen on all network interfaces**  
   To enable hot-reloading, your extension has to connect to the WXT dev server running inside your container. WXT will only listen on `localhost` by default, which prevents connections from outside the devcontainer. To fix this you can instruct WXT to listen on all interfaces with `wxt --host 0.0.0.0`.
````

## File: docs/guide/resources/how-wxt-works.md
````markdown
# How WXT Works

:::warning 🚧 Under construction
These docs will be coming soon!
:::
````

## File: docs/guide/resources/migrate.md
````markdown
---
outline: deep
---

# Migrate to WXT

> If you have problems migrating to WXT, feel free to ask for help in GitHub by [starting a discussion](https://github.com/wxt-dev/wxt/discussions/new?category=q-a) or in [Discord](https://discord.gg/ZFsZqGery9)!

## Overview

Always start by generating a new vanilla project and merging it into your project one file at a time.

```sh
cd path/to/your/project
pnpm dlx wxt@latest init example-wxt --template vanilla
```

In general, you'll need to:

&ensp;<input type="checkbox" /> Install `wxt`<br />
&ensp;<input type="checkbox" /> [Extend `.wxt/tsconfig.json`](/guide/essentials/config/typescript#typescript-configuration) in your project's `tsconfig.json`<br />
&ensp;<input type="checkbox" /> Update/create `package.json` scripts to use `wxt` (don't forget about `postinstall`)<br />
&ensp;<input type="checkbox" /> Move entrypoints into `entrypoints/` directory<br />
&ensp;<input type="checkbox" /> Move assets into either the `assets/` or `public/` directories<br />
&ensp;<input type="checkbox" /> Move `manifest.json` content into `wxt.config.ts`<br />
&ensp;<input type="checkbox" /> Convert custom import syntax to be compatible with Vite<br />
&ensp;<input type="checkbox" /> Add a default export to JS entrypoints (`defineBackground`, `defineContentScript`, or `defineUnlistedScript`)<br />
&ensp;<input type="checkbox" /> Use the `browser` global instead of `chrome`<br />
&ensp;<input type="checkbox" /> ⚠️ Compare final `manifest.json` files, making sure permissions and host permissions are unchanged<br/>
:::warning
If your extension is already live on the Chrome Web Store, use [Google's update testing tool](https://github.com/GoogleChromeLabs/extension-update-testing-tool) to make sure no new permissions are being requested.
:::

Every project is different, so there's no one-solution-fits-all to migrating your project. Just make sure `wxt dev` runs, `wxt build` results in a working extension, and the list of permissions in the `manifest.json` hasn't changed. If all that looks good, you've finished migrating your extension!

## Popular Tools/Frameworks

Here's specific steps for other popular frameworks/build tools.

### Plasmo

1. Install `wxt`
2. Move entrypoints into `entrypoints/` directory
   - For JS entrypoints, merge the named exports used to configure your JS entrypoints into WXT's default export
   - For HTML entrypoints, you cannot use JSX/Vue/Svelte files directly, you need to create an HTML file and manually create and mount your app. Refer to the [React](https://github.com/wxt-dev/wxt/tree/main/templates/react/entrypoints/popup), [Vue](https://github.com/wxt-dev/wxt/tree/main/templates/vue/entrypoints/popup), and [Svelte](https://github.com/wxt-dev/wxt/tree/main/templates/svelte/src/entrypoints/popup) templates as an example.
3. Move public `assets/*` into the `public/` directory
4. If you use CSUI, migrate to WXT's `createContentScriptUi`
5. Convert Plasmo's custom import resolutions to Vite's
6. If importing remote code via a URL, add a `url:` prefix so it works with WXT
7. Replace your [Plasmo tags](https://docs.plasmo.com/framework/workflows/build#with-a-custom-tag) (`--tag`) with [WXT build modes](/guide/essentials/config/build-mode) (`--mode`)
8. ⚠️ Compare the old production manifest to `.output/*/manifest.json`. They should have the same content as before. If not, tweak your entrypoints and config until they are the same.

### CRXJS

If you used CRXJS's vite plugin, it's a simple refactor! The main difference between CRXJS and WXT is how the tools decide which entrypoints to build. CRXJS looks at your `manifest` (and vite config for "unlisted" entries), while WXT looks at files in the `entrypoints` directory.

To migrate:

1. Move all entrypoints into the `entrypoints` directory, refactoring to WXT's style (TS files have a default export).
2. Move [entrypoint specific options out of the manifest](/guide/essentials/entrypoints#defining-manifest-options) and into the entrypoint files themselves (like content script `matches` or `run_at`).
3. Move any other `manifest.json` options [into the `wxt.config.ts` file](/guide/essentials/config/manifest), like permissions.
4. For simplicity, you'll probably want to [disable auto-imports](/guide/essentials/config/auto-imports#disabling-auto-imports) at first (unless you were already using them via `unimport` or `unplugin-auto-imports`). If you like the feature, you can enable it later once you've finished the migration.
5. Update your `package.json` to include all of [WXT's suggested scripts (see step 4)](/guide/installation#from-scratch)
6. Specifically, make sure you add the `"postinstall": "wxt prepare"` script to your `package.json`.
7. Delete your `vite.config.ts` file. Move any plugins into the `wxt.config.ts` file. If you use a frontend framework, [install the relevant WXT module](/guide/essentials/frontend-frameworks).
8. Update your typescript project. [Extend WXT's generated config](/guide/essentials/config/typescript), and [add any path aliases to your `wxt.config.ts` file](/guide/essentials/config/typescript#tsconfig-paths).
9. ⚠️ Compare the old production manifest to `.output/*/manifest.json`. They should have the same content as before. If not, tweak your entrypoints and config until they are the same.

Here's an example migration: [GitHub Better Line Counts - CRXJS &rarr; WXT](https://github.com/aklinker1/github-better-line-counts/commit/39d766d2ba86866efefc2e9004af554ee434e2a8)

### `vite-plugin-web-extension`

Since you're already using Vite, it's a simple refactor.

1. Install `wxt`
2. Move and refactor your entrypoints to WXT's style (with a default export)
3. Update package.json scripts to use `wxt`
4. Add `"postinstall": "wxt prepare"` script
5. Move the `manifest.json` into `wxt.config.ts`
6. Move any custom settings from `vite.config.ts` into `wxt.config.ts`'s
7. ⚠️ Compare the old production manifest to `.output/*/manifest.json`. They should have the same content as before. If not, tweak your entrypoints and config until they are the same.
````

## File: docs/guide/resources/upgrading.md
````markdown
---
outline: deep
---

# Upgrading WXT

## Overview

To upgrade WXT to the latest major version:

1. Install it, skipping scripts so `wxt prepare` doesn't run - it will probably throw an error after a major version change (we'll run it later).
   ```sh
   pnpm i wxt@latest --ignore-scripts
   ```
2. Follow the upgrade steps below to fix any breaking changes.
3. Run `wxt prepare`. It should succeed and type errors will go away afterwords.
   ```sh
   pnpm wxt prepare
   ```
4. Manually test to make sure both dev mode and production builds work.

For minor or patch version updates, there are no special steps. Just update it with your package manager:

```sh
pnpm i wxt@latest
```

---

Listed below are all the breaking changes you should address when upgrading to a new version of WXT.

Currently, WXT is in pre-release. This means changes to the second digit, `v0.X`, are considered major and have breaking changes. Once v1 is released, only major version bumps will have breaking changes.

## v0.19.0 &rarr; v0.20.0

v0.20 is a big release! There are lots of breaking changes because this version is intended to be a release candidate for v1.0. If all goes well, v1.0 will be released with no additional breaking changes.

:::tip
Read through all the changes once before updating your code.
:::

### `webextension-polyfill` Removed

WXT's `browser` no longer uses the `webextension-polyfill`!

:::details Why?
See https://github.com/wxt-dev/wxt/issues/784
:::

To upgrade, you have two options:

1. **Stop using the polyfill** - No changes necessary, though you may want to do some manual testing to make sure everything continues to work. None of the early testers of this feature reported any runtime issues once they stopped using the polyfill.
   - If you're already using `extensionApi: "chrome"`, then you don't need to test anything! You're already using the same `browser` object v0.20 provides by default.
2. **Continue using the polyfill** - If you want to keep using the polyfill, you can! One less thing to worry about during this upgrade.
   - Install `webextension-polyfill` and WXT's [new polyfill module](https://www.npmjs.com/package/@wxt-dev/webextension-polyfill):
     ```sh
     pnpm i webextension-polyfill @wxt-dev/webextension-polyfill
     ```
   - Add the WXT module to your config:
     ```ts [wxt.config.ts]
     export default defineConfig({
       modules: ['@wxt-dev/webextension-polyfill'],
     });
     ```

The new `browser` object (and types) is backed by WXT's new package: [`@wxt-dev/browser`](https://www.npmjs.com/package/@wxt-dev/browser). This package continues WXT's mission of providing useful packages for the whole community. Just like [`@wxt-dev/storage`](https://www.npmjs.com/package/@wxt-dev/storage), [`@wxt-dev/i18n`](https://www.npmjs.com/package/@wxt-dev/i18n), [`@wxt-dev/analytics`](https://www.npmjs.com/package/@wxt-dev/analytics), it is designed to be easy to use in any web extension project, not just those using WXT, and provides a consistent API across all browsers and manifest versions.

### `extensionApi` Config Removed

The `extensionApi` config has been removed. Before, this config provided a way to opt into using the new `browser` object prior to v0.20.0.

Remove it from your `wxt.config.ts` file if present:

```ts [wxt.config.ts]
export default defineConfig({
  extensionApi: 'chrome', // [!code --]
});
```

### Extension API Type Changes

With the new `browser` introduced in v0.20, how you access types has changed. WXT now provides types based on `@types/chrome` instead of `@types/webextension-polyfill`.

These types are more up-to-date with MV3 APIs, contain less bugs, are better organized, and don't have any auto-generated names.

To access types, use the new `Browser` namespace from `wxt/browser`:

<!-- prettier-ignore -->
```ts
import type { Runtime } from 'wxt/browser'; // [!code --]
import type { Browser } from 'wxt/browser'; // [!code ++]

function getMessageSenderUrl(sender: Runtime.MessageSender): string { // [!code --]
function getMessageSenderUrl(sender: Browser.runtime.MessageSender): string { // [!code ++]
  // ...
}
```

> If you use auto-imports, `Browser` will be available without manually importing it.

Not all type names will be the same as what `@types/webextension-polyfill` provides. You'll have to find the new type names by looking at the types of the `browser.*` API's you use.

### `public/` and `modules/` Directories Moved

The default location for the `public/` and `modules/` directories have changed to better align with standards set by other frameworks (Nuxt, Next, Astro, etc). Now, each path is relative to the project's **root directory**, not the src directory.

- If you follow the default folder structure, you don't need to make any changes.
- If you set a custom `srcDir`, you have two options:
  1.  Move the your `public/` and `modules/` directories to the project root:
      <!-- prettier-ignore -->
      ```html
      📂 {rootDir}/
         📁 modules/ <!-- [!code ++] -->
         📁 public/ <!-- [!code ++] -->
         📂 src/
            📁 components/
            📁 entrypoints/
            📁 modules/ <!-- [!code --] -->
            📁 public/ <!-- [!code --] -->
            📁 utils/
            📄 app.config.ts
         📄 wxt.config.ts
      ```
  2.  Keep the folders in the same place and update your project config:
      ```ts [wxt.config.ts]
      export default defineConfig({
        srcDir: 'src',
        publicDir: 'src/public', // [!code ++]
        modulesDir: 'src/modules', // [!code ++]
      });
      ```

### Import Path Changes and `#imports`

The APIs exported by `wxt/sandbox`, `wxt/client`, or `wxt/storage` have moved to individual exports under the `wxt/utils/*` path.

:::details Why?
As WXT grows and more utilities are added, any helper with side-effects will not be tree-shaken out of your final bundle.

This can cause problems because not every API used by these side-effects is available in every type of entrypoint. Some APIs can only be used in the background, sandboxed pages can't use any extension API, etc. This was leading to JS throwing errors in the top-level scope, preventing your code from running.

Splitting each util into it's own module solves this problem, making sure you're only importing APIs and side-effects into entrypoints they can run in.
:::

Refer to the updated [API Reference](/api/reference/) to see the list of new import paths.

However, you don't need to memorize or learn the new import paths! v0.20 introduces a new virtual module, `#imports`, that abstracts all this away from developers. See the [blog post](/blog/2024-12-06-using-imports-module) for more details about how this module works.

So to upgrade, just replace any imports from `wxt/storage`, `wxt/client`, and `wxt/sandbox` with an import to the new `#imports` module:

```ts
import { storage } from 'wxt/storage'; // [!code --]
import { defineContentScript } from 'wxt/sandbox'; // [!code --]
import { ContentScriptContext, useAppConfig } from 'wxt/client'; // [!code --]
import { storage } from '#imports'; // [!code ++]
import { defineContentScript } from '#imports'; // [!code ++]
import { ContentScriptContext, useAppConfig } from '#imports'; // [!code ++]
```

You can combine the imports into a single import statement, but it's easier to just find/replace each statement.

```ts
import { storage } from 'wxt/storage'; // [!code --]
import { defineContentScript } from 'wxt/sandbox'; // [!code --]
import { ContentScriptContext, useAppConfig } from 'wxt/client'; // [!code --]
import {
  // [!code ++]
  storage, // [!code ++]
  defineContentScript, // [!code ++]
  ContentScriptContext, // [!code ++]
  useAppConfig, // [!code ++]
} from '#imports'; // [!code ++]
```

:::tip
Before types will work, you'll need to run `wxt prepare` after installing v0.20 to generate the new TypeScript declarations.
:::

### `createShadowRootUi` CSS Changes

WXT now resets styles inherited from the webpage (`visibility`, `color`, `font-size`, etc.) by setting `all: initial` inside the shadow root.

:::warning
This doesn't effect `rem` units. You should continue using `postcss-rem-to-px` or an equivalent library if the webpage sets the HTML element's `font-size`.
:::

If you use `createShadowRootUi`:

1. Remove any manual CSS overrides that reset the style of specific websites. For example:

   <!-- prettier-ignore -->
   ```css [entrypoints/reddit.content/style.css]
   body { /* [!code --] */
     /* Override Reddit's default "hidden" visibility on elements */ /* [!code --] */
     visibility: visible !important; /* [!code --] */
   } /* [!code --] */
   ```

2. Double check that your UI looks the same as before.

If you run into problems with the new behavior, you can disable it and continue using your current CSS:

```ts
const ui = await createShadowRootUi({
  inheritStyles: true, // [!code ++]
  // ...
});
```

### Default Output Directories Changed

The default value for the [`outDirTemplate`](/api/reference/wxt/interfaces/InlineConfig#outdirtemplate) config has changed. Now, different build modes are output to different directories:

- `--mode production` &rarr; `.output/chrome-mv3`: Production builds are unchanged
- `--mode development` &rarr; `.output/chrome-mv3-dev`: Dev mode now has a `-dev` suffix so it doesn't overwrite production builds
- `--mode custom` &rarr; `.output/chrome-mv3-custom`: Other custom modes end with a `-[mode]` suffix

To use the old behavior, writing all output to the same directory, set the `outDirTemplate` option:

```ts [wxt.config.ts]
export default defineConfig({
  outDirTemplate: '{{browser}}-mv{{manifestVersion}}', // [!code ++]
});
```

:::warning
If you've previously loaded the extension into your browser manually for development, you'll need to uninstall and re-install it from the new dev output directory.
:::

### Deprecated APIs Removed

- `entrypointLoader` option: WXT now uses `vite-node` for importing entrypoints during the build process.
  > This was deprecated in v0.19.0, see the [v0.19 section](#v0-18-5-rarr-v0-19-0) for migration steps.
- `transformManifest` option: Use the `build:manifestGenerated` hook to transform the manifest instead:
  <!-- prettier-ignore -->
  ```ts [wxt.config.ts]
  export default defineConfig({
    transformManifest(manifest) { // [!code --]
    hooks: { // [!code ++]
      'build:manifestGenerated': (_, manifest) => { // [!code ++]
         // ...
      }, // [!code ++]
    },
  });
  ```

### New Deprecations

#### `runner` APIs Renamed

To improve consistency with the `web-ext.config.ts` filename, the "runner" API and config options have been renamed. You can continue using the old names, but they have been deprecated and will be removed in a future version:

1. The `runner` option has been renamed to `webExt`:
   ```ts [wxt.config.ts]
   export default defineConfig({
     runner: { // [!code --]
     webExt: { // [!code ++]
       startUrls: ["https://wxt.dev"],
     },
   });
   ```
2. `defineRunnerConfig` has been renamed to `defineWebExtConfig`:
   ```ts [web-ext.config.ts]
   import { defineRunnerConfig } from 'wxt'; // [!code --]
   import { defineWebExtConfig } from 'wxt'; // [!code ++]
   ```
3. The `ExtensionRunnerConfig` type has been renamed to `WebExtConfig`
   ```ts
   import type { ExtensionRunnerConfig } from 'wxt'; // [!code --]
   import type { WebExtConfig } from 'wxt'; // [!code ++]
   ```

## v0.18.5 &rarr; v0.19.0

### `vite-node` Entrypoint Loader

The default entrypoint loader has changed to `vite-node`. If you use any NPM packages that depend on the `webextension-polyfill`, you need to add them to Vite's `ssr.noExternal` option:

<!-- prettier-ignore -->
```ts [wxt.config.ts]
export default defineConfig({
  vite: () => ({ // [!code ++]
    ssr: { // [!code ++]
      noExternal: ['@webext-core/messaging', '@webext-core/proxy-service'], // [!code ++]
    }, // [!code ++]
  }), // [!code ++]
});
```

> [Read the full docs](/guide/essentials/config/entrypoint-loaders#vite-node) for more information.

:::details This change enables:

Importing variables and using them in the entrypoint options:

```ts [entrypoints/content.ts]
import { GOOGLE_MATCHES } from '~/utils/constants'

export default defineContentScript({
  matches: [GOOGLE_MATCHES],
  main: () => ...,
})
```

Using Vite-specific APIs like `import.meta.glob` to define entrypoint options:

```ts [entrypoints/content.ts]
const providers: Record<string, any> = import.meta.glob('../providers/*', {
  eager: true,
});

export default defineContentScript({
  matches: Object.values(providers).flatMap(
    (provider) => provider.default.paths,
  ),
  async main() {
    console.log('Hello content.');
  },
});
```

Basically, you can now import and do things outside the `main` function of the entrypoint - you could not do that before. Still though, be careful. It is recommended to avoid running code outside the `main` function to keep your builds fast.

:::

To continue using the old approach, add the following to your `wxt.config.ts` file:

```ts [wxt.config.ts]
export default defineConfig({
  entrypointLoader: 'jiti', // [!code ++]
});
```

:::warning
`entrypointLoader: "jiti"` is deprecated and will be removed in the next major version.
:::

### Drop CJS Support

WXT no longer ships with Common JS support. If you're using CJS, here's your migration steps:

1. Add [`"type": "module"`](https://nodejs.org/api/packages.html#type) to your `package.json`.
2. Change the file extension of any `.js` files that use CJS syntax to `.cjs`, or update them to use EMS syntax.

Vite also provides steps for migrating to ESM. Check them out for more details: https://vitejs.dev/guide/migration#deprecate-cjs-node-api

## v0.18.0 &rarr; v0.18.5

> When this version was released, it was not considered a breaking change... but it should have been.

### New `modules/` Directory

WXT now recognizes the `modules/` directory as a folder containing [WXT modules](/guide/essentials/wxt-modules).

If you already have `<srcDir>/modules` or `<srcDir>/Modules` directory, `wxt prepare` and other commands will fail.

You have two options:

1. [Recommended] Keep your files where they are and tell WXT to look in a different folder:
   ```ts [wxt.config.ts]
   export default defineConfig({
     modulesDir: 'wxt-modules', // defaults to "modules"
   });
   ```
2. Rename your `modules` directory to something else.

## v0.17.0 &rarr; v0.18.0

### Automatic MV3 `host_permissions` to MV2 `permissions`

> Out of an abundance of caution, this change has been marked as a breaking change because permission generation is different.

If you list `host_permissions` in your `wxt.config.ts`'s manifest and have released your extension, double check that your `permissions` and `host_permissions` have not changed for all browsers you target in your `.output/*/manifest.json` files. Permission changes can cause the extension to be disabled on update, and can cause a drop in users, so be sure to double check for differences compared to the previous manifest version.

## v0.16.0 &rarr; v0.17.0

### Storage - `defineItem` Requires `defaultValue` Option

If you were using `defineItem` with versioning and no default value, you will need to add `defaultValue: null` to the options and update the first type parameter:

```ts
const item = storage.defineItem<number>("local:count", { // [!code --]
const item = storage.defineItem<number | null>("local:count", { // [!code ++]
defaultValue: null, // [!code ++]
  version: ...,
  migrations: ...,
})
```

The `defaultValue` property is now required if passing in the second options argument.

If you exclude the second options argument, it will default to being nullable, as before.

```ts
const item: WxtStorageItem<number | null> =
  storage.defineItem<number>('local:count');
const value: number | null = await item.getValue();
```

### Storage - Fix Types In `watch` Callback

> If you don't use TypeScript, this isn't a breaking change, this is just a type change.

```ts
const item = storage.defineItem<number>('local:count', { defaultValue: 0 });
item.watch((newValue: number | null, oldValue: number | null) => { // [!code --]
item.watch((newValue: number, oldValue: number) => { // [!code ++]
  // ...
});
```

## v0.15.0 &rarr; v0.16.0

### Output Directory Structure Changed

JS entrypoints in the output directory have been moved. Unless you're doing some kind of post-build work referencing files, you don't have to make any changes.

```
.output/
  <target>/
    chunks/
      some-shared-chunk-<hash>.js
      popup-<hash>.js // [!code --]
    popup.html
    popup.html
    popup.js // [!code ++]
```

## v0.14.0 &rarr; v0.15.0

### Renamed `zip.ignoredSources` to `zip.excludeSources`

```ts [wxt.config.ts]
export default defineConfig({
  zip: {
    ignoredSources: [
      /*...*/
    ], // [!code --]
    excludeSources: [
      /*...*/
    ], // [!code ++]
  },
});
```

### Renamed Undocumented Constants

Renamed undocumented constants for detecting the build config at runtime in [#380](https://github.com/wxt-dev/wxt/pull/380). Now documented here: https://wxt.dev/guide/multiple-browsers.html#runtime

- `__BROWSER__` → `import.meta.env.BROWSER`
- `__COMMAND__` → `import.meta.env.COMMAND`
- `__MANIFEST_VERSION__` → `import.meta.env.MANIFEST_VERSION`
- `__IS_CHROME__` → `import.meta.env.CHROME`
- `__IS_FIREFOX__` → `import.meta.env.FIREFOX`
- `__IS_SAFARI__` → `import.meta.env.SAFARI`
- `__IS_EDGE__` → `import.meta.env.EDGE`
- `__IS_OPERA__` → `import.meta.env.OPERA`

## v0.13.0 &rarr; v0.14.0

### Content Script UI API changes

`createContentScriptUi` and `createContentScriptIframe`, and some of their options, have been renamed:

- `createContentScriptUi({ ... })` &rarr; `createShadowRootUi({ ... })`
- `createContentScriptIframe({ ... })` &rarr; `createIframeUi({ ... })`
- `type: "inline" | "overlay" | "modal"` has been changed to `position: "inline" | "overlay" | "modal"`
- `onRemove` is now called **_before_** the UI is removed from the DOM, previously it was called after the UI was removed
- `mount` option has been renamed to `onMount`, to better match the related option, `onRemove`.

## v0.12.0 &rarr; v0.13.0

### New `wxt/storage` APIs

`wxt/storage` no longer relies on [`unstorage`](https://www.npmjs.com/package/unstorage). Some `unstorage` APIs, like `prefixStorage`, have been removed, while others, like `snapshot`, are methods on the new `storage` object. Most of the standard usage remains the same. See https://wxt.dev/guide/storage and https://wxt.dev/api/reference/wxt/storage/ for more details ([#300](https://github.com/wxt-dev/wxt/pull/300))

## v0.11.0 &rarr; v0.12.0

### API Exports Changed

`defineContentScript` and `defineBackground` are now exported from `wxt/sandbox` instead of `wxt/client`. ([#284](https://github.com/wxt-dev/wxt/pull/284))

- If you use auto-imports, no changes are required.
- If you have disabled auto-imports, you'll need to manually update your import statements:
  ```ts
  import { defineBackground, defineContentScript } from 'wxt/client'; // [!code --]
  import { defineBackground, defineContentScript } from 'wxt/sandbox'; // [!code ++]
  ```

## v0.10.0 &rarr; v0.11.0

### Vite 5

You will need to update any other Vite plugins to a version that supports Vite 5.

## v0.9.0 &rarr; v0.10.0

### Extension Icon Discovery

WXT no longer discovers icons other than `.png` files. If you previously used `.jpg`, `.jpeg`, `.bmp`, or `.svg`, you'll need to convert your icons to `.png` files or manually add them to the manifest inside your `wxt.config.ts` file.

## v0.8.0 &rarr; v0.9.0

### Removed `WebWorker` Types by Default

Removed [`"WebWorker"` types](https://www.typescriptlang.org/tsconfig/lib.html) from `.wxt/tsconfig.json`. These types are useful for MV3 projects using a service worker.

To add them back to your project, add the following to your project's TSConfig:

```json
{
  "extends": "./.wxt/tsconfig.json",
  "compilerOptions": {
    // [!code ++]
    "lib": ["ESNext", "DOM", "WebWorker"] // [!code ++]
  } // [!code ++]
}
```

## v0.7.0 &rarr; v0.8.0

### `defineUnlistedScript`

Unlisted scripts must now `export default defineUnlistedScript(...)`.

### `BackgroundDefinition` Type

Rename `BackgroundScriptDefintition` to `BackgroundDefinition`.

## v0.6.0 &rarr; v0.7.0

### Content Script CSS Output Location Changed

Content script CSS used to be output to `assets/<name>.css`, but is now `content-scripts/<name>.css` to match the docs.

## v0.5.0 &rarr; v0.6.0

### Require a Function for `vite` Config

The `vite` config option must now be a function. If you were using an object before, change it from `vite: { ... }` to `vite: () => ({ ... })`.

## v0.4.0 &rarr; v0.5.0

### Revert Move Public Directory

Change default `publicDir` to from `<rootDir>/public` to `<srcDir>/public`.

## v0.3.0 &rarr; v0.4.0

### Update Default Path Aliases

Use relative path aliases inside `.wxt/tsconfig.json`.

## v0.2.0 &rarr; v0.3.0

### Move Public Directory

Change default `publicDir` to from `<srcDir>/public` to `<rootDir>/public`.

### Improve Type Safety

Add type safety to `browser.runtime.getURL`.

## v0.1.0 &rarr; v0.2.0

### Rename `defineBackground`

Rename `defineBackgroundScript` to `defineBackground`.
````

## File: docs/guide/installation.md
````markdown
# Installation

Bootstrap a new project, start from scratch, or [migrate an existing project](/guide/resources/migrate).

[[toc]]

## Bootstrap Project

Run the [`init` command](/api/cli/wxt-init), and follow the instructions.

:::code-group

```sh [PNPM]
pnpm dlx wxt@latest init
```

```sh [Bun]
bunx wxt@latest init
```

```sh [NPM]
npx wxt@latest init
```

```sh [Yarn]
# Use NPM initially, but select Yarn when prompted
npx wxt@latest init
```

:::

:::info Starter Templates:
[<Icon name="TypeScript" style="margin-left: 16px;" />Vanilla](https://github.com/wxt-dev/wxt/tree/main/templates/vanilla)<br/>[<Icon name="Vue" style="margin-left: 16px;" />Vue](https://github.com/wxt-dev/wxt/tree/main/templates/vue)<br/>[<Icon name="React" style="margin-left: 16px;" />React](https://github.com/wxt-dev/wxt/tree/main/templates/react)<br/>[<Icon name="Svelte" style="margin-left: 16px;" />Svelte](https://github.com/wxt-dev/wxt/tree/main/templates/svelte)<br/>[<Icon name="Solid" icon="https://www.solidjs.com/img/favicons/favicon-32x32.png"  style="margin-left: 16px;" />Solid](https://github.com/wxt-dev/wxt/tree/main/templates/solid)

<small style="opacity: 50%">All templates use TypeScript by default. To use JavaScript, change the file extensions.</small>
:::

### Demo

![wxt init demo](/assets/init-demo.gif)

Once you've run the `dev` command, continue to [Next Steps](#next-steps)!

## From Scratch

1. Create a new project
   :::code-group
   ```sh [PNPM]
   cd my-project
   pnpm init
   ```
   ```sh [Bun]
   cd my-project
   bun init
   ```
   ```sh [NPM]
   cd my-project
   npm init
   ```
   ```sh [Yarn]
   cd my-project
   yarn init
   ```
   :::
2. Install WXT:
   :::code-group
   ```sh [PNPM]
   pnpm i -D wxt
   ```
   ```sh [Bun]
   bun i -D wxt
   ```
   ```sh [NPM]
   npm i -D wxt
   ```
   ```sh [Yarn]
   yarn add --dev wxt
   ```
   :::
3. Add an entrypoint, `my-project/entrypoints/background.ts`:
   :::code-group
   ```ts
   export default defineBackground(() => {
     console.log('Hello world!');
   });
   ```
   :::
4. Add scripts to your `package.json`:
   ```json [package.json]
   {
     "scripts": {
       "dev": "wxt", // [!code ++]
       "dev:firefox": "wxt -b firefox", // [!code ++]
       "build": "wxt build", // [!code ++]
       "build:firefox": "wxt build -b firefox", // [!code ++]
       "zip": "wxt zip", // [!code ++]
       "zip:firefox": "wxt zip -b firefox", // [!code ++]
       "postinstall": "wxt prepare" // [!code ++]
     }
   }
   ```
5. Run your extension in dev mode
   :::code-group
   ```sh [PNPM]
   pnpm dev
   ```
   ```sh [Bun]
   bun run dev
   ```
   ```sh [NPM]
   npm run dev
   ```
   ```sh [Yarn]
   yarn dev
   ```
   :::
   WXT will automatically open a browser window with your extension installed.

## Next Steps

- Keep reading on about WXT's [Project Structure](/guide/essentials/project-structure) and other essential concepts to learn
- Configure [automatic browser startup](/guide/essentials/config/browser-startup) during dev mode
- Explore [WXT's example library](/examples) to see how to use specific APIs or perform common tasks
- Checkout the [community page](/guide/resources/community) for a list of resources made by the community!
````

## File: docs/guide/introduction.md
````markdown
# Welcome to WXT!

WXT is a modern, open-source framework for building web extensions. Inspired by Nuxt, its goals are to:

- Provide an awesome [DX](https://about.gitlab.com/topics/devops/what-is-developer-experience/)
- Provide first-class support for all major browsers

Check out the [comparison](/guide/resources/compare) to see how WXT compares to other tools for building web extensions.

## Prerequisites

These docs assume you have a basic knowledge of how web extensions are structured and how you access the extension APIs.

:::warning New to extension development?
If you have never written an extension before, follow Chrome's [Hello World tutorial](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world) to first **_create an extension without WXT_**, then come back here.
:::

You should also be aware of [Chrome's extension docs](https://developer.chrome.com/docs/extensions) and [Mozilla's extension docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions). WXT does not change how you use the extension APIs, and you'll need to refer to these docs often when using specific APIs.

<br/>

---

<br/>

Alright, got a basic understanding of how web extensions are structured? Do you know how to access the extension APIs? Then continue to the [Installation page](/guide/installation) to create your first WXT extension.
````

## File: docs/public/_redirects
````
# Netlify Redirects File
# https://docs.netlify.com/routing/redirects/

# Old URLs -> New URLs

# OLD
/config.html                    /api/reference/wxt/interfaces/InlineConfig.html
/api/config.html                /api/reference/wxt/interfaces/InlineConfig.html
/api/config                     /api/reference/wxt/interfaces/InlineConfig.html
/entrypoints                    /entrypoints/background.html
/get-started/assets.html        /guide/assets.html
/get-started/build-targets.html /guide/multiple-browsers.html
/get-started/compare.html       /guide/compare.html
/get-started/configuration.html /guide/configuration.html
/get-started/entrypoints.html   /guide/entrypoints.html
/get-started/publishing.html    /guide/publishing.html
/get-started/testing.html       /guide/testing.html
/guide/background.html          /entrypoints/background.html
/guide/bookmarks.html           /entrypoints/bookmarks.html
/guide/content-scripts.html     /entrypoints/content-scripts.html
/guide/css.html                 /entrypoints/css.html
/guide/devtools.html            /entrypoints/devtools.html
/guide/history.html             /entrypoints/history.html
/guide/manifest.html            /entrypoints/manifest.html
/guide/newtab.html              /entrypoints/newtab.html
/guide/options.html             /entrypoints/options.html
/guide/popup.html               /entrypoints/popup.html
/guide/sandbox.html             /entrypoints/sandbox.html
/guide/sidepanel.html           /entrypoints/sidepanel.html
/guide/unlisted-pages.html      /entrypoints/unlisted-pages.html
/guide/unlisted-scripts.html    /entrypoints/unlisted-scripts.html
/guide/build-targets.html       /guide/multiple-browsers.html
/guide/installation.html        /get-started/installation.html
/guide/introduction.html        /get-started/introduction.html
/guide/upgrade-guide/wxt        /guide/resources/upgrading.html
/guide/upgrade-guide/wxt.html   /guide/resources/upgrading.html

# 0.19.0
/guide/go-further/entrypoint-side-effects.html /guide/go-further/entrypoint-loaders.html

# https://github.com/wxt-dev/wxt/issues/704
# Generated via `pnpm docs:build && find docs/.vitepress/dist -type f -name "*.html"`

/guide/i18n/build-integrations.html                           /i18n.html#build-integrations
/guide/i18n/introduction.html                                 /i18n.html
/guide/i18n/messages-file-format.html                         /i18n.html#messages-file-format
/guide/i18n/editor-support.html                               /i18n.html#editor-support
/guide/i18n/installation.html                                 /i18n.html#installation
/guide/i18n/installation                                      /i18n.html#installation
/guide/key-concepts/content-script-ui.html                    /guide/essentials/content-scripts.html#ui
/guide/key-concepts/manifest.html                             /guide/essentials/config/manifest.html
/guide/key-concepts/wxt-submit.html                           /api/cli/wxt-submit.html
/guide/key-concepts/auto-imports.html                         /guide/essentials/config/auto-imports.html
/guide/key-concepts/web-extension-polyfill.html               /guide/essentials/extension-apis.html
/guide/key-concepts/frontend-frameworks.html                  /guide/essentials/frontend-frameworks.html
/guide/key-concepts/multiple-browsers.html                    /guide/essentials/target-different-browsers.html
/guide/go-further/entrypoint-loaders.html                     /guide/essentials/config/entrypoint-loaders.html
/guide/go-further/es-modules.html                             /guide/essentials/es-modules.html
/guide/go-further/handling-updates.html                       /guide/essentials/testing-updates.html
/guide/go-further/custom-events.html                          /guide/essentials/content-scripts.html#dealing-with-spas
/guide/go-further/debugging.html                              /TODO
/guide/go-further/remote-code.html                            /guide/essentials/remote-code.html
/guide/go-further/vite.html                                   /guide/essentials/config/vite.html
/guide/go-further/testing.html                                /guide/essentials/unit-testing.html
/guide/go-further/how-wxt-works.html                          /guide/resources/how-wxt-works.html
/guide/go-further/reusable-modules.html                       /guide/essentials/wxt-modules.html
/guide/extension-apis/messaging.html                          /guide/essentials/messaging.html
/guide/extension-apis/i18n.html                               /guide/essentials/i18n.html
/guide/extension-apis/storage.html                            /guide/essentials/storage.html
/guide/extension-apis/scripting.html                          /guide/essentials/scripting.html
/guide/extension-apis/others.html                             /guide/essentials/extension-apis.html
/guide/upgrade-guide/wxt.html                                 /guide/resources/upgrading.html
/guide/directory-structure/components.html                    /guide/essentials/project-structure.html
/guide/directory-structure/hooks.html                         /guide/essentials/config/hooks.html
/guide/directory-structure/assets.html                        /guide/essentials/assets.html#assets-directory
/guide/directory-structure/package.html                       /guide/essentials/project-structure.html
/guide/directory-structure/env.html                           /guide/essentials/config/runtime.html
/guide/directory-structure/wxt-config.html                    /guide/essentials/project-structure.html
/guide/directory-structure/wxt.html                           /guide/essentials/project-structure.html
/guide/directory-structure/public/locales.html                /guide/essentials/project-structure.html
/guide/directory-structure/public/index.html                  /guide/essentials/assets.html#public-directory
/guide/directory-structure/entrypoints/devtools.html          /guide/essentials/entrypoints.html#devtools
/guide/directory-structure/entrypoints/sidepanel.html         /guide/essentials/entrypoints.html#sidepanel
/guide/directory-structure/entrypoints/content-scripts.html   /guide/essentials/entrypoints.html#content-scripts
/guide/directory-structure/entrypoints/newtab.html            /guide/essentials/entrypoints.html#newtab
/guide/directory-structure/entrypoints/bookmarks.html         /guide/essentials/entrypoints.html#bookmarks
/guide/directory-structure/entrypoints/unlisted-pages.html    /guide/essentials/entrypoints.html#unlisted-pages
/guide/directory-structure/entrypoints/unlisted-scripts.html  /guide/essentials/entrypoints.html#unlisted-scripts
/guide/directory-structure/entrypoints/options.html           /guide/essentials/entrypoints.html#options
/guide/directory-structure/entrypoints/background.html        /guide/essentials/entrypoints.html#background
/guide/directory-structure/entrypoints/popup.html             /guide/essentials/entrypoints.html#popup
/guide/directory-structure/entrypoints/history.html           /guide/essentials/entrypoints.html#history
/guide/directory-structure/entrypoints/sandbox.html           /guide/essentials/entrypoints.html#sandbox
/guide/directory-structure/entrypoints/css.html               /guide/essentials/entrypoints.html#unlisted-css
/guide/directory-structure/web-ext-config.html                /guide/essentials/config/browser-startup.html
/guide/directory-structure/tsconfig.html                      /guide/essentials/config/typescript.html
/guide/directory-structure/utils.html                         /guide/essentials/project-structure.html
/guide/directory-structure/app-config.html                    /guide/essentials/config/runtime.html
/guide/directory-structure/composables.html                   /guide/essentials/project-structure.html
/guide/directory-structure/output.html                        /guide/essentials/project-structure.html
/get-started/assets.html                                      /guide/essentials/assets.html
/get-started/introduction.html                                /guide/introduction.html
/get-started/configuration.html                               /guide/essentials/config/manifest.html
/get-started/publishing.html                                  /guide/essentials/publishing.html
/get-started/migrate-to-wxt.html                              /guide/resources/migrate.html
/get-started/compare.html                                     /guide/resources/compare.html
/get-started/entrypoints.html                                 /guide/essentials/entrypoints.html
/get-started/installation.html                                /guide/installation.html
````

## File: docs/public/hero-logo.svg
````
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M354.435 418.141C383.217 418.141 406.55 394.808 406.55 366.026V313.91H416.026C444.808 313.91 468.141 290.578 468.141 261.795C468.141 233.013 444.808 209.68 416.026 209.68H406.55V157.565C406.55 128.783 383.217 105.45 354.435 105.45H302.32V95.9745C302.32 67.1921 278.987 43.8594 250.205 43.8594C221.422 43.8594 198.09 67.1921 198.09 95.9745V105.45H145.974C117.192 105.45 93.8594 128.783 93.8594 157.565V209.68H103.335C132.117 209.68 155.45 233.013 155.45 261.795C155.45 290.578 132.117 313.91 103.335 313.91H93.8594V418.141H198.09V408.665C198.09 379.883 221.422 356.55 250.205 356.55C278.987 356.55 302.32 379.883 302.32 408.665V418.141H354.435Z" stroke="#67D55E" stroke-width="20"/>
</svg>
````

## File: docs/public/logo.svg
````
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_305_490)">
<path d="M348.608 492C384.905 492 414.329 462.576 414.329 426.279V360.557H426.279C462.576 360.557 492 331.132 492 294.835C492 258.538 462.576 229.114 426.279 229.114H414.329V163.392C414.329 127.095 384.905 97.6709 348.608 97.6709H282.886V85.7215C282.886 49.4245 253.462 20 217.165 20C180.868 20 151.443 49.4245 151.443 85.7215V97.6709H85.7215C49.4245 97.6709 20 127.095 20 163.392V229.114H31.9494C68.2464 229.114 97.6709 258.538 97.6709 294.835C97.6709 331.132 68.2464 360.557 31.9494 360.557H20V492H151.443V480.051C151.443 443.754 180.868 414.329 217.165 414.329C253.462 414.329 282.886 443.754 282.886 480.051V492H348.608Z" stroke="#67D55E" stroke-width="40"/>
</g>
<defs>
<clipPath id="clip0_305_490">
<rect width="512" height="512" fill="white"/>
</clipPath>
</defs>
</svg>
````

## File: docs/public/robots.txt
````
User-agent: *
Disallow: /api.html
Disallow: /config.html

Sitemap: https://wxt.dev/sitemap.xml
````

## File: docs/tapes/init-demo.tape
````
# VHS documentation
#
# You can view all VHS documentation on the command line with `vhs manual`.
# Or see https://github.com/charmbracelet/vhs#vhs-command-reference

# Output file
Output docs/assets/init-demo.gif

# The tools we will use
Require pnpm


# === Scene ====
Set Width 1400
Set Height 800

# The maximum FPS for GIF is `50` FPS.
Set Framerate 50

# Terminal theme with WXT brand colors (which was taken from the website)
# Based on the standard charmbracelet/vhs theme:
# https://github.com/charmbracelet/vhs/blob/88e634f4a10bbe305b6aea9a12b4d8dc3dd7f31c/style.go#L7-L28
Set Theme {"background": "#161618", "foreground": "#dddddd", "black": "#282a2e", "brightBlack": "#4d4d4d", "red": "#D74E6F", "brightRed": "#FE5F86", "green": "#67d45e", "brightGreen": "#67d45e", "yellow": "#D3E561", "brightYellow": "#EBFF71", "blue": "#8056FF", "brightBlue": "#9B79FF", "magenta": "#ED61D7", "brightMagenta": "#FF7AEA", "cyan": "#04D7D7", "brightCyan": "#00FEFE", "white": "#bfbfbf", "brightWhite": "#e6e6e6", "indigo": "#5B56E0"}
Set FontSize 32

# Terminal settings
Set Shell "bash"

# Terminal prompt. It looks like "● mycommand ..."
Env PS1 "\e[0;32m●\e[0m "


# ===== Preparation =====
# Steps to prepare the recording environment, ensuring a clean and isolated setup.

Hide
# Create a temporary folder for demo
Type 'vhs_sandbox="$(mktemp -d)"' Enter
Type 'cd "$vhs_sandbox"' Enter
Type 'clear' Enter
Show


# ===== Actions =====

Type 'pnpm dlx wxt@latest init .' Sleep 1s Enter
Sleep 3.25s
Down@750ms Enter@750ms # Select `vue` template
Sleep 1.25s
Down@750ms Enter@750ms # Select `pnpm` as a package manager
Sleep 5s


# ===== Cleaning =====

Hide
# Delete the temporary folder
Type 'rm -rf "$vhs_sandbox"' Enter
Show
````

## File: docs/analytics.md
````markdown
<!--@include: ../packages/analytics/README.md-->
````

## File: docs/auto-icons.md
````markdown
<!--@include: ../packages/auto-icons/README.md-->
````

## File: docs/blog.md
````markdown
---
layout: page
---

<script lang="ts" setup>
import BlogHome from './.vitepress/components/BlogHome.vue';
</script>

<BlogHome />
````

## File: docs/examples.md
````markdown
---
layout: page
---

<style>
.examples-container {
  padding: 32px;
}
</style>

<div class="examples-container">
  <div class="vp-doc">
    <h1>Examples</h1>
  </div>

  <br />

  <ExampleSearch />
</div>
````

## File: docs/i18n.md
````markdown
---
outline: deep
---

<!--@include: ../packages/i18n/README.md-->
````

## File: docs/index.md
````markdown
---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
title: Next-gen Web Extension Framework

hero:
  name: WXT
  text: Next-gen Web Extension Framework
  tagline: An open source tool that makes web extension development faster than ever before.
  image:
    src: /hero-logo.svg
    alt: WXT
  actions:
    - theme: brand
      text: Get Started
      link: /guide/installation
    - theme: alt
      text: Learn More
      link: /guide/introduction

features:
  - icon: 🌐
    title: Supported Browsers
    details: WXT will build extensions for Chrome, Firefox, Edge, Safari, and any Chromium based browser.
    link: /guide/essentials/target-different-browsers
    linkText: Read docs
  - icon: ✅
    title: MV2 and MV3
    details: Build Manifest V2 or V3 extensions for any browser using the same codebase.
    link: /guide/essentials/config/manifest
    linkText: Read docs
  - icon: ⚡
    title: Fast Dev Mode
    details: Lightning fast HMR for UI development and fast reloads for content/background scripts enables faster iterations.
  - icon: 📂
    title: File Based Entrypoints
    details: Manifest is generated based on files in the project with inline configuration.
    link: /guide/essentials/project-structure
    linkText: See project structure
  - icon: 🚔
    title: TypeScript
    details: Create large projects with confidence using TS by default.
  - icon: 🦾
    title: Auto-imports
    details: Nuxt-like auto-imports to speed up development.
    link: /guide/essentials/config/auto-imports
    linkText: Read docs
  - icon: 🤖
    title: Automated Publishing
    details: Automatically zip, upload, submit, and publish extensions.
  - icon: 🎨
    title: Frontend Framework Agnostic
    details: Works with any front-end framework with a Vite plugin.
    link: /guide/essentials/frontend-frameworks
    linkText: Add a framework
  - icon: 📦
    title: Module System
    details: Reuse build-time and runtime-code across multiple extensions.
    link: /guide/essentials/wxt-modules
    linkText: Read docs
  - icon: 🖍️
    title: Bootstrap a New Project
    details: Get started quickly with several awesome project templates.
    link: /guide/installation#bootstrap-project
    linkText: See templates
  - icon: 📏
    title: Bundle Analysis
    details: Tools for analyzing the final extension bundle and minimizing your extension's size.
  - icon: ⬇️
    title: Bundle Remote Code
    details: Downloads and bundles remote code imported from URLs.
    link: /guide/essentials/remote-code
    linkText: Read docs
---

## Sponsors

WXT is a [MIT-licensed](https://github.com/wxt-dev/wxt/blob/main/LICENSE) open source project with its ongoing development made possible entirely by the support of these awesome backers. If you'd like to join them, please consider [sponsoring WXT's development](https://github.com/sponsors/wxt-dev).

<a href="https://github.com/sponsors/wxt-dev"><img alt="WXT Sponsors" src="https://raw.githubusercontent.com/wxt-dev/static/refs/heads/main/sponsorkit/sponsors-wide.svg"></a>

## Put <span style="color: var(--vp-c-brand-1)">Developer Experience</span> First

WXT simplifies the web extension development process by providing tools for zipping and publishing, the best-in-class dev mode, an opinionated project structure, and more. Iterate faster, develop features not build scripts, and use everything the JS ecosystem has to offer.

<div style="margin: auto; width: 100%; max-width: 900px; text-align: center">
  <video src="https://github.com/wxt-dev/wxt/assets/10101283/4d678939-1bdb-495c-9c36-3aa281d84c94" controls></video>
  <br />
  <small>
    And who doesn't appreciate a beautiful CLI?
  </small>
</div>

## Who's Using WXT?

Battle tested and ready for production. Explore web extensions made with WXT.

<ClientOnly>
  <UsingWxtSection />
</ClientOnly>
````

## File: docs/storage.md
````markdown
---
outline: deep
---

# WXT Storage

[Changelog](https://github.com/wxt-dev/wxt/blob/main/packages/wxt/CHANGELOG.md)

A simplified wrapper around the extension storage APIs.

## Installation

### With WXT

This module is built-in to WXT, so you don't need to install anything.

```ts
import { storage } from '#imports';
```

If you use auto-imports, `storage` is auto-imported for you, so you don't even need to import it!

### Without WXT

Install the NPM package:

```sh
npm i @wxt-dev/storage
pnpm add @wxt-dev/storage
yarn add @wxt-dev/storage
bun add @wxt-dev/storage
```

```ts
import { storage } from '@wxt-dev/storage';
```

## Storage Permission

To use the `@wxt-dev/storage` API, the `"storage"` permission must be added to the manifest:

```ts [wxt.config.ts]
export default defineConfig({
  manifest: {
    permissions: ['storage'],
  },
});
```

## Basic Usage

All storage keys must be prefixed by their storage area.

```ts
// ❌ This will throw an error
await storage.getItem('installDate');

// ✅ This is good
await storage.getItem('local:installDate');
```

You can use `local:`, `session:`, `sync:`, or `managed:`.

If you use TypeScript, you can add a type parameter to most methods to specify the expected type of the key's value:

```ts
await storage.getItem<number>('local:installDate');
await storage.watch<number>(
  'local:installDate',
  (newInstallDate, oldInstallDate) => {
    // ...
  },
);
await storage.getMeta<{ v: number }>('local:installDate');
```

For a full list of methods available, see the [API reference](/api/reference/wxt/utils/storage/interfaces/WxtStorage).

## Watchers

To listen for storage changes, use the `storage.watch` function. It lets you set up a listener for a single key:

```ts
const unwatch = storage.watch<number>('local:counter', (newCount, oldCount) => {
  console.log('Count changed:', { newCount, oldCount });
});
```

To remove the listener, call the returned `unwatch` function:

```ts
const unwatch = storage.watch(...);

// Some time later...
unwatch();
```

## Metadata

`@wxt-dev/storage` also supports setting metadata for keys, stored at `key + "$"`. Metadata is a collection of properties associated with a key. It might be a version number, last modified date, etc.

[Other than versioning](#versioning), you are responsible for managing a field's metadata:

```ts
await Promise.all([
  storage.setItem('local:preference', true),
  storage.setMeta('local:preference', { lastModified: Date.now() }),
]);
```

When setting different properties of metadata from multiple calls, the properties are combined instead of overwritten:

```ts
await storage.setMeta('local:preference', { lastModified: Date.now() });
await storage.setMeta('local:preference', { v: 2 });

await storage.getMeta('local:preference'); // { v: 2, lastModified: 1703690746007 }
```

You can remove all metadata associated with a key, or just specific properties:

```ts
// Remove all properties
await storage.removeMeta('local:preference');

// Remove only the "lastModified" property
await storage.removeMeta('local:preference', 'lastModified');

// Remove multiple properties
await storage.removeMeta('local:preference', ['lastModified', 'v']);
```

## Defining Storage Items

Writing the key and type parameter for the same key over and over again can be annoying. As an alternative, you can use `storage.defineItem` to create a "storage item".

Storage items contain the same APIs as the `storage` variable, but you can configure its type, default value, and more in a single place:

```ts
// utils/storage.ts
const showChangelogOnUpdate = storage.defineItem<boolean>(
  'local:showChangelogOnUpdate',
  {
    fallback: true,
  },
);
```

Now, instead of using the `storage` variable, you can use the helper functions on the storage item you created:

```ts
await showChangelogOnUpdate.getValue();
await showChangelogOnUpdate.setValue(false);
await showChangelogOnUpdate.removeValue();
const unwatch = showChangelogOnUpdate.watch((newValue) => {
  // ...
});
```

For a full list of properties and methods available, see the [API reference](/api/reference/wxt/utils/storage/interfaces/WxtStorageItem).

### Versioning

You can add versioning to storage items if you expect them to grow or change over time. When defining the first version of an item, start with version 1.

For example, consider a storage item that stores a list of websites that are ignored by an extension.

:::code-group

```ts [v1]
type IgnoredWebsiteV1 = string;

export const ignoredWebsites = storage.defineItem<IgnoredWebsiteV1[]>(
  'local:ignoredWebsites',
  {
    fallback: [],
    version: 1,
  },
);
```

<!-- prettier-ignore -->
```ts [v2]
import { nanoid } from 'nanoid'; // [!code ++]

type IgnoredWebsiteV1 = string;
interface IgnoredWebsiteV2 { // [!code ++]
  id: string; // [!code ++]
  website: string; // [!code ++]
} // [!code ++]

export const ignoredWebsites = storage.defineItem<IgnoredWebsiteV1[]>( // [!code --]
export const ignoredWebsites = storage.defineItem<IgnoredWebsiteV2[]>( // [!code ++]
  'local:ignoredWebsites',
  {
    fallback: [],
    version: 1, // [!code --]
    version: 2, // [!code ++]
    migrations: { // [!code ++]
      // Ran when migrating from v1 to v2 // [!code ++]
      2: (websites: IgnoredWebsiteV1[]): IgnoredWebsiteV2[] => { // [!code ++]
        return websites.map((website) => ({ id: nanoid(), website })); // [!code ++]
      }, // [!code ++]
    }, // [!code ++]
  },
);
```

<!-- prettier-ignore -->
```ts [v3]
import { nanoid } from 'nanoid';

type IgnoredWebsiteV1 = string;
interface IgnoredWebsiteV2 {
  id: string;
  website: string;
}
interface IgnoredWebsiteV3 { // [!code ++]
  id: string; // [!code ++]
  website: string; // [!code ++]
  enabled: boolean; // [!code ++]
} // [!code ++]

export const ignoredWebsites = storage.defineItem<IgnoredWebsiteV2[]>( // [!code --]
export const ignoredWebsites = storage.defineItem<IgnoredWebsiteV3[]>( // [!code ++]
  'local:ignoredWebsites',
  {
    fallback: [],
    version: 2, // [!code --]
    version: 3, // [!code ++]
    migrations: {
      // Ran when migrating from v1 to v2
      2: (websites: IgnoredWebsiteV1[]): IgnoredWebsiteV2[] => {
        return websites.map((website) => ({ id: nanoid(), website }));
      },
      // Ran when migrating from v2 to v3 // [!code ++]
      3: (websites: IgnoredWebsiteV2[]): IgnoredWebsiteV3[] => { // [!code ++]
        return websites.map((website) => ({ ...website, enabled: true })); // [!code ++]
      }, // [!code ++]
    },
  },
);
```

:::

:::info
Internally, this uses a metadata property called `v` to track the value's current version.
:::

In this case, we thought that the ignored website list might change in the future, and were able to set up a versioned storage item from the start.

Realistically, you won't know an item needs versioning until you need to change its schema. Thankfully, it's simple to add versioning to an unversioned storage item.

When a previous version isn't found, WXT assumes the version was `1`. That means you just need to set `version: 2` and add a migration for `2`, and it will just work!

Let's look at the same ignored websites example from before, but start with an unversioned item this time:

:::code-group

```ts [Unversioned]
export const ignoredWebsites = storage.defineItem<string[]>(
  'local:ignoredWebsites',
  {
    fallback: [],
  },
);
```

<!-- prettier-ignore -->
```ts [v2]
import { nanoid } from 'nanoid'; // [!code ++]

// Retroactively add a type for the first version // [!code ++]
type IgnoredWebsiteV1 = string; // [!code ++]
interface IgnoredWebsiteV2 { // [!code ++]
  id: string; // [!code ++]
  website: string; // [!code ++]
} // [!code ++]

export const ignoredWebsites = storage.defineItem<string[]>( // [!code --]
export const ignoredWebsites = storage.defineItem<IgnoredWebsiteV2[]>( // [!code ++]
  'local:ignoredWebsites',
  {
    fallback: [],
    version: 2, // [!code ++]
    migrations: { // [!code ++]
      // Ran when migrating from v1 to v2 // [!code ++]
      2: (websites: IgnoredWebsiteV1[]): IgnoredWebsiteV2[] => { // [!code ++]
        return websites.map((website) => ({ id: nanoid(), website })); // [!code ++]
      }, // [!code ++]
    }, // [!code ++]
  },
);
```

:::

### Running Migrations

As soon as `storage.defineItem` is called, WXT checks if migrations need to be run, and if so, runs them. Calls to get or update the storage item's value or metadata (`getValue`, `setValue`, `removeValue`, `getMeta`, etc.) will automatically wait for the migration process to finish before actually reading or writing values.

### Default Values

With `storage.defineItem`, there are multiple ways of defining default values:

1. **`fallback`** - Return this value from `getValue` instead of `null` if the value is missing.

   This option is great for providing default values for settings:

   ```ts
   const theme = storage.defineItem('local:theme', {
     fallback: 'dark',
   });
   const allowEditing = storage.defineItem('local:allow-editing', {
     fallback: true,
   });
   ```

2. **`init`** - Initialize and save a value in storage if it is not already saved.

   This is great for values that need to be initialized or set once:

   ```ts
   const userId = storage.defineItem('local:user-id', {
     init: () => globalThis.crypto.randomUUID(),
   });
   const installDate = storage.defineItem('local:install-date', {
     init: () => new Date().getTime(),
   });
   ```

   The value is initialized in storage immediately.

## Bulk Operations

When getting or setting multiple values in storage, you can perform bulk operations to improve performance by reducing the number of individual storage calls. The `storage` API provides several methods for performing bulk operations:

- **`getItems`** - Get multiple values at once.
- **`getMetas`** - Get metadata for multiple items at once.
- **`setItems`** - Set multiple values at once.
- **`setMetas`** - Set metadata for multiple items at once.
- **`removeItems`** - Remove multiple values (and optionally metadata) at once.

All these APIs support both string keys and defined storage items:

```ts
const userId = storage.defineItem('local:userId');

await storage.setItems([
  { key: 'local:installDate', value: Date.now() },
  { item: userId, value: generateUserId() },
]);
```

Refer to the [API Reference](/api/reference/wxt/utils/storage/interfaces/WxtStorage) for types and examples of how to use all the bulk APIs.
````

## File: docs/typedoc.json
````json
{
  "$schema": "https://typedoc.org/schema.json",
  "entryPointStrategy": "packages",
  "entryPoints": ["../packages/wxt"],
  "plugin": [
    "typedoc-plugin-markdown",
    "typedoc-vitepress-theme",
    "typedoc-plugin-frontmatter"
  ],
  "out": "./api/reference",
  "githubPages": false,
  "excludePrivate": true,
  "excludeProtected": true,
  "excludeInternal": true,
  "readme": "none",
  "frontmatterGlobals": {
    "editLink": false
  }
}
````

## File: docs/unocss.md
````markdown
<!--@include: ../packages/unocss/README.md-->
````
