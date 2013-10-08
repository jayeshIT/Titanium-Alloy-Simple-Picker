var slideIn = Titanium.UI.createAnimation({
	bottom : 0
});
var slideOut = Titanium.UI.createAnimation({
	bottom : -251
}, function(e) {
});
var date = new Date();
var year = parseInt(date.getFullYear());

var rows1 = [];
for (var i = 1970; i <= year; i++) {
	rows1.push(Ti.UI.createPickerRow({
		title : i.toLocaleString(),
		value : i.toLocaleString()
	}));
}
var column1 = Ti.UI.createPickerColumn({
	rows : rows1,
	font : {
		fontSize : "20",
		fonrWeight : "bold"
	}
});

if (Titanium.Platform.osname != 'android') {

	var pickerView2 = Titanium.UI.createView({
		bottom : -251,
		height : 251,
		width : 320,
		backgroundColor : "gray"
	});
	var picker = Ti.UI.createPicker({
		height : 60,
		width : 320,
		top : 40,
		columns : [column1],
	});
	var cancelbtn2 = Ti.UI.createButton({
		style : Ti.UI.iPhone.SystemButtonStyle.BORDERED,
		title : 'Cancel'
	});
	var donebtn2 = Ti.UI.createButton({
		style : Ti.UI.iPhone.SystemButtonStyle.DONE,
		title : 'Done'
	});
	var space2 = Ti.UI.createButton({
		systemButton : Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	var toolbar2 = Ti.UI.iOS.createToolbar({
		top : 0,
		barColor : "#262835",
		items : [cancelbtn2, space2, donebtn2]
	});
	cancelbtn2.addEventListener('click', function() {
		pickerView2.animate(slideOut);
	});
	donebtn2.addEventListener('click', function() {
		pickerView2.animate(slideOut);
		$.text1.value = $.text1.value1;
		$.text1.selectedDate01 = $.text1.selectedValue;
	});

	picker.selectionIndicator = true;
	picker.setSelectedRow(0, 0, false);
	pickerView2.add(toolbar2);
	pickerView2.add(picker);

	$.text1.addEventListener('focus', function(e) {
		$.text1.blur();
		pickerView2.animate(slideIn);
		Titanium.API.info("THE VALUE:" + $.text1.value);
		if ($.text1.value != "" && $.text1.value != '') {
			Titanium.API.info("THE VALUE To ASSIGN TO PICKER:" + $.text1.selectedDate01);
			picker.setSelectedRow(0, $.text1.selectedDate01, false);
		} else {

		}
	});
} else {

	var pickerView2 = Titanium.UI.createView({
		bottom : -251,
		height : 251,
		left : 0,
		right : 0,
		backgroundColor : "gray"
	});

	var picker = Ti.UI.createPicker({
		//height : 180,
		bottom : 0,
		top : 70,
		left : 0,
		right : 0,
		columns : [column1],
	});
	var viewblack = Ti.UI.createView({
		left : 0,
		right : 0,
		top : 0,
		backgroundColor : 'black',
		height : 70,
	});
	var donebtn2 = Ti.UI.createButton({
		right : 10,
		top : 7,
		width : 100,
		height : 60,
		color : "black",
		title : "Done"
	});
	var cancelbtn2 = Ti.UI.createButton({
		left : 10,
		top : 7,
		width : 120,
		height : 60,
		color : "black",
		title : "Cancel"
	});
	viewblack.add(donebtn2);
	viewblack.add(cancelbtn2);
	donebtn2.addEventListener('click', function(e) {
		pickerView2.animate(slideOut);
		$.text1.value = $.text1.value1;
		$.text1.selectedDate01 = $.text1.selectedValue;
	});
	cancelbtn2.addEventListener('click', function(e) {
		pickerView2.animate(slideOut);
	});
	picker.selectionIndicator = true;
	picker.setSelectedRow(0, 0, false);
	pickerView2.add(viewblack);
	pickerView2.add(picker);
	$.text1.addEventListener('click', function(e) {
		pickerView2.animate(slideIn);
		Titanium.API.info("THE VALUE:" + $.text1.value);
		if ($.text1.value != "" && $.text1.value != '') {
			Titanium.API.info("THE VALUE To ASSIGN TO PICKER:" + $.text1.selectedDate01);
			picker.setSelectedRow(0, $.text1.selectedDate01, false);
		} else {

		}
	});
}

picker.addEventListener('change', function(e) {
	if (Ti.Platform.osname != "android") {
		Titanium.API.info("e:" + JSON.stringify(e))
		var mypickerValue = e.selectedValue[0].toString();
		Titanium.API.info("mypickerValue:" + mypickerValue);
		$.text1.value1 = mypickerValue;
		$.text1.selectedValue = e.rowIndex;
		Titanium.API.info("PICKER CHANGE : " + e.rowIndex);
	} else {
		Titanium.API.info('e.source:' + JSON.stringify(e.source));
		Titanium.API.info('row.title' + JSON.stringify(e.row.title));
		Titanium.API.info("THE INDEX:" + (parseInt(e.row.title) - 1970));
		var cust_index = parseInt((parseInt(e.row.title) - 1970));
		var mypickerValue = parseInt(e.row.title);
		$.text1.value1 = mypickerValue;
		$.text1.selectedValue = parseInt(cust_index);
		Titanium.API.info("PICKER CHANGE " + $.text1.value1);
		Titanium.API.info("cust_index  is : " + (cust_index));
	}
});
$.index.add(pickerView2);
$.index.open();
