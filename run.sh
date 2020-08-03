#!/bin/bash
echo "Yarn install:"
yarn install

echo "Copy .env file:"
file="./.env.docker"
if [ -f "$file" ]
then
	echo "$file found."
	cp $file ./.env
	echo ".env created"
else
	echo "$file not found."
	exit 1
fi

echo "Start the adonisJs server:"
node ace serve --watch