ng build --prod --output-path docs --base-href "https://justdaile.github.io/TrashyMetronome/"
"I'm useless!" > docs/.nojekyll
cp -f docs/index.html docs/404.html
git add *
git commit -m building docs
git push origin master
