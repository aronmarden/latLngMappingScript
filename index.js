const data = require('./surf_data_id_lat_lng.json')
const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));
var i = 0;

const fs = require('fs');

function myLoop() {
    setTimeout(function () {



        const { id, lat, lng } = data[i];

        fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=03c48dae07364cabb7f121d8c1519492`,
            {
                headers: {
                    "user-agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
                },
                referrerPolicy: "strict-origin-when-cross-origin",
                body: null,
                method: "GET",
            }
        ).then(async (values) => {
            const data = await values.json();
            const suburb = data.results[0].components.suburb
            const hamlet = data.results[0].components.hamlet
            const swimmingPool = data.results[0].components.swimming_pool
            const road = data.results[0].components.road
            const village = data.results[0].components.village
            const maritimeMarker = data.results[0].components.maritime_marker
            const undefined = data.results[0].components.undefined

            if (suburb !== undefined) {
                console.log(`(${id})=>"${suburb}" - ${id}`)
                content = `              - (${id})=>"${suburb}" - ${id}\n`
            } else if (hamlet !== undefined) {
                console.log(`(${id})=>"${hamlet}" - ${id}`)
                content = `              - (${id})=>"${hamlet}" - ${id}\n`
            } else if (swimmingPool !== undefined) {
                console.log(`(${id})=>"${swimmingPool}" - ${id}`)
                content = `              - (${id})=>"${swimmingPool}" - ${id}\n`
            } else if (maritimeMarker !== undefined) {
                console.log(`(${id})=>"${maritimeMarker}" - ${id}`)
                content = `              - (${id})=>"${maritimeMarker}" - ${id}\n`
            } else if (road !== undefined) {
                console.log(`(${id})=>"${road}" - ${id}`)
                content = `              - (${id})=>"${road}" - ${id}\n`
            } else if (village !== undefined) {
                console.log(`(${id})=>"${village}" - ${id}`)
                content = `              - (${id})=>"${village}" - ${id}\n`
            } else {
                console.log(`(${id})=>"Nondescript Location" - ${id}`);
                content = `              - (${id})=>"Nondescript Location" - ${id}\n`

            }

            fs.appendFile('mappingFile.txt', content, err => {
                if (err) {
                    console.error(err);
                }
            });

        });


        i++;
        if (i < data.length) {
            myLoop();
        }
    }, 500)
}

myLoop();         