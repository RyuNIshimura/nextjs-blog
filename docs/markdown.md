---
title: "Markdown Preview"
date: "2021-11-20"
---

このブログで使用しているMarkdownのCSSとModuleのプレビューページです。

## ヘッダー (Header)

H1 ~ H3までにstyleを当てています。(H4 以下は当てていません。)

H2には、参照しやすいようにHoverでクリップアイコンが表示されます。

クリップアイコンをクリックすると、リンクがコピーされます。

`# H1`

# H1

`## H2`

## H2

`### H3`

### H3

## コード

### コードブロック (Code Block)

プログラミング言語がハイライト表示されます。

また、コードブロック右上をクリックするとコードがコピーされます。

```js
let name = "test";
```

ファイル名が表示されます。

```index.js
let name = "test";
```

ディレクトリ名が表示されます。

```src/index.js
let name = "test";
```

何もprefixがない場合は、plaintextです。

```
let name = "test"
```

### インラインコード (Code Inline)

```
`index.js`
```

で表示します。

`index.js`

## テーブル表示 (Table)

|Name|Age|
|---|---|
|Taro|18|

## 引用表示 (Blockquote)

> よろしくお願い致します。

## リスト表示 (List)

- A
- B
- C

## 番号付き表示

1. A
2. B
3. C

## リンク表示

### 通常

`[Text](Link)`で埋め込みます。

[Nishimura Club ⚡️](https://nishimura.club/)

そのままテキストで埋め込むと、下記のように表示されます。

https://nishimura.club/

### OGP

調査中

### Youtube

iframeで埋め込む。

<iframe width="560" height="315" src="https://www.youtube.com/embed/__NeP0RqACU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### SoundCloud

調査中

### Twitter Tweet

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">you&#39;re doing great, even if your Tweets aren&#39;t</p>&mdash; Twitter (@Twitter) <a href="https://twitter.com/Twitter/status/1461023836221153286?ref_src=twsrc%5Etfw">November 17, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 太字 (Bold) etc

Normal

**Bold**

~~斜線~~

_italic_

## 水平線 (Horizon)

`---`で表示します。

---

## 数式 (Math)

調査中

## 画像 (Image)

`![画像の名前](画像パス)`

![Logo](/icon.png)

## MP3/MP4

調査中

## HTML

HTMLをMarkdownファイルに書くと、そのまま表示されます。

```html
<p style="color: red;">赤い文字</p>
```

<p style="color: red;">赤い文字</p>

## 使用したライブラリ

- [remarkjs/react-markdown: Markdown component for React](https://github.com/remarkjs/react-markdown)
- [react-syntax-highlighter/react-syntax-highlighter: syntax highlighting component for react with prismjs or highlightjs ast using inline styles](https://github.com/react-syntax-highlighter/react-syntax-highlighter)

## 参考文献

準備中