$(document).ready(function() {



	function loadPieChart(v1, v2, v3, v4) {

		var options = {
			title: {
				text: ""
			},
			data: [{
				type: "pie",
				startAngle: 45,
				showInLegend: "true",
				legendText: "{label}",
				indexLabel: "{label} ({y})",
				yValueFormatString: "#,##0.#" % "",
				dataPoints: [
					{ label: "200", y: v1 },
					{ label: "400", y: v2 },
					{ label: "404", y: v3 },
					{ label: "500", y: v4 }

				]
			}]
		};
		$("#paieChart").CanvasJSChart(options);
	}



	function loadBarChart(v1, v2, v3, v4) {

		var options = {
			title: {
				text: ""
			},
			data: [
				{
					// Change type to "doughnut", "line", "splineArea", etc.
					type: "column",
					dataPoints: [
						{ label: "200", y: v1 },
						{ label: "400", y: v2 },
						{ label: "404", y: v3 },
						{ label: "500", y: v4 }

					]
				}
			]
		};

		$("#barChart").CanvasJSChart(options);
	}













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

							if (value1.status == '200') {

								total_200 = total_200 + 1;

							} else if (value1.status == '400') {

								total_400 = total_400 + 1;

							} else if (value1.status == '404') {

								total_404 = total_404 + 1;

							} else if (value1.status == '500') {

								total_500 = total_500 + 1;

							} else {

								total_Others = total_Others + 1;

							}

						});
					});
				});
				loadPieChart(total_200, total_400, total_404, total_500);
				loadBarChart(total_200, total_400, total_404, total_500);

			}
		});

	}


	$('#refreshId').click(function() {
		location.reload();
	});



});