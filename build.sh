git add .
git commit -m $1
git push origin
npm run build -prod
firebase deploy