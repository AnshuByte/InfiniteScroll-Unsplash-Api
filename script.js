const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImage = 0;
let photosArray = [];

// Unsplash Api
// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY


const count = 10;
const apiKey = 'eKP8UK6bYL1NHphpSOhv_ZkT6iKGm94XY9bdRuZv5Y4';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`


// check if all image were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImage) {
        ready = true;
        loader.hidden = true
        console.log('ready = ', ready);
    }

}
// helper function to set Attribute on DOm Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for link and photos
function displayPhotos() {
    imagesLoaded = 0;
    totalImage = photosArray.length;

    // Run function for each object in photoArray
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photos
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // EventListener , Check  when each is finished loading
        img.addEventListener('load', imageLoaded);
        // put <img> inside <a> then put both inside image container Element

        item.appendChild(img);
        imageContainer.appendChild(item);
    }

    )
}
//Get photos from Unsplash Api

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();

    } catch (error) {
        console.log(error);
    }

}
// Check to see if scrolling near bottom of page , load more Photos 
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }

});
getPhotos();
