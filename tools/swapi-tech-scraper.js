// Simple scraper for data exploration in swapi.tech

import fs from 'fs';
import axios from 'axios';

function saveAsJSON(name, data) {
    const jsonData = JSON.stringify(data);
    fs.writeFile(`${name}.json`, jsonData, 'utf8', (err) => {
        if (err) {
            console.error(`Error writing ${name} JSON file:`, err);
            return;
        }
        console.log(`${name} JSON file has been saved.`);
    });
}

async function getPeople() {
    const { data } = await axios.get('https://www.swapi.tech/api/people?page=1&limit=100');
    const people = await Promise.all(
        data.results.map(async (pplData) => {
            const { data } = await axios.get(pplData.url);
            return {
                description: data.result.description,
                uid: data.result.uid,
                attack: data.result.properties.height === 'unknown' ? 0 : Number(data.result.properties.height),
                name: data.result.properties.name,
            };
        }),
    );
    saveAsJSON('people', people);
}

async function getStarships() {
    const { data } = await axios.get('https://www.swapi.tech/api/starships?page=1&limit=100');
    const starships = await Promise.all(
        data.results.map(async (shipData) => {
            const { data } = await axios.get(shipData.url);
            // Fix for inconsistent data in one starship
            data.result.properties.length = data.result.properties.length.replace(',', '');

            return {
                description: data.result.description,
                uid: data.result.uid,
                attack: data.result.properties.length === 'unknown' ? 0 : Number(data.result.properties.length),
                name: data.result.properties.name,
            };
        }),
    );
    saveAsJSON('starships', starships);
}

async function getPlanets() {
    const { data } = await axios.get('https://www.swapi.tech/api/planets?page=1&limit=100');
    const planets = await Promise.all(
        data.results.map(async (shipData) => {
            const { data } = await axios.get(shipData.url);
            return {
                description: data.result.description,
                uid: data.result.uid,
                attack: data.result.properties.population === 'unknown' ? 0 : Number(data.result.properties.population),
                name: data.result.properties.name,
            };
        }),
    );
    saveAsJSON('planets', planets);
}

async function generateFiles() {
    getStarships();
    getPeople();
    getPlanets();
}

generateFiles();
