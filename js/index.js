const overlay = document.querySelector('#overlay');
const root = document.querySelector('#root');
const musicList = [
    {
        id: 1,
        name: 'Kizz-Daniel-Pak-N-Go.mp3',
        img: '../uploads/falz the bad guy.jpg',
        isFavorite: false,
        artist: 'kizz Daniel'
    },
    {
        id: 2,
        name: '15-BROWN-SKIN-GIRL-feat.-Blue-Ivy-C-Wizkid.mp3',
        img: '../uploads/falz the bad guy.jpg',
        isFavorite: false,
        artist: 'Beyonce fit wizkid'
    },
    {
        id: 3,
        name: '50_CENT_-_P.I.M.P._Pesni-Tut.mp3',
        img: '../uploads/falz the bad guy.jpg',
        isFavorite: false,
        artist: '50_CENT'
    },
    {
        id: 4,
        name: 'Olamide_Motigbana_9jaflaver.com_.mp3',
        img: '../uploads/falz the bad guy.jpg',
        isFavorite: false,
        artist: 'Olamide'
    },
    {
        id: 5,
        name: 'Rema - Iron Man (Pitakwa360.com Video_1559504979.mp3',
        img: '../uploads/msc-image.jpg',
        isFavorite: false,
        artist: 'Rema'
    },
    {
        id: 6,
        name: 'Simi-–-Lovin.mp3',
        img: '../uploads/falz the bad guy.jpg',
        isFavorite: false,
        artist: 'simi'
    },
    {
        id: 7,
        name: 'Skales_-_Booty_Language_Remix_Ft__Sarkodie.mp3',
        img: '../uploads/msc-image.jpg',
        isFavorite: false,
        artist: 'skales'
    } 
];
 //eslint-disable-line no-console
const loadScreen = () =>{
    overlay.classList.remove('d-visible');
    overlay.classList.add('d-none');
    root.classList.remove('d-none');
    root.classList.add('d-visible');
}
// const unLoadScreen = () =>{
//     overlay.classList.remove('d-');
//     overlay.classList.add('d-none');
// }
//unLoadScreen();
// display the intro screen for 3seconds
setTimeout(()=>{
    loadScreen();
}, 3000);

//variable declarations
const buttons = document.querySelectorAll('a');
const audio = document.querySelector('audio');
const loopBtn = document.querySelector('#loop');
const shuffleBtn = document.querySelector('#shuffle');
const progressBar = document.querySelector('#progress-bar');
const progress = document.querySelector('#progress');
const thumbnail = document.querySelector('#thumbnail');

const mscName = document.querySelector('#msc-name');
const mscArtist = document.querySelector('#msc-artist');



let loop = false;
let shuffle = false;
let mouseDown = false;
let c = 0;
let angle = 0;


//=============== functions ================
// Repeats a single song when toggled on
const toggleLoop = () =>{
    //changes the  loop to true or false
    loop = !loop;
    if(loop){
        loopBtn.style.border = '1px solid red';
    }else{
        loopBtn.style.border = 'none';
    }
}
const populateMscDetails = (c) =>{
    let current = musicList[c];
    mscArtist.textContent = current.artist;
    mscName.textContent = current.name;
}

const background = () =>{
    thumbnail.style.background = `url('${musicList[c].img}')`;
    thumbnail.parentNode.style.background = `url('${musicList[c].img}')`;
}
const toggleShuffle = () =>{
    //changes the shuffle to true or false
    shuffle = !shuffle;
    if(shuffle){
        shuffleBtn.style.border = '1px solid red';
        
    }else{
        shuffleBtn.style.border = 'none';
        
    }
}
const timeupdate = () =>{
    if(loop){
        if(audio.ended == true){
            audio.currentTime = 0;
            audio.play();
            // change the icon here
            buttons[1].childNodes.setAttribute('class', 'fa fa-pause');
            populateMscDetails(c);
        }
    }else if(shuffle){
        if(audio.ended == true){
            shuffleMusic();
        }
    }else{
        if(audio.ended){
            nextMusic();
        }else{
            console.log('waiting for the current music to end');// for catching error
        }
    }
    if(audio.paused == false){
        //change the icon here
        buttons[1].firstElementChild.setAttribute('class', 'fa fa-pause');
        populateMscDetails(c);
    }

}
// updates the music progress bar with the current time  
const updateBAr = () =>{
    let percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
    
}
const scrub = (e) =>{
    const scrubTime = (e.offsetX / progressBar.parentNode.offsetWidth) * audio.duration;
    audio.currentTime = scrubTime;
    
}
const toggleMouseDown = () =>{
    return mouseDown = !mouseDown;
}
const mouseDrag = (e) =>{
    // let isDown = toggleMouseDown();
    // if(isDown){
    //     console.log(e);
    // };
}
// rotate thumbnail
const rotateThumbanil = () =>{
    thumbnail.style.transform = `rotate(${angle += 3}deg)`;
    if(angle >= 360) angle = 0;
}
// shuffle the sequence of the songs in the playlist when toggled on
const shuffleMusic = () =>{
    let randNumber = Math.floor(Math.random()*musicList.length);
    audio.setAttribute('src',
    `../uploads/${musicList[randNumber].name}`);
    audio.play();
    background();
    // console.log(randNumber);
}

// plays the next music in the list
const nextMusic = () =>{
    c++;
    if(c == musicList.length){
        c = 0;
    }
    audio.setAttribute('src', `../uploads/${musicList[c].name}`);
    audio.play();
    populateMscDetails(c);
    background();
}
const previousMusic = () =>{
    c--;
    if(c < 0){
        c = musicList.length - 1;
    }
    audio.setAttribute('src', `../uploads/${musicList[c].name}`);
    audio.play();
    populateMscDetails(c);
    background();
}


// adding of events
Array.from(buttons).forEach(btn =>{
    btn.addEventListener('click', ()=>{
        let id = btn.getAttribute('id');
        console.log(btn.innerText);
        if(id == 'play'){
            audio.play();
            btn.setAttribute('id', 'pause');
            btn.firstElementChild.setAttribute('class', 'fa fa-pause');
            background();
        }
        else if(id == 'pause'){
            audio.pause();
            btn.setAttribute('id', 'play');
            btn.firstElementChild.setAttribute('class', 'fa fa-play');
            background();
         }else if(id === 'prev'){
            previousMusic();
        }else if(id === 'next'){
            nextMusic();
         }else{
            console.log('click a valid button');
        }
    });
});

audio.addEventListener('timeupdate', ()=>{
    timeupdate();
    updateBAr();
    rotateThumbanil();
});


loopBtn.addEventListener('click', ()=>{
    toggleLoop();
});
shuffleBtn.addEventListener('click', ()=>{
    toggleShuffle();
});

progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', ()=> mouseDown = true);
progress.addEventListener('mouseup', ()=> mouseDown = false);
progress.addEventListener('mousemove', (e)=> (mouseDown) && scrub(e));