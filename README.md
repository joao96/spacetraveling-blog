<h1 align="center">
    <img alt="to-do" src="public/logo.svg" />
</h1>

<h4 align="center">
  A clean blog app connected to the Prismic CMS api.
</h4>
<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/joao96/spacetraveling-blog?style=flat-square">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/joao96/spacetraveling-blog?style=flat-square">
<!--   <img alt="License" src="https://img.shields.io/github/license/joao96/spacetraveling-blog?style=flat-square"> -->
</p>

<p align="center">
  <a href="#checkered_flag-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-setup">Setup</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#sparkles-how-it-works">How It Works</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<!--   <a href="#page_facing_up-license">License</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; -->
  <a href="#get-in-touch-monocle_face">Get in Touch</a>
</p>

## :checkered_flag: Technologies

- [Next JS](https://nextjs.org/)
- [Sass](https://sass-lang.com/)
- [Prismic](https://prismic.io/docs)
- [Jest](https://jestjs.io/)
- [testing-library](https://testing-library.com/)
- [VS Code][vc] with [EditorConfig][vceditconfig] and [ESLint][vceslint]

## :information_source: Setup

In order to run this application, it's required that you have [Git](https://git-scm.com), [Node.js v10.16][nodejs] or higher + [Yarn v1.13][yarn] or higher installed on your computer. From your command line:

**Step 1:** Clone this repo & run a `cd` into project's folder.

**Step 2:** install node modules as below:

```
npm install
```

if you prefer:

```
yarn
```

**Step 3:**

```
yarn dev
```

Once the server is up, go to http://localhost:3000/ and you should see something like this:

<p align="center">
  <img src="public/spacetraveling-cover.png" alt="Initial page">
</p>

## :sparkles: How It Works

The app is connected to a [Primsic](https://prismic.io/) (Headless CMS) project, where blog posts are handled. With that, the app then consumes the content from the client and displays it in screen. A simple pagination logic was added as well.

Informations about the post, such as *last update date, author and time to read*, are provided inside the post page.

<!-- ## :page_facing_up: License

<a href="https://github.com/joao96/the-simplest-todo/blob/main/LICENSE">
    <img alt="License" src="https://img.shields.io/github/license/joao96/the-simplest-todo?style=flat-square">
</a>

<br />

This project is licensed under the MIT. -->

## Get in touch! :monocle_face:

[![Linkedin Badge](https://img.shields.io/badge/-João%20Victor%20Poletti-0e76a8?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/jvpoletti/)](https://www.linkedin.com/in/jvpoletti/)
[![Gmail Badge](https://img.shields.io/badge/-jvpoletti@gmail.com-ff512f?style=flat-square&logo=Gmail&logoColor=white&link=mailto:jvpoletti@gmail.com)](mailto:jvpoletti@gmail.com)

<br />

Made with :green_heart: by [João Victor Poletti](https://github.com/joao96)

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[vc]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
