<h3 align="center">
  coc-deepl
</h3>

<p align="center">
  deepl extension for coc.nvim
</p>

<p align="center">
  <a href="https://badge.fury.io/js/coc-deepl"><img src="https://badge.fury.io/js/coc-deepl.svg" alt="Npm version"></a>
  <a href="https://github.com/kqito/coc-deepl/blob/main/LICENSE"><img src="https://img.shields.io/github/license/kqito/coc-deepl" alt="License"></a>
</p>

![demo](https://user-images.githubusercontent.com/29191111/125201068-86ddd480-e2a8-11eb-9288-2786643b8652.gif)


## Installation
First, install coc-deepl.

```
:CocInstall coc-deepl
```

Then set an environment variable named `COC_DEEPL_API_KEY` with the API key of deepl.

```
export COC_DEEPL_API_KEY=your-deepl-api-key
```

If you don't have a Deepl API key, you can create one for free.

https://www.deepl.com/docs-api/introduction/


## Usage
Add the following configuration to your .vimrc

```vim
" Displays the result of translating the word under the cursor with deepl
nmap <silent> <space>t <Plug>(coc-deepl)

" Displays the result of translating the string that is selected the cursor with deepl
vmap <silent> <space>t <Plug>(coc-deepl-selected)
```

## Configuration
<details>
<summary>deepl.enable</summary>
<p>

### Description
Whether enable coc-deepl extension or not.

### Type

```ts
boolean
```

### Default value
```ts
true
```
</p>
</details>

<details>
<summary>deepl.plan</summary>
<p>

### Description
Plans for using deepl API

### Type

```ts
'free' | 'pro'
```

### Default value
```ts
free
```
</p>
</details>

<details>
<summary>deepl.targetLanguage</summary>
<p>

### Description
Language after translation. [detail](https://www.deepl.com/docs-api/translating-text/request/)

### Type

```ts
"BG" | "CS" | "DA" | "DE" | "EL" | "EN-GB" | "EN-US" | "EN" | "ES" | "ET" | "FI" | "FR" | "HU" | "IT" | "JA" | "LT" | "LV" | "NL" | "PL" | "PT-PT" | "PT-BR" | "PT" | "RO" | "RU" | "SK" | "SL" | "SV" | "ZH"
```

### Default value
```ts
EN
```
</p>
</details>

## License
[MIT © kqito](./LICENSE)
