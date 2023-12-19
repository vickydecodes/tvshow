const form = document.querySelector('#tvsearch');
const input = document.querySelector('#search');
const space = document.querySelector('#container-fluid');
const rgbbtn = document.querySelector('#change');
const h1 = document.querySelector('#h1');


rgbbtn.addEventListener('click',function(){
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
    const sun = document.createElement('button');
    sun.setAttribute('class','btn btn-primary mt-3');
    sun.innerText = 'light-mode';
    rgbbtn.remove();
    form.append(sun);
    sun.addEventListener('click',function(){
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
    sun.remove();
    form.append(rgbbtn);
    })
   
})


form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.search.value;
    const config = { params: { q: searchTerm } };
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    console.log(res.data);
    makeImages(res.data);

if(form.elements.search.value=''){

h1.innerText = 'TV SHOW APP';

}
else{

    h1.innerText = form.elements.search.value;

}
    form.elements.search.value = "";
});




const makeImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement('img');
            img.src = result.show.image.medium;
            img.setAttribute('class', 'img-fluid');
            const p = document.createElement('p');
            const p2 = document.createElement('p');
            const p3 = document.createElement('p');
            const p4 = document.createElement('p');
            const p5 = document.createElement('p');
            const p6 = document.createElement('p');
            const p7 = document.createElement('p');
            const br = document.createElement('br')
            const show = result.show.name;
            const rating = result.show.rating.average;
            const lang = result.show.language;
            const genres = result.show.genres;
            const aired = result.show.premiered;
            const status = result.show.status;
            // const avl = result.show.webChannel.name;
            p.innerText = `Name: ${show}`;
            p2.innerText = `Rating: ${rating}`;
            p3.innerText = `Language: ${lang}`;
            p4.innerText = `Genre: ${genres}`;
            p5.innerText = `Premiered: ${aired}`;
            p6.innerText = `Status: ${status}`
            // p6.innerText = `Available on: ${avl}`
            const newshow = document.createElement('div');
            const details = document.createElement('div');
            details.setAttribute('class', 'container-fluid');
            p.setAttribute('class', 'container-fluid');
            p2.setAttribute('class', 'container-fluid');
            p3.setAttribute('class', 'container-fluid');
            p4.setAttribute('class', 'container-fluid');
            p5.setAttribute('class', 'container-fluid');
            p6.setAttribute('class', 'container-fluid');

            newshow.setAttribute('class', 'container-fluid mt-3');
            details.append(p);
            details.append(p2);
            details.append(p3);
            details.append(p4);
            details.append(p5);
            details.append(p6);
            newshow.append(img);
            newshow.append(details);
            newshow.setAttribute('id', 'newshow');



            document.body.childNodes[1].childNodes[5].append(newshow);
        }

    }
}
const btn = document.querySelector('#clear');
btn.addEventListener('click', function () {
        document.body.childNodes[1].childNodes[5].innerText = '';
});