
$(document).ready(()=>{
    getData("");
    
    $('#searchInput').keypress(function (e) {
        var key = e.which;
        if(key == 13) 
         {
           searchButtonClicked();
         }
       });   
})

function searchButtonClicked(){
    var inputValue = document.getElementById("searchInput").value
    getData(inputValue);

}
function getData(username){

    var httpRequest = new XMLHttpRequest();

    httpRequest.onload = onDataLoad;

    httpRequest.open("GET", "https://api.github.com/search/users?q=%22" + username +"%22");

    httpRequest.send();
}
function onDataLoad(){

        var jsonResponse = JSON.parse(this.response)
        console.log(jsonResponse);
        populateUserView(jsonResponse.items)


}


function populateUserView(users){

    $("#usersList").html("");
    for(var i = 0; i < users.length ; i++){

        $("#usersList").append(
            $(getUserView(users[i])).attr('onclick',"openUrl('" + users[i].html_url + "')"));
        }

}

function getUserView(user){
    return "<div class='user-view'><img src=' " + user.avatar_url + "'><p> " + user.login + "</p></div>";
}

function openUrl(url){
    window.open(url);
}



