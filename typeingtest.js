const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const start = $('#reload-btn');
const text = $('#wordlist').innerText.trim().split(' ');
console.log(text);
let dataText = '';


// hiển thị đoan text khi click vào nút start
start.onclick = function() {
    $('#words').style.display = 'block';
    
    text.forEach(function(element, index) {
        if (hasWhiteSpace(element)) {
            dataText += `<span wordnr="${index}" class=" letter letter-${index}">&nbsp;</span>`;
        } else {
            dataText += `<span wordnr="${index}" class=' letter letter-${index}'>${element}</span>`;
        } 
    })
    
    // dataText =  text[(Math.floor(Math.random() * text.length))] 
    $('#row1').innerHTML = dataText; 
    
    function hasWhiteSpace(str) {
        return str.indexOf(' ') >= 0;
    }
    $('.letter-0').classList.add('highlight');
   
}

// khi bắt đầu gõ, khung thời gian sẽ bắt đầu đếm ngược
function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
        myInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        
        if (--timer < 0) {
            alert("hết thời gian");
            clearInterval(myInterval);
            showCorrectErrors();
            
        }
    }, 1000);
    $('#inputfiled').onkeypress = function (){};
    
}

$('#inputfiled').onkeypress = function () {
    let fiveMinutes = 60;
    let display = $('.time');                                                                       
    startTimer(fiveMinutes, display);    
};



// khi gõ xong một từ, nhấp phím space thì thẻ span sẽ lắng nghe và xử lý
const inputElement = $('#inputfiled');
const inputStream = [];
let saveInputStream;
let inputValue
let inputValueArray

// lấy ra value input khi gõ rồi cho vào 1 biến lưu trữ.
function saveInput(e) {
    if (e.which == 32) {
        inputValue = e.target.value;
        inputStream.push(inputValue);
        saveInputStream = inputStream.join('');
        $('#inputstream').innerHTML =  saveInputStream;
        console.log(saveInputStream);

    }    
}

// Xóa value input khi đã lưu trữ vào 1 biến
function deleteInput(e) {
    if (e.which == 32) {
        e.target.value = null;
    }
}

// so sanh dữ liệu nhập vào với thẻ span, nếu đúng thì đổi màu xanh, sai thì đổi màu đỏ.
let errorsTest = 0;
let correctsTest = 0;

function compareTF(e) {
    inputValueArray = saveInputStream.trim().split(' ');
    console.log(inputValueArray);
    let spanElements = $$('#row1 span')
    spanElements.forEach(function (spanElement,index) {
        if (e.which == 32) { 
                let typedChar = inputValueArray[index];
                // console.log(typedChar)
                //Khi value rỗng 
                if (typedChar == null) {
                    spanElement.classList.remove('correct');
                    spanElement.classList.remove('wrong');

                }
                // khi gõ đúng
                 else if (spanElement.innerText === typedChar) { 
                    spanElement.classList.add('correct')
                    spanElement.classList.remove('highlight');
                    correctsTest++;
                    
                    // Khi gõ sai
                } else {
                    spanElement.classList.add('wrong')
                    spanElement.classList.remove('highlight');
                    errorsTest++;
                }
                
            }
    })


}
    
inputElement.addEventListener('keypress', compareTF);
inputElement.addEventListener('keydown', saveInput);
inputElement.addEventListener('keypress', deleteInput);

// hiển thị số ký tự gõ đúng và sai
function showCorrectErrors(){
    $('h2').innerHTML = `bạn gõ đúng ${correctsTest} ký tự và gõ sai ${errorsTest} ký tự`;
}







