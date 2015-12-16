var myarray = new Array();
var text;
var data;
document.addEventListener("DOMContentLoaded", function () {
	$("#add").on('click', addListItem);
	$(document).on('click', '.delete', deleteItem);

	showAllItem();
});

function checkForExistingItems() {
	var exdos = [];
	var mestr = localStorage.getItem('grocery-kaur0183');
	if (mestr !== null) {
		exdos = JSON.parse(mestr);
	}
	return exdos;
}

function addListItem() {

	text = $("#new-text").val();
	data = {
		checksts: false,
		txtval: text
	};
	myarray.push(data);
	localStorage.setItem('grocery-kaur0183', JSON.stringify(myarray));
	console.log(JSON.stringify(myarray));
	$("#new-text").val('');
	showAllItem();
	return false;
}

function showAllItem() {
	myarray = new Array();
	myarray = checkForExistingItems();
	if (myarray.length > 0) {
		$("#todolist").empty();
		$("#todolist").listview("refresh");
		myarray = JSON.parse(localStorage.getItem('grocery-kaur0183'));
		for (var i = 0; i < myarray.length; i++) {

			if (myarray[i].checksts) {
				$("#todolist").append('<li><input type="checkbox" checked = "checked" class="done" onclick="getItemsOfListview()" /><a id="a' + i + '">' + myarray[i].txtval + '</a><button class="delete" id="' + i + '">Delete</button></li>');

			} else {
				$("#todolist").append('<li><input type="checkbox" class="done" onclick="getItemsOfListview()" id="' + "in" + i + '"/><a id="a' + i + '">' + myarray[i].txtval + '</a><button class="delete" id="' + i + '">Delete</button></li>');
			}
		}
		var check = document.getElementsByName('checkbox');
		for (var i = 0; i < check.length; i++) {
			check[i].addEventListener('change', function () {
				if ($(this).is(":checked")) {
					$(this).next().attr('style', 'text-decoration:line-through !important; color:grey;');
				} else {
					$(this).next().removeAttr('style');
				}
			});
		};
		$("#todolist").listview("refresh");
	}
}

function deleteItem() {
	$(this).parent().remove();
	var id = this.getAttribute('id');
	console.log(id);
	var allList = checkForExistingItems();
	allList.splice(id, 1);
	localStorage.setItem('grocery-kaur0183', JSON.stringify(allList));
	showAllItem();
}



function getItemsOfListview() {
	var ListData = [];
	var ListItem = $('#todolist li');
	$.each(ListItem, function (index, element) {

		var isCheck = $(this).find('[type="checkbox"]').is(':checked');
		var text = $(this).find('[id="a' + index + '"]').text();
		console.log($(this));
		var data = {
			checksts: isCheck,
			txtval: text
		};
		ListData.push(data);
	});
	localStorage.setItem('grocery-kaur0183', JSON.stringify(ListData));
	return ListData;
}