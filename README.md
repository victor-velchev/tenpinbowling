# tenpinbowling

## Synopsis

This is a JavaScript/PHP/SQL implementation of the "Ten Pin Bowling" game. It has a PHP backend running on Apache with the Slim framework, powered by an SQL database.

## Motivation

The project is designed to solve the "Ten Pin Bowling" challenge.

## Installation

The project is depending on Slim (https://www.slimframework.com/docs/v3/start/installation.html) and XAMPP. Unzip into the htdocs folder, run the composer update or install the slim framework if needed. Then just open the start.html file in the public folder.

## API Reference

GET /api/score -> get score for all played games

POST /api/frame -> create an empty frame for a particular game

PUT /api/frame -> update a particular frame for a game

GET /api/game -> get all available games

GET /api/game/* -> get a particular game data

POST /api/game -> create a game
