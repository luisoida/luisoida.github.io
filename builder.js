let getFields = () => {
    fetch('assets/links.json')
        .then((response) => response.json())
        .then((data) => finalize(data));
}

let finalize = (data) => {
    let section = document.getElementById('lo-primary'); // the link list
    if (data.hasOwnProperty('title')) {
        let heading = document.createElement('h1');
        heading.innerText = data['title'];
        section.appendChild(heading);
    }

    for (let i = 0; i < data.links.length; i++) {
        section.appendChild(createAnchor(data.links[i]['title'], data.links[i]['href']));
    }
}

let createAnchor = (title, link) => {
    let anchor = document.createElement('a');
    anchor.setAttribute('href', link);
    anchor.setAttribute('target', '_blank');
    anchor.innerText = title;

    return anchor;
}

let insertLinks = function(data) {
    let links = data; // insert link data into links
    let list = document.getElementById('lo-link-list');

    for (let i = 0; i < links.links.length; i++) {
        console.debug(`Found data ${links.links[i]["title"]} with href "${links.links[i]["href"]}"`);

        // create new list item
        let item = document.createElement('li');
        let anchor = document.createElement('a');

        anchor.setAttribute('href', links.links[i]["href"]);
        anchor.setAttribute('target', '_blank');
        anchor.innerText = links.links[i]["title"];

        // add to item list
        item.appendChild(anchor);
        list.appendChild(item);
    }
}

getFields();