var winSmallNbse; // small nbse window 객체 
var snbseName = "SmallNBSEWnd"; // window name 
var snbseUrl = "http://www.naver.com"; // 링크할 url 
function checkPopup() { // 창이 오픈되지 않았거나 열렸던 창이 닫혔을 경우 
    if (typeof (winSmallNbse) == 'undefined' || winSmallNbse.closed) {
        openPopup();
    } // 창이 열려있는 경우
    else {
        var isConfirm = confirm("기존 창을 닫고 새로 여시겠습니까?");
        if (isConfirm) {
            winSmallNbse.close();
            openPopup();
        } else {
            winSmallNbse.focus(); // small nbse window active & focus 
        }
    }
}

function openPopup() {
    winSmallNbse = window.open('', snbseName, status);
    winSmallNbse.location.replace(snbseUrl);
    winSmallNbse.focus();
}