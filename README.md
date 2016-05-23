# Codemoji

Codemoji is a Mozilla Foundation project, ideated and developed by [TODO](http://todo.to.it) in support of the [Encrypt campaign](https://advocacy.mozilla.org/encrypt) launched in early 2016.

The Codemoji project source is available here under Mozilla Public License v2.
 
A special thanks to Twitter for their [twemoji](https://github.com/twitter/twemoji) library, which provided us with the widest set of cross-platform emojis we could use in building this project.

The following open-source libraries were also used in developing the website:

- [bowser](https://github.com/ded/bowser)
- [clipboard](https://github.com/zenorocha/clipboard.js)
- [cookie](https://github.com/florian/cookie.js)
- [esrever](https://github.com/mathiasbynens/esrever)
- [fastclick](https://github.com/ftlabs/fastclick)
- [fromcodepoint](https://mths.be/fromcodepoint)
- [gsap](https://github.com/greensock/GreenSock-JS)
- [jquery](https://github.com/jquery/jquery-dist)
- [jquery.transit](https://github.com/rstacruz/jquery.transit)
- [lodash](https://github.com/lodash/lodash)
- [nanoscroller](https://github.com/lodash/lodash)
- [normalize.css](https://github.com/necolas/normalize.css)
- [punycode](https://github.com/bestiejs/punycode.js)
- [stateman](https://github.com/leeluolee/stateman)
- [theater](https://github.com/Zhouzi/TheaterJS)
- [youarei](https://github.com/purge/youarei.js)

### Development

	npm install
	bower intall
	grunt dev
	

### Build

You need to create a file 'env.json' in the root based on 'env.template.json' then run:

	gulp build
	
	
### Build && Deploy on gh-pages
	
This will deploy the built version straight to Github pages. Please take note the local env.json will be used for the required setting:

	npm run deploy_gh

Under the hood here the details:

	gulp build
	git checkout -b temp
	git add --force public
	git commit -m "build"
	git push origin :gh-pages
	git subtree push --prefix public origin gh-pages
	git checkout master
	git branch -D temp


## LICENSE

This Source Code is subject to the terms of the Mozilla Public License, v. 2.0.  
A copy of the License is available in the LICENSE file.
