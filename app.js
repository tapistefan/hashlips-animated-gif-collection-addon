const path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;
const spawn = require('child_process').spawn;
const config = require("./config");

const assetsFolderPath = path.join('.', 'assets');
const JSONsPath = path.join(assetsFolderPath, 'json');

const updatedAssetsFolderPath = path.join('.', 'updatedAssets');
const updatedImagesPath = path.join(updatedAssetsFolderPath, 'images');
const updatedJSONsPath = path.join(updatedAssetsFolderPath, 'json');

// ffmpeg must be accesible system wide. (Just google: "install ffmepg on windows/linux")
const createGif = async (edition,trait)=> {
    return new Promise(async (resolve, reject) => {
        const artFromAssets = `assets/images/${edition}.png`;
        const replaceWith = `replaceWith/${trait}.gif`;
    var args = [
        '-i',`${config.background ? replaceWith : artFromAssets}`,
        '-i',`${config.background ? artFromAssets : replaceWith}`,
        '-filter_complex',`[0]scale=${config.resolutionWidth}:${config.resolutionHeight}:force_original_aspect_ratio=decrease,pad=${config.resolutionWidth}:${config.resolutionHeight}:-1:-1:color=black@0[bg];[bg][1]overlay=format=auto,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`,
        '-loglevel',`${config.debug?"info":"quiet"}`,
        `updatedAssets/images/${edition}.gif`
    ];
    
    var proc = spawn('ffmpeg', args);
    proc.stdout.setEncoding("utf8")
    proc.stdout.on('data', function(data) {
        console.log(data);
    });
    
    proc.stderr.setEncoding("utf8")
    proc.stderr.on('data', function(data) {
        console.log(data);
    });
    
    proc.on('close', function() {
        console.log('Edition',edition,'done.');
        return resolve();
    });
});
}

const main = async () =>{
    await fsPromises.rm(updatedAssetsFolderPath, { recursive: true, force: true });
    await fsPromises.mkdir(updatedImagesPath, { recursive: true })
    await fsPromises.mkdir(updatedJSONsPath, { recursive: true })    

    const allJsons =  await fsPromises.readdir(JSONsPath);
    //upload each video
    for(let json of allJsons){        
        const jsonPath = path.join(JSONsPath, json);
        let parsedJSON = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf-8' }))
        const trait = parsedJSON.attributes.find(element => {
            if(element.trait_type == config.trait) return element.value
        });
        if (!trait){
            console.log(`Trait "${config.trait}" that you specified in config file is not valid.`);
            process.exit(1);
        } 
        await createGif(parsedJSON.edition,trait.value);
        parsedJSON.image = `${parsedJSON.edition}.gif`
        parsedJSON.properties.files[0].uri = `${parsedJSON.edition}.gif`
        parsedJSON.properties.files[0].type = "image/gif"
        const newJSONpath = path.join(updatedJSONsPath,`${parsedJSON.edition}.json`);
        await fsPromises.writeFile(newJSONpath, JSON.stringify(parsedJSON, null, 2), function (err) {
            if (err) {
                console.log('The Updated JSON file could not be written.', err)
                process.exit(1)
            }
        })
        console.log("All done!")
    }  
}
main();