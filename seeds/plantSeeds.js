const {Plants} = require("../models");

const plantData = [
    {
        Scientific_Name: "Tagetes erecta",
        Common_Name:"American Marigold",
        Family: "Asteraceae",
    },
    {
        Scientific_Name: "Catharanthus roseus",
        Common_Name:"Annual Vinca",
        Family: "Apocynceae",
    },
    {
        Scientific_Name: "Platycodon grandiflorus",
        Common_Name:"Balloon Flower",
        Family: "Campanulaceae",
    },
]

const seedPlants = () => Plants.bulkCreate(plantData);

module.exports = seedPlants;
