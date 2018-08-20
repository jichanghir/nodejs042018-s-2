const skillsModel = require('../bd/models/skills');

exports.getSkills = () => new Promise(async (resolve, reject) => {
    try {
        const skills = await skillsModel.find();
        resolve(skills);
    }
    catch (err) {
        reject(err);
    }
});

// exports.addNewSkill = () =>  new Promise(async (resolve, reject) => {
//     try {
//         // ...
//         const skills = await skillsModel.find();
//         resolve(skills);
//     }
//     catch (err) {
//         reject(err);
//     }
// });
