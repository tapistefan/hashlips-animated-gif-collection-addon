# Generate Animated GIF NFT Collection
This repository helps you generate animated gif NFT collections using hashlips art engine. It is used to replace static traits of an already generated collection with animated gif traits. This way you can mix .png traits with .gif traits.
## Description
I didn't want to "reinvent the wheel" and code separate generator from scratch when [@HashLips](https://github.com/HashLips) already did an amazing job with his [hashlips_art_engine](https://github.com/HashLips/hashlips_art_engine). There are already a bunch of tutorials on youtube on how to use it and almost the whole crypto community already uses it. So I just made an "addon" that will help you generate your NFT collection using [hashlips_art_engine](https://github.com/HashLips/hashlips_art_engine) but add animated .gif traits to it. This is not possible without addon because [hashlips_art_engine](https://github.com/HashLips/hashlips_art_engine) cant mix .png with .gif.

## Tutorial
1. Generate your collection with [hashlips_art_engine](https://github.com/HashLips/hashlips_art_engine) but use transparent .png file available in this repository (Trait#Rarity.png) on traits that you want to change with animated .gif ones.<br />
For example if you have traits "Background", "Weapon", "Body" and you want to make animated "Background" you will have to put our transparent .png (Trait#Rarity.png) inside "Background" folder and rename it with your trait name and rarity weight so you get proper JSON metadata from [hashlips_art_engine](https://github.com/HashLips/hashlips_art_engine). You must do this for every "Background" trait so you will have a "Background" folder with multiple transparent PNGs named as your traits with proper rarity weights.
2. Install ffmpeg into your system. Plenty of straight forward tutorials already available. Just google: "install ffmpeg on windows" if you are on windows or "install ffmpeg on linux" if you are using linux.
3. Download this repository
4. Create "assets" and "replaceWith" folders in the root of the downloaded repository (**Case sensitive**).
5. Copy "images" and "json" folders that you got from [hashlips_art_engine](https://github.com/HashLips/hashlips_art_engine) (hashlips_art_engine/build) to "assets" folder that you created. You will now have an "assets" folder with "images" and "json" folders inside.
6. Delete the "\_metadata.json" file from the "json" folder otherwise you will get an error.
7. Put animated GIFs that you want transparent traits from the "step 1" to be replaced with inside folder "replaceWith". Files must be called same as original traits just without rarity weights (Sames as they are named in JSON metadata).
8. Open "config.js" file and change "trait" from "Background" to the name of the trait you are replacing from JSON that [hashlips_art_engine](https://github.com/HashLips/hashlips_art_engine) generated.<br />
Change "background" to false if you want to put animated .gif in front of everything.<br />
"resolutionWidth" and "resolutionHeight" must match resolution from [hashlips_art_engine](https://github.com/HashLips/hashlips_art_engine) config file.
7. Run `node app.js` and wait for it to finish.
8. You can find new animated collection inside the "updatedAssets" folder with updated JSONs ready for metaplex.

## Note
I have tested this on Linux machine using node version v16.14.2<br />
I have tested only with Solana metadata from [hashlips_art_engine](https://github.com/HashLips/hashlips_art_engine)<br />
**Please double check updated files before uploading/deploying your NFT collection.**
