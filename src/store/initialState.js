import Axios from "axios";

let allPhotos = [];
let albums = [];

Axios.get("https://jsonplaceholder.typicode.com/photos")
    .then((response) => {
        allPhotos = response.data;
    })
    .catch((error) => {
        console.log(error);
    });

allPhotos.forEach((photo) => {

});
