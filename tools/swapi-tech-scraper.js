// Simple scraper for data exploration in swapi.tech

import fs from 'fs'
import axios from 'axios'

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
    const {data} = await axios.get('https://www.swapi.tech/api/people?page=1&limit=100')
    const people = await Promise.all(data.results.map(async(pplData) => {
        const {data} = await axios.get(pplData.url)
        return {
            description: data.result.description,
            uid: data.result.uid,
            height: data.result.properties.height,
            mass: data.result.properties.mass,
            hair_color: data.result.properties.hair_color,
            skin_color: data.result.properties.skin_color,
            eye_color: data.result.properties.eye_color,
            birth_year: data.result.properties.birth_year,
            gender: data.result.properties.gender,
            name: data.result.properties.name,
            eye_color: data.result.properties.eye_color,
        }
    }));
    saveAsJSON('people', people)
}

async function getStarships() {
    const {data} = await axios.get('https://www.swapi.tech/api/starships?page=1&limit=100')
    const starships = await Promise.all(data.results.map(async(shipData) => {
        const {data} = await axios.get(shipData.url)
        return {
            description: data.result.description,
            uid: data.result.uid,
            model: data.result.properties.model,
            starship_class: data.result.properties.starship_class,
            manufacturer: data.result.properties.manufacturer,
            cost_in_credits: data.result.properties.cost_in_credits,
            length: data.result.properties.length,
            crew: data.result.properties.crew,
            passengers: data.result.properties.passengers,
            max_atmosphering_speed: data.result.properties.max_atmosphering_speed,
            hyperdrive_rating: data.result.properties.hyperdrive_rating,
            MGLT: data.result.properties.MGLT,
            cargo_capacity: data.result.properties.cargo_capacity,
            consumables: data.result.properties.consumables,
            name: data.result.properties.name
        }
    }));
    saveAsJSON('starships', starships)
}

async function getPlanets() {
    const {data} = await axios.get('https://www.swapi.tech/api/planets?page=1&limit=100')
    const planets = await Promise.all(data.results.map(async(shipData) => {
        const {data} = await axios.get(shipData.url)
        return {
            description: data.result.description,
            uid: data.result.uid,
            diameter: data.result.properties.diameter,
            rotation_period: data.result.properties.rotation_period,
            orbital_period: data.result.properties.orbital_period,
            gravity: data.result.properties.gravity,
            population: data.result.properties.population,
            climate: data.result.properties.climate,
            terrain: data.result.properties.terrain,
            surface_water: data.result.properties.surface_water,
            name: data.result.properties.name,
        }
    }));
    saveAsJSON('planets', planets)
}

async function generateFiles() {
    getStarships();
    getPeople();
    getPlanets();
}

generateFiles();
