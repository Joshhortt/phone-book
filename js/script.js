//  Business logic (back-end)-----

// Start by building a simple Contact constructor
function Contact(first, last) {
    this.firstName = first;
    this.lastName = last;
    this.addresses = [];
}

// We can define a new Contact prototype function
Contact.prototype.fullName = function () {
    return this.firstName + " " + this.lastName;
}

// Start by building a simple Address constructor
function Address(address) {
    this.address = address;
}

// We can define a new Address prototype function
Address.prototype.fullAddress = function () { // prototype
    return this.address;
}

function resetFields() {
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input.full-address").val("");
}

// User Interface logic (front-end)-----
$(document).ready(function () {

    $("#add-address").click(function () {
        $("#new-addresses").append('<div class="new-address">' +
            '<div class="form-group">' +
            '<label for="full-street">Another Address</label>' +
            '<input type="text" class="form-control full-address">' +
            '</div>' +
            '</div>');
    });

    $("form#new-contact").submit(function (event) {
        event.preventDefault();

        var inputtedFirstName = $("input#new-first-name").val();
        var inputtedLastName = $("input#new-last-name").val();
        var newContact = new Contact(inputtedFirstName, inputtedLastName); 

        $(".new-address").each(function () {
            var inputtedAddress = $(this).find("input.full-address").val();
            var newAddress = new Address(inputtedAddress)
            newContact.addresses.push(newAddress)
        });

        $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

        $(".contact").last().click(function () {
            $("#show-contact").show();
            $("#show-contact h2").text(newContact.fullName());
            $(".first-name").text(newContact.firstName);
            $(".last-name").text(newContact.lastName);
            $("ul#addresses").text("");
            newContact.addresses.forEach(function (address) {
                $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
            });
        });

        resetFields();

    });
});
