const overlay = document.querySelector('#overlay');
const root = document.querySelector('#root');
const musicList = [
    'Kizz-Daniel-Pak-N-Go.mp3',
    '15-BROWN-SKIN-GIRL-feat.-Blue-Ivy-C-Wizkid.mp3',
    '50_CENT_-_P.I.M.P._Pesni-Tut.mp3',
    'Olamide_Motigbana_9jaflaver.com_.mp3',
    'Rema - Iron Man (Pitakwa360.com Video_1559504979.mp3',
    'Simi-–-Lovin.mp3',
    'Skales_-_Booty_Language_Remix_Ft__Sarkodie.mp3'
];
console.log(overlay); //eslint-disable-line no-console
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
setTimeout(()=>{
    loadScreen();
}, 3000);

const buttons = document.querySelectorAll('a');
const audio = document.querySelector('audio');
const loopBtn = document.querySelector('#loop');
const shuffleBtn = document.querySelector('#shuffle');
let loop = false;
let shuffle = false;
let c = 0;
console.log(buttons, audio);

//=============== functions ================
const toggleLoop = () =>{
    //changes the toggles the loop true or false
    loop = !loop;
    if(loop){
        loopBtn.style.border = '1px solid red';
    }else{
        loopBtn.style.border = 'none';
    }
}

const toggleShuffle = () =>{
    //changes the toggles the loop true or false
    shuffle = !shuffle;
    if(shuffle){
        shuffleBtn.style.border = '1px solid red';
        console.log('shuffle is on');
    }else{
        shuffleBtn.style.border = 'none';
        console.log('shuffle is off');
    }
}
const timeupdate = () =>{
    if(loop){
        if(audio.ended == true){
            audio.currentTime = 0;
            audio.play();
            buttons[1].innerText = 'pause';
        }
    }else if(shuffle){
        if(audio.ended == true){
            shuffleMusic();
        }
    }else{
        if(audio.ended){
            nextMusic();
            console.log('music ended and next is playing');
        }else{
            console.log('waiting for the current music to end');
        }
    }
    if(audio.paused == false){
        buttons[1].innerText = 'pause';
    }

}
const shuffleMusic = () =>{
    let randNumber = Math.floor(Math.random()*musicList.length);
    audio.setAttribute('src',
    `../uploads/${musicList[randNumber]}`);
    audio.play();
    console.log(randNumber);
}
const nextMusic = () =>{
    c++;
    if(c == musicList.length){
        c = 0;
    }
    audio.setAttribute('src', `../uploads/${musicList[c]}`);
    audio.play();
}
const previousMusic = () =>{
    c--;
    if(c < 0){
        c = musicList.length - 1;
    }
    audio.setAttribute('src', `../uploads/${musicList[c]}`);
    audio.play();
}


// adding of events
Array.from(buttons).forEach(btn =>{
    btn.addEventListener('click', ()=>{
        console.log(btn.innerText);
        if(btn.innerText == 'play'){
            audio.play();
            btn.innerText = 'pause';

        }
        else if(btn.innerText == 'pause'){
            audio.pause();
            btn.innerText = 'play';
            console.log(audio.ended);
         }else if(btn.textContent === 'previous'){
            //alert('previous music is playing');
            previousMusic();
        }else if(btn.textContent === 'next'){
            //alert('next music is playing');
            nextMusic();
         }else{
            console.log('click a valid button');
        }
    });
});

audio.addEventListener('timeupdate', ()=>{
    timeupdate();
});


loopBtn.addEventListener('click', ()=>{
    toggleLoop();
});
shuffleBtn.addEventListener('click', ()=>{
    toggleShuffle();
});