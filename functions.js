let number = 1; //題號
    let index = 0; //歌曲index
    let total = songs.length; //曲庫歌曲總數
    let songObj = {}; //選中歌曲物件
    let lyric1 = "", lyric2 = "", lyric3 = ""; //三個歌詞提示
    let ly2 = false, ly3 = false; //是否啟用第二、第三個提示

    function start(){
        getSong();
        document.getElementById("lyric1").textContent=lyric1;
        let hintBtn = document.getElementById("hintBtn");
        let ansBtn = document.getElementById("ansBtn");
        let nextBtn = document.getElementById("nextBtn");
        let checkBtn = document.getElementById("checkBtn");
    }

    function NextSong(){
        songs.splice(index,1);
        //題號加一
        number++;
        document.getElementById("num").textContent=number;
        //取得新的歌曲
        getSong();
        //重置提示、答案區、按鈕
        ly2 = false;
        ly3 = false;
        document.getElementById("answer").textContent="______________";
        document.getElementById("lyric1").textContent=lyric1;
        document.getElementById("lyric2").textContent="歌詞提示(二)";
        document.getElementById("lyric3").textContent="歌詞提示(三)";
        hintBtn.disabled = false;
        ansBtn.disabled = false;
        nextBtn.disabled = false;
        checkBtn.disabled = false;
    }

    function getSong(){
        //Get a random song from songs[]
        total = songs.length;
        console.log(total);
        index = getRandomInt(0,total);
        songObj = songs[index];
        total--;

        //Get three random lyrics from the picked song.
        for(let i = 0; i<1; i++){
            let j = getRandomInt(0, songObj.lyrics.length);
            if(j<songObj.lyrics.length-2){
                lyric1 = songObj.lyrics[j];
                lyric2 = songObj.lyrics[j+1];
                lyric3 = songObj.lyrics[j+2];
            }else{
                i--;
            }
        }
        
    }

    function nextHint(){
        if(ly2==false){
            document.getElementById("lyric2").textContent = lyric2;
            ly2 = true;
        }else if(ly3==false){
            document.getElementById("lyric3").textContent = lyric3;
            ly3 = true;
            hintBtn.disabled = true;
        }
    }

    function showAnswer(){
        document.getElementById("answer").textContent = songObj.name; 
        console.log(document.getElementById("answer"));
        ansBtn.disabled = true;
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function checkAns(){
        let myInput = document.getElementById("input").value;
        console.log(myInput);
        console.log(songObj.name);
        document.getElementById("input").value="";
        if(myInput===songObj.name){
            alert("正確答案！");
            showAnswer();
        }else{
            alert("答案錯誤！");
            nextHint();
        }
    }

    window.onload = start;