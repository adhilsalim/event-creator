var showpopupButton = document.getElementById('showbutton');
var cancelButton = document.getElementById('cancelbutton');
var createButton = document.getElementById('createbutton');
var allTagMatch = false, stopExecution = false;

var Ename = document.getElementById('formEventName');
var Eurl = document.getElementById('formEventurl');
var Edesc = document.getElementById('formEventDesc');
var Edate = document.getElementById('formEventDate');
var Etags = document.getElementById('formEventTags');
var Eposter = document.getElementById('formEventPoster');
var tagSearch = document.getElementById('tagsearch');

var popupSection = document.getElementById('popup');
var popupLayer = document.getElementById('popupLayer');
var promptMessage = document.getElementById('prompt-msg');
var promptMessageContainer = document.getElementById('promptMsgContainer');

//----+----+----+----+----+ FUNCTIONS ----+----+----+----+----+ //
function createEventPost() {

    if (Ename.value == "" || Eurl.value == "" || Edesc.value == "" || Edate.value == "" || Etags.value == "" || Eposter.files.length == 0) {
        promptMessage.innerText = 'All fields are required';
        promptMessageContainer.style.display = 'block';
    } else {
        promptMessageContainer.style.display = 'none';
        showpopupButton.style.display = 'block';
        popupLayer.style.display = 'none';
        popupSection.style.display = 'none';

        var image = Eposter.files[0];
        var EnameValue = Ename.value;
        var EurlValue = Eurl.value;
        var EdescValue = Edesc.value;
        var EdateValue = Edate.value;
        var EtagsValue = Etags.value;
        var imageName = image.name;

        var storageRef = firebase.storage().ref('IEE-EVENT-IMAGES/' + imageName);

        var uploadTask = storageRef.put(image);

        uploadTask.on('state_changed', function (snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
            promptMessage.innerText = 'Uploading, ' + progress.toFixed(0) + '% done.';
            promptMessageContainer.style.display = 'block';

        }, function (error) {
            promptMessage.innerText = 'An error occurred';
            promptMessageContainer.style.display = 'block';
            console.log(error.message);
        }, function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                firebase.database().ref('IEEE-EVENT/').push().set({
                    eventName: EnameValue,
                    eventUrl: EurlValue,
                    eventDesc: EdescValue,
                    eventDate: EdateValue,
                    eventTags: EtagsValue,
                    imageURL: downloadURL
                }, function (error) {
                    if (error) {
                        promptMessage.innerText = 'An error occurred';
                        promptMessageContainer.style.display = 'block';
                    } else {
                        //alert("Event Created");
                        promptMessage.innerText = 'Event created';
                        promptMessageContainer.style.display = 'block';
                        document.getElementById('post-form').reset();
                        getdata();
                    }
                });
            });
        });
    }

}

function cancelEventPost() {
    promptMessageContainer.style.display = 'none';
    showpopupButton.style.display = 'block';
    popupLayer.style.display = 'none';
    popupSection.style.display = 'none';
    document.getElementById('post-form').reset();
}

function showPopup() {
    popupSection.style.display = 'block';
    popupLayer.style.display = 'block';
    showpopupButton.style.display = 'none';
}

window.onload = function () {
    this.getdata();
    promptMessage.innerText = 'Loading';
    promptMessageContainer.style.display = 'block';
}

function getdata() {
    firebase.database().ref('IEEE-EVENT/').once('value').then(function (snapshot) {
        var evenPostContainer = document.getElementById('posts');
        posts.innerHTML = "";
        var data = snapshot.val();
        for (let [key, value] of Object.entries(data)) {
            evenPostContainer.innerHTML = "<div class='col-sm-12 col-md-4 col-lg-4'>" +
                `<div class="card" style="width: 18rem;">` +
                `<img class="card-img-top" src="` + value.imageURL + `" alt="Event image">` +
                `<div class="card-body">` +
                `<h5 class="card-title">` + value.eventName + `</h5>` +
                `<p class="date-p"><span class="date-icon"><i class="fa fa-calendar" aria-hidden="true"></i></span>` + value.eventDate + `</p>` +
                `<p><span class="tag-icon"><i class="fa fa-tag" aria-hidden="true"></i></span>` + value.eventTags + `</p>` +
                `<p class="card-text">` + value.eventDesc + `</p>` +
                `<a href="` + value.eventUrl + `" target="_blank" class="btn btn-primary">Details</a>` +
                "</div></div></div></div>" + evenPostContainer.innerHTML;
        }
        promptMessage.innerText = 'Done';
        promptMessageContainer.style.display = 'none';

    });
}

function getSortData() {
    promptMessage.innerText = 'Loading';
    promptMessageContainer.style.display = 'block';

    var tagSearchValue = tagSearch.value.toLowerCase().split(',');
    tagSearch.value = '';

    firebase.database().ref('IEEE-EVENT/').once('value').then(function (snapshot) {
        var evenPostContainer = document.getElementById('posts');
        posts.innerHTML = "";
        var data = snapshot.val();
        for (let [key, value] of Object.entries(data)) {
            //console.log('Object rcvd !');

            //IF TAGS = 1
            if (tagSearchValue.length == 1) {
                for (var i = 0; i <= tagSearchValue.length - 1; i++) {
                    //console.log('Search Array : ' + tagSearchValue[i].toLowerCase());
                    //console.log('Object value: ' + value.eventTags.toLowerCase());
                    //console.log(value.eventTags.toLowerCase().indexOf(tagSearchValue[i]) != -1);

                    if (value.eventTags.toLowerCase().indexOf(tagSearchValue[i]) != -1) {
                        //console.log('post created');
                        //console.log('post name:' + value.eventName);
                        evenPostContainer.innerHTML = "<div class='col-sm-12 col-md-4 col-lg-4'>" +
                            `<div class="card" style="width: 18rem;">` +
                            `<img class="card-img-top" src="` + value.imageURL + `" alt="Event image">` +
                            `<div class="card-body">` +
                            `<h5 class="card-title">` + value.eventName + `</h5>` +
                            `<p class="date-p"><span class="date-icon"><i class="fa fa-calendar" aria-hidden="true"></i></span>` + value.eventDate + `</p>` +
                            `<p><span class="tag-icon"><i class="fa fa-tag" aria-hidden="true"></i></span>` + value.eventTags + `</p>` +
                            `<p class="card-text">` + value.eventDesc + `</p>` +
                            `<a href="` + value.eventUrl + `" target="_blank" class="btn btn-primary">Details</a>` +
                            "</div></div></div></div>" + evenPostContainer.innerHTML;
                    }
                }
            }
            else {
                //console.log('SECOND');

                for (var k = 0; k <= tagSearchValue.length - 1 && !stopExecution; k++) {
                    if (value.eventTags.toLowerCase().indexOf(tagSearchValue[k]) != -1) {
                        allTagMatch = true;
                    }
                    else {
                        allTagMatch = false;
                        stopExecution = true;
                    }
                }

                //console.log('all match?');
                //console.log(allTagMatch);

                if (allTagMatch) {
                    evenPostContainer.innerHTML = "<div class='col-sm-12 col-md-4 col-lg-4'>" +
                        `<div class="card" style="width: 18rem;">` +
                        `<img class="card-img-top" src="` + value.imageURL + `" alt="Event image">` +
                        `<div class="card-body">` +
                        `<h5 class="card-title">` + value.eventName + `</h5>` +
                        `<p class="date-p"><span class="date-icon"><i class="fa fa-calendar" aria-hidden="true"></i></span>` + value.eventDate + `</p>` +
                        `<p><span class="tag-icon"><i class="fa fa-tag" aria-hidden="true"></i></span>` + value.eventTags + `</p>` +
                        `<p class="card-text">` + value.eventDesc + `</p>` +
                        `<a href="` + value.eventUrl + `" target="_blank" class="btn btn-primary">Details</a>` +
                        "</div></div></div></div>" + evenPostContainer.innerHTML;
                }
            }
        }

        promptMessage.innerText = 'Done';
        promptMessageContainer.style.display = 'none';

    });
}