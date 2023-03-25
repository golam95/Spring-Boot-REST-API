$(document).ready(function() {

	getHealthInfo();

	function getHealthInfo() {
		$.ajax({
			type: "GET",
			url: "/actuator/health",
			success: function(data) {
				$(data.components).each(function(index, value) {
					$(value.db).each(function(index1, value1) {
						$(value1.details).each(function(index2, value2) {
							$('#sysId').text(data.status);
							$('#dbId').text(value2.database + ' ' + value1.status);
						});
					});

					$(value.diskSpace).each(function(index3, value3) {
						$(value3.details).each(function(index4, value4) {
							$('#diskSpaceId').text(value4.free);
						});
					});
				});
			}
		});
	}

	getRamInfo();

	function getRamInfo() {
		$.ajax({
			type: "GET",
			url: "/actuator/metrics/system.cpu.count",
			success: function(data) {
				$(data.measurements).each(function(index, value) {
					$('#diskProcessorId').text(value.value);
				});
			}
		});
	}

	getUpTimeInfo();

	function getUpTimeInfo() {
		$.ajax({
			type: "GET",
			url: "/actuator/metrics/process.uptime",
			success: function(data) {
				$(data.measurements).each(function(index, value) {
					$('#uptimeId').text(value.value);
				});
			}
		});
	}

	getTraceInfo();

	function getTraceInfo() {

		$.ajax({
			type: "GET",
			url: "/actuator/httptrace",
			success: function(data) {

				var total_200 = 0;
				var total_400 = 0;
				var total_404 = 0;
				var total_500 = 0;
				var total_Others = 0;



				var emp_spouse_table = $('#historyTBL');
				$('#historyTBL tbody').empty();

				var tableBody = "";


				$(data.traces).each(function(index, value) {

					var currentTime = '';
					var methodType = '';
					var timeTaken = '';
					var url = '';
					var status = '';

					$(value.response).each(function(index1, value1) {
						$(value.request).each(function(index2, value2) {
							url = value2.uri;
							methodType = value2.method;
							timeTaken = value.timeTaken;
							status = value1.status;
							currentTime = value.timestamp;
						});

					});

					var action =
						'<button class="btn btn-sm btn-success" value="Edit"> ' +
						'<span class="glyphicon glyphicon-pencil"></span></button> ';
					var deleteAction =
						'<button class="btn btn-sm btn-danger " value="Delete"> ' +
						'<span class="glyphicon glyphicon-trash"></span></button> ';

					tableBody += "<tr>";
					tableBody += "<td>" + currentTime + "</td>";
					tableBody += "<td>" + methodType + "</td>";
					tableBody += "<td>" + timeTaken + "</td>";
					tableBody += "<td>" + status + "</td>";
					tableBody += "<td>" + url + "</td>";
					tableBody += "<td style='text-align:center;'>" + action + '' + deleteAction + "</td>";
					tableBody += "</tr>";

				});
				emp_spouse_table.append(tableBody);
				emp_spouse_table.dataTable();
			}
		});

	}




	$('#refreshId').click(function() {
		location.reload();
	});




});