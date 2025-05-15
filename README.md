# Code Butter Blog


This is the blog for https://codebutter.net. It's a SvelteKit statically generated site, deployed to S3+Cloudfront on AWS. 
Feel free to browse and make use of the code for your own purposes.

## Setup

This assumes that you have set up a GitHub account, have Git installed, and have authenticated your machine with Github.

After cloning, run all commands in your terminal in the base directory of the project. 

* Clone this repo: `git clone git@github.com:code-butter/blog.git`  
* Install Node with NPM. The version suggested is available in `.tool-versions`. You have a few options. 
  * This project utilizes [asdf](https://asdf-vm.com/guide/getting-started.html). If you have installed asdf and the 
    [Node plugin](https://github.com/asdf-vm/asdf-nodejs), you can then run `asdf install`.
  * If you'd like a simpler install that does not juggle versions, 
    [the Node project provides extensive instructions](https://nodejs.org/en/download).
* Run `npm install`
* Run `npm run dev`

It will show a URL that you can open in your browser. Changes will reload automatically on the page upon saving.

## Contributing

If you would like to contribute an article: great! We are happy to accept quality original pieces related to most things 
related  to programming and prefer contributions that are politically neutral. Obvious LLM generated pieces will be 
rejected.  

You can clone this repo, make the required code changes, and submit a PR. Please note the following:

* Test all changes to ensure that your article appears and the site works. 
* Articles are in [mdsvex format](https://mdsvex.pngwn.io/docs) (Markdown in Svelte)
* Save your article here: `src/articles/${article-slug-name}.svx`
* Modify author and tag information. The data is in code at `src/lib/data.ts`. Uses dashes as a spacer for IDs. 
* Put in the required metadata/frontmatter at the top. If you're confused, consult the docs for mdsvex. 
  * `title` - Title used in listings and the top of the page
  * `description` - Description used in listings
  * `author` - The ID of the author
  * `tags` - comma seperated list of tag IDs 
  * `published` - for PRs, set this to `$CURRENT_TIME`. This will be replaced by the build.
  * `updated` - if you're updating this article in a PR, set it to `$CURRENT_TIME`. 
* Add/update your author profile image at  `static/authors/{author.id}.webp`
