//   var darkMode = false;
//iam = true;
let is_playlist = false;
var count = 0;
var shuffled = false;
var giveSong, giveArtist, givePoster, now_poster;
// Main Js
let divHtml = `

<h3 onclick="mun()">All Songs<span id="count"></span></h3>


<div class="overflow" id="overflow">
<br>
<div  class="loader">
<i class="fas fa-circle-notch fa-spin"></i>
</div>
</div>
`;
var songs = songs_playlist;

var songname = document.getElementById('song_name');
var songsrc = document.getElementById('playmusic');
var songposter = document.getElementById("song_poster");
var songartist = document.getElementById('song_artist');


var subs = "";
var element;
var id = 0;
function loadSongs(id) {

  try {
    element = $('.playview')[id];
    /* element.scrollIntoView({
       behavior: "smooth",
       block: "center"
     });
     */
     if(!is_playlist){
    // For Playlist one 
    element.parentElement.scrollTop =   element.offsetTop - 120;
     }else{
    // For normal One 
     element.parentElement.parentElement.scrollTop = element.offsetTop - 120;
     }
  }catch(e) {
    // console.log(e)
  }


  try {
    new_title = songs[id].name;
    new_artist = songs[id].artist;
    new_poster = songs[id].poster;

    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: new_title,
        artist: new_artist,
        album: '',
        artwork: [{
          src: new_poster, sizes: '512x512', type: 'image/png'
        },
        ]});
    }
  } catch(e) {
    //  alert("Unable to set Music Meta Data ! ");
    console.log(e);
  }


  $('#get_id').html(id);
  var get_id = $('#get_id').html();
  $('.song').removeClass("active");
  $('#'+get_id).addClass("active");

  $('.playlistSong').removeClass("nactive");
  $('#p'+get_id).addClass("nactive");

  var loadsong = songs[id];

  songname.innerText = loadsong.name;
  songsrc.setAttribute("src", loadsong.src);
  songposter.setAttribute("src", loadsong.poster);
  songartist.innerText = loadsong.artist;

  $('.extraControls').css('background', ' linear-gradient(#333 , rgba(0,0,0,0.6)) , url("'+loadsong.poster+'")')

  subs = loadsong.subtitles;

  $('#subtitles').attr('src', subs);

  document.getElementById('playmusic').textTracks[0].addEventListener('cuechange', function() {

    // console.log("Current .vtt source  => " +  $('#subtitles').attr('src') );
    try {
      document.getElementById('captions').innerHTML = (this.activeCues[0].text);
      // console.log(this.activeCues[0].text);
    }catch(e) {
      //  console.log(e);
    }

  });

  giveSong = $('#song_name').text();
  giveArtist = $('#song_artist').text();
  givePoster = $('#song_poster');
  now_poster = givePoster[0].src;
  //alert(givePoster[0].src);
  $('.rImg').attr('src', givePoster[0].src)

  $('#heman').text(giveSong);

  $('#author').text(giveArtist);

}


var get_id = document.getElementById('get_id').innerText;


// Ajax

$('#icon_2').on('click', function () {


  $.ajax({
    url: "extra.txt",
    type: "get",

    beforeSend: function () {
      $('.ChangeDiv').html(divHtml);
      showLoader();
    },

    success: function(data , status) {
      hideLoader()
      $('.ChangeDiv').html(data);
      var animate = document.querySelector('.animate');
      if (music.paused == false) {
        animate.style.animationPlayState = "running";

      } else {
        animate.style.animationPlayState = "paused";
      }
      if (music.muted == false) {

        $('#mute').removeClass("clicked");

      } else {

        $('#mute').addClass("clicked");

      }
      var villy = document.getElementById('vol')
      var hl = (music.volume)*100;
      villy.value = hl;
      $('#vol').css('background', ' linear-gradient(90deg,  #0581FD  '+hl+'%, #888 0)')



      if (music.playbackRate == 0.5) {
        $('.speed').removeClass("clicked");
        $('#s_1').addClass("clicked")
      }
      if (music.playbackRate == 0.75) {
        $('.speed').removeClass("clicked");
        $('#s_2').addClass("clicked")
      }
      if (music.playbackRate == 1.0) {
        $('.speed').removeClass("clicked");
        $('#s_3').addClass("clicked")
      }
      if (music.playbackRate == 2.0) {
        $('.speed').removeClass("clicked");
        $('#s_4').addClass("clicked")
      }
      if (music.playbackRate == 3.0) {
        $('.speed').removeClass("clicked");
        $('#s_5').addClass("clicked")
      }

      giveSong = $('#song_name').text();
      giveArtist = $('#song_artist').text();
      givePoster = $('#song_poster');
      now_poster = givePoster[0].src;
      //alert(givePoster[0].src);

      $('.rImg').attr('src', givePoster[0].src)

      $('#heman').text(giveSong);

      $('#author').text(giveArtist);

      $('.extraControls').css('background', ' linear-gradient(#333 , rgba(0,0,0,0.6)) , url("'+now_poster+'")')

      if (document.getElementById("playmusic").loop == true) {
        // alert('yay')
        $('#loop').addClass('clicked')
      } else {
        // alert('no')
      }

    },
    error: function() {
      document.querySelector('.ChangeDiv').innerHTML = `
      <div class="noResponse">
      <img src="images/error.png" alt=""  class="error"/><span>
      <i class="loser fa fa-frown-o" aria-hidden="true"></i>
      Aw Snap Something Went Wrong
      <br></br>
      <button onclick="tryReloading('controls')"><i style="margin-right:5px" class="fas fa-redo"></i> Try Again </button>
      </span>

      </div>`
    }

  });
});

$('#icon_1').on('click', function () {

  // iam = true;
  $.ajax({
    url: "home.txt",
    type: "get",
    beforeSend: function () {
      is_playlist = false;
      $('.ChangeDiv').html(divHtml);
      showLoader();
    },

    success: function(data , status) {
      hideLoader();
      $('.ChangeDiv').html(data);
      var  get_id = $('#get_id').html();
      $('.song').removeClass("active");
      $('#'+get_id).addClass("active");
      $('#count').text(songs.length);
      element = $('.playview')[get_id];
      /* element.scrollIntoView({
       behavior: "smooth",
       block: "center"
     });*/
      element.parentNode.scrollTop = element.offsetTop  - 120;
    },
    error: function() {
      document.querySelector('.ChangeDiv').innerHTML = `
      <div class="noResponse">
      <img src="images/error.png" alt=""  class="error"/><span>
      <i class="loser fa fa-frown-o" aria-hidden="true"></i>
      Aw Snap Something Went Wrong
      <br></br>
      <button onclick="tryReloading('home')"><i style="margin-right:5px" class="fas fa-redo"></i> Try Again </button>
      </span>

      </div>`
    }

  });


});

$('#icon_3').on('click', function () {


  // iam = true;
  $.ajax({
    url: "playlist.txt",
    type: "get",
    beforeSend: function () {
      is_playlist = true;
      $('.ChangeDiv').html(divHtml);
      showLoader();
    },

    success: function(data , status) {
      hideLoader()
      $('.ChangeDiv').html(data)

    },
    error: function() {
      document.querySelector('.ChangeDiv').innerHTML = `
      <div class="noResponse">
      <img src="images/error.png" alt=""  class="error"/><span>
      <i class="loser fa fa-frown-o" aria-hidden="true"></i>
      Aw Snap Something Went Wrong
      <br></br>
      <button onclick="tryReloading('playlist')"><i style="margin-right:5px" class="fas fa-redo"></i> Try Again </button>
      </span>

      </div>`
    }

  });


});

// For Icons Toggle
$('#icon_1').on("click", function() {
  $('.icons').removeClass('gold');
  $('#icon_1').addClass("gold");
});
$('#icon_2').on("click", function() {
  $('.icons').removeClass('gold');
  $('#icon_2').addClass("gold");
});
$('#icon_3').on("click", function() {

  $('.icons').removeClass('gold');
  $('#icon_3').addClass("gold");
});
$('#icon_4').on("click", function() {
  turns();
  // iam = false;
});

//For Play /Pause

$('#play_pause').on("click", function() {
  togglePlay();
});


// Search Toggle Replica



function search_toggle(id) {

  songs = songs_playlist;
  loadSongs(id);
  $('.song').removeClass('active');
  $('#'+id).addClass('active');
  var playMusicBtn = document.getElementById('play_pause')
  playMusicBtn.click();
  back.click();
  try {
    element = $('.playview')[id];
    //console.log(element)
    element.parentNode.scrollTop = element.offsetTop  - 120;
  /*  element.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });*/
  }catch(e) {
    // console.log(e)
  }
}
// For Song Toggle
function toogle_function(id) {
  loadSongs(id);

  $('.song').removeClass('active');
  $('#'+id).addClass('active');
  var playMusicBtn = document.getElementById('play_pause')
  playMusicBtn.click();
}

var music = document.getElementById('playmusic');
var slider = document.getElementById('miniPlayer')

//For Music Player
var seek;
$('#miniPlayer').on("input", function() {

  var ty = document.getElementById('playmusic').duration;
  var getTime = (this.value*ty)/100;
  music.currentTime = getTime;

  seek = $('#miniPlayer').val();
  $('#miniPlayer').css('background',
    ' linear-gradient(90deg,  gold  '+seek+'%, white 0)')
});



function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? "": ""): "";
  var mDisplay = m > 0 ? m + (m == 1 ? "": ""): "";
  var sDisplay = s > 0 ? s + (s == 1 ? "": ""): "";

  if (sDisplay == 0) {
    sDisplay = "0";
  }

  if (mDisplay < 10 && mDisplay != 0) {
    mDisplay = "0"+mDisplay+ ":";
  }
  if (hDisplay < 10 && hDisplay != 0) {
    hDisplay = "0"+ hDisplay;
  }

  if (sDisplay < 10) {
    sDisplay = "0"+sDisplay;
  }

  if (hDisplay != 0) {
    hDisplay = hDisplay + ":";
  }
  if (mDisplay == 0) {
    mDisplay = "00:";
  }

  return hDisplay  + mDisplay +  sDisplay;
}

function update() {
  var duration_time = document.getElementById('playmusic').duration;

  var text = secondsToHms(document.getElementById("playmusic").currentTime);

  document.getElementById("time").innerHTML = text;

  var cTime = document.getElementById("playmusic").currentTime;
  cTime = (cTime/duration_time)*100;

  $('#miniPlayer').val(cTime)

  $('#miniPlayer').css('background', ' linear-gradient(90deg,  gold  '+cTime+'%, white 0)')

}

music.addEventListener("loadedmetadata", function() {
  var TotalTime = document.getElementById('playmusic').duration;
  TotalTime = secondsToHms(TotalTime)
  $('#TotalTime').html(TotalTime);
});


$('#miniPlayer').on("change", function() {
  var ty = document.getElementById('playmusic').duration;
  var getTime = (this.value*ty)/100;
  music.currentTime = getTime;

});



function forwardAudio() {
  var ct = music.currentTime;
  music.currentTime = ct +10;
}

function backwardAudio() {
  var ct = music.currentTime;
  music.currentTime = ct -10;
}

var playPromise;

function togglePlay() {
  if (music.paused == true) {
    $('#play_pause').html(' <i class="fa fa-pause" aria-hidden="true"></i>')
    playPromise = music.play();

  } else {
    $('#play_pause').html(' <i class="fa fa-play" aria-hidden="true"></i>')
    // alert('playing')
    //  music.pause()
    if (playPromise !== undefined) {
      playPromise.then(_ => {
        music.pause()
      })
      .catch(error => {});
    }
  }

}
$(document).ready(function() {
  LoadMySongs()
  loadSongs(0);
  var get_id = $('#get_id').html();
  $('.song').removeClass("active")
  $('#'+get_id).addClass("active")
});

document.addEventListener('click', ()=> {
  if (music.paused == true) {
    $('#play_pause').html(' <i class="fa fa-play" aria-hidden="true"></i>')



  } else {

    $('#play_pause').html('<i class="fa fa-pause" aria-hidden="true"></i>')
  }

});




var playMusicBtn = document.getElementById('play_pause');
var next_song = document.getElementById('next');
var previous_song = document.getElementById('previous');

next_song.onclick = function() {

  var get_id = document.getElementById('get_id');
  get_id = get_id.innerHTML;

  id = parseInt(get_id);


  // console.log(id)
  $('#captions').html("");
  var shuffling = Math.round(Math.random() * songs.length);

  if (shuffled == true) {
    loadSongs(shuffling);
    playMusicBtn.click();

  } else {

    if (id >= (songs.length-1)) {
      id = 0;
    } else {
      id = id+1;
    }

    if ((songs.length) == id) {
      loadSongs(0);
      playMusicBtn.click();
    } else {

      loadSongs(id);
      playMusicBtn.click();

    }
  }



};
previous_song.onclick = function() {

  $('#captions').html("");
  var shuffling = Math.round(Math.random() * songs.length);

  if (shuffled == true) {
    loadSongs(shuffling);
    playMusicBtn.click();

  } else {
    if (id > 0) {
      id = id-1;
      loadSongs(id);
      playMusicBtn.click();
    }

    if (id == 0) {
      id = songs.length;
      loadSongs(id);
      playMusicBtn.click();
    }

  }

};

music.onended = function () {
  next_song.click();

}





var songsTotal = songs.length;
count = songsTotal;
var songnumber = 0;
songsTotal = songsTotal -1;
function LoadMySongs() {
  while (songnumber <= songsTotal) {

    if (songnumber <= songsTotal) {
      var loadsong = "";
      loadsong = songs[songnumber];


      $('#overflow').append(' <div onclick="toogle_function('+songnumber+')" class="song playview" id="'+songnumber+'">       <div class="songImg">        <img class="songPoster" src="'+loadsong.poster+'" alt="" />       </div>   <div class="name">'+loadsong.name+'  <br>     <span id="artist">'+loadsong.artist+'</span>      </div>    </div>');

      songnumber = songnumber +1;
    }
  }
}
$('#count').text(count);

$(document).bind("keydown", function(e) {
  // P for pause and resume
  if (e.which == 32) {
    e.preventDefault()
    togglePlay();
  }
  if (e.which == 39 && event.ctrlKey === false) {
    e.preventDefault()
    next_song.click();
  }
  if (e.which == 37 && event.ctrlKey === false) {
    e.preventDefault()
    previous_song.click();
  }

  if (e.which == 39 && event.ctrlKey) {
    e.preventDefault()

    forwardAudio()
  }
  if (e.which == 82 && event.ctrlKey === false) {
    e.preventDefault()

    let shuffling = Math.round(Math.random() * songs.length);
    toogle_function(shuffling);
  }
  if (e.which == 77 && event.ctrlKey) {
    e.preventDefault()
    turns();
  }
  if (e.which == 83 && event.ctrlKey) {
    e.preventDefault()
    $('.fa-search').click();
  }
  if (e.which == 37 && event.ctrlKey) {
    e.preventDefault()
    backwardAudio()
  }


});

function showLoader() {
  $('.loader').css("visibility",
    "visible");
  $('.loader').css("opacity",
    "1");
}
function hideLoader() {
  $('.loader').css("visibility",
    "visible");
  $('.loader').css("opacity",
    "1");
}


function loadeddata() {
  $('.absolute').css('visibility',
    'hidden')
}
function loadstart() {
  $('.absolute').css('visibility',
    'visible')
}
function waiting () {
  $('.absolute').css('visibility',
    'visible')
}
function isplaying() {
  $('.absolute').css('visibility',
    'hidden')
}


var new_poster = '';
var new_artist = "";
var new_title = "";

// # Light Mode

$('#logo').on('click', function() {

  var shuffling = Math.round(Math.random() * songs.length);
  toogle_function(shuffling);
});





function toogle_replica (one) {
  songs = myplaylist;
  loadSongs(one);
  var playMusicBtn = document.getElementById('play_pause')
  playMusicBtn.click();
}



function mun() {

  var tellMe = confirm("Do you want to reload ? ");

  if (tellMe == true) {
    songs = songs_playlist;

    var icon1 = document.getElementById('icon_1')
    icon1.click();
    $('#get_id').text(" ");
    $('.song').removeClass('active')

  }
}

var lol = document.getElementById('lol');

if (music !== undefined) {
  music.onplay = ()=> {
    lol.click();
  }
  music.onpause = ()=> {
    lol.click();
  }
}

try {
  navigator.mediaSession.setActionHandler('previoustrack', function() {
    previous_song.click();
  });


  navigator.mediaSession.setActionHandler('nexttrack', function() {
    next_song.click();
  });
  navigator.mediaSession.setActionHandler('seekbackward', function() {
    backwardAudio();

  });

  navigator.mediaSession.setActionHandler('seekforward', function() {

    forwardAudio();

  });

  navigator.mediaSession.setActionHandler('seekto', (details) => {
    if (details.fastSeek && "fastSeek" in music) {
      // Only use fast seek if supported.
      music.fastSeek(details.seekTime);
      return;
    }
    music.currentTime = details.seekTime;
    // TODO: Update playback state.
  });

}

// For advance MediaMetadata.album

catch(e) {}



// No db search
$(document).ready(function() {
  $('.fa-search').on('click', function() {
    $('body').css('overflow', 'hidden')

    $('.search').css('visibility', 'visible');
    $('.search').css('opacity', '1');

    setTimeout(function() {
      $('input')[0].focus()
    }, 100);

  });



  $('#search').on('keyup', function() {
    $('.searchResults').html("");
    var search = $(this).val();
    var str, checkStr;
    var i = 0;

    while (i <= songs_playlist.length-1) {
      str = songs_playlist[i].name;
      checkStr = str.toLowerCase();
      search = search.toLowerCase();

      if (checkStr.includes(search) == true || checkStr.indexOf(search) != -1) {


        $('.noResults').html("");

        $('.searchResults').append('<div onclick="search_toggle('+i+')" class="search-result">'+str+'</div>');


        if (search == "") {
          $('.searchResults').html("")
          $('.noResults').html('Search Your Favourite Music ')
        }
      }
      i = i+1;
    }
  });

  document.getElementById("search").addEventListener("search",
    function(event) {
      $(".searchResults").empty();
      $('.noResults').html('Search Your Favourite Music ')
    });



});
back.onclick = ()=> {
  $('.search').css('visibility', 'hidden');
  $('.search').css('opacity', '0');
  $(".searchResults").empty();
  $('#search').val("");
  $('.noResults').html('Nothing To Display')
}




$(document).ready(function() {
  if (darkMode == false) {
    $('body').css('filter', 'invert(1)')
    $('body').css('background', '#eaeaea')

    //$('h3').css('color' , 'black')
    $('img').css('filter', 'invert(1)')
  }
});


function changeImg() {
  $('img').css('filter',
    'invert(1)')
}

function darkModeOff() {
  $('body').css('filter',
    'invert(1)')
  $('img').css('filter',
    'invert(1)')
  $('body').css('background-color',
    '#eaeaea')
  $('.online').css('filter',
    'invert(1)');
  darkMode = false;

}
function darkModeOn() {
  $('body').css('filter',
    'invert(0)')
  $('img').css('filter',
    'invert(0)')
  $('body').css('background-color',
    '#1D1D1D');
  $('.online').css('filter',
    'invert(0)');
  darkMode = true;

}
function turns() {
  if (darkMode == false) {
    darkModeOn()
    $('#icon_4').html(`
      <i class="ic fa fa-sun" aria-hidden="true"></i>
      <div class="menu_class">
      Mode
      </div>
      `);

  } else {
    darkModeOff()
    $('#icon_4').html(`
      <i class="ic fa fa-moon" aria-hidden="true"></i>
      <div class="menu_class">
      Mode
      </div>
      `);

  }
}

if (navigator.onLine == false) {

  $('.online').css('top', '0px');
  $('.online').css('background', 'white');
  $('.online').css('color', 'black');

  $('.online').html('<i class="fas fa-exclamation-triangle"></i><span id="fontAwsome">  Please Check Your Connection</span>')
  setTimeout(function() {
    $('.online').css('top', '-21px')
  }, 3500);
}

window.addEventListener('online', function() {


  $('.online').css('top', '0px');
  $('.online').css('background', 'green');
  $('.online').css('color', 'white');
  $('.online').html('<i class="fas fa-wifi"></i><span id="fontAwsome"> Back Online</span>')
  setTimeout(function() {
    $('.online').css('top', '-21px')
  }, 3500);

});

window.addEventListener('offline', function() {


  $('.online').css('top', '0px');
  $('.online').css('background', 'white');
  $('.online').css('color', 'black');

  $('.online').html('<i class="fas fa-no-wifi"></i><span id="fontAwsome">  Please Check Your Connection</span>')
  setTimeout(function() {
    $('.online').css('top', '-21px')
  }, 3500);
});




function hideMe() {
  $('.new-modal').css('visibility', 'hidden');
  $('.new-modal').css('opacity', '0');
  $('.modal').css('visibility', 'hidden')
  $('.modal').css('opacity', '0')

}

function showMe() {
  $('.new-modal').css('visibility', 'visible');
  $('.new-modal').css('opacity', '1');

}
