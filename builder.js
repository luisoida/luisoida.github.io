let linksElement = "sp-links-sec";
var siteData = null;
let addHeader = false;

class SPHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});

        /* construct element */
        const header = document.createElement('header');
        header.id = 'sp-header';

        const headText = document.createElement('h1');
        headText.id = 'sp-site-name';
        if (siteData !== null && siteData.hasOwnProperty('title')) {
            headText.textContent = siteData['title'];
        } else if (siteData === null) {
            headText.textContent = "Luis Oida";
        }

        header.appendChild(headText);
        this.shadowRoot.append(header);
    }

    connectedCallback() {
        console.debug('Updating heading element.');
    }

    disconnectedCallback() {
        console.debug('Removing heading element.')
    }

    adoptedCallback() {
        console.debug('Heading element moved.');
    }
}

let getFields = () => {
    fetch('assets/links.json')
        .then((response) => response.json())
        .then((data) => finalize(data));
}

let finalize = (data) => {
    siteData = data;
    let section = document.getElementById(linksElement); // the link list
    if (data.hasOwnProperty('title') && addHeader) {
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
let registry = window.customElements;
registry.define('sp-header', SPHeader);