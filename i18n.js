const fs = require('fs');
const basePath = './public/i18n';

const languages = [ 'en' ];

languages.forEach(lang => {
    //
    // loading /i18n/{lang}/*.json files
    //
    let src = {};
    fs.readdirSync(`${basePath}/${lang}`).forEach(function(file){
        if (file.match(/\.json$/) !== null) {
            const name = file.replace('.js', '');
            const rawJson = require(`${basePath}/en/${file}`);
            src = {
                ...src,
                ...rawJson
            };
        }
    });

    //
    // saving `/i18n/{lang}.json` file
    //
    const i18nFile = `${basePath}/${lang}.json`;
    fs.writeFile(i18nFile, JSON.stringify(src), { flat: 'w' }, function(err){
        if (err) {
            return console.log(err);
        }
        console.log(`\nWriting i18n file to '${i18nFile}'\n`);
    });
});
