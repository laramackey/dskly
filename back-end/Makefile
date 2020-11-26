kill:
	docker-compose kill
	docker-compose down

build: kill
	docker-compose build

run: build
	docker-compose up

package:
	npm install
	npm run build
	npm prune --production
	zip -qr ./api.zip dist ./package.json ./package-lock.json ./node_modules