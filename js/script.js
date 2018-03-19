$(document).ready(function() {
    try {
        userList();
        moreData();
    } catch (error) {
        $('.row').append("<article class='more alert-warning'><h1 class='text-center'>Something went wrong!!</h1></article>");
    }
    
});

function userList (){

    $.ajax({
        type: 'get',
        url: "users.json",
        dataType: 'json',
        beforeSend: function () {
            $('.spinner').show();
        },
        success: function (data) {
            runData (data);
        },
        error: function () {
            $('.row').append("<article class='more alert-warning text-center'><h1 class='text-center'>Something went wrong!!</h1></article>");
        }

    });
  
}

function runData(data) {


        if (typeof id === undefined || typeof name === undefined) {

            $('.spinner').hide(300);
            $('.row').append("<article class='more alert-warning text-center'><h1 class='text-center'>Something went wrong!!</h1></article>");
        }
        else {

            $.each(data, function (key, val) {
                $('.row')
                    .append(`<div class='col-sm-4 item'>
                                    <a data-toggle='modal' data-target='#myModal' class='modal-item' data-id="${val.id}">
                                        <div class='card'>
                                            <div class='card-body'><br/>
                                                <h5 class="card-title"> ${val.name} </h5>
                                                <h6 class="card-subtitle mb-2 text-muted"> ${val.username} </h6>
                                                <h6 class="card-subtitle mb-2"> ${val.email} </h6>
                                                <a href=" ${val.website} "> ${val.website} </a>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                `);
            });

            $('.spinner').hide(300);

        }
}

function moreData() {
   
    $('.row').on('click', '.modal-item', function() {
        var clickedElementId = $(this).data('id');        

        // if (clickedElementId ===)

        $.getJSON("users.json", function (data) {
            var items = [];
            $.each(data, function (key, val) {
                if(clickedElementId === val.id){
                    appendDataToModal(val);
                }
            });
        });
    });

}

function appendDataToModal(data) {

    $('.modal-body').html(`
        <strong>Name:</strong> ${data.name} <br/>
        <strong>Username:</strong> ${data.username} <br/>
        <strong>Email:</strong> ${data.email} <br/>
        <strong>Phone:</strong> ${data.phone} <br/>
        <strong>Website:</strong> ${data.website} <br/></br>
        

        <h5>Address:</h5>
        <strong>Street:</strong> ${data.address.street} <br/>
        <strong>Suite:</strong> ${data.address.suite} <br/>
        <strong>City:</strong> ${data.address.city} <br/>
        <strong>Zipcode:</strong> ${data.address.zipcode} <br/></br>
        
        <h5>Company</h5>
        <strong>Company name:</strong> ${data.company.name} <br/>
        <strong>CatchPhrase:</strong> ${data.company.catchPhrase} <br/>
        <strong>Bs:</strong> ${data.company.bs} <br/></br>

        <h6>Geographic Position</h6>
        <strong>Latitude:</strong> ${data.address.geo.lat} <br/>
        <strong>Longitude:</strong> ${data.address.geo.lng} <br/>
    `);
}