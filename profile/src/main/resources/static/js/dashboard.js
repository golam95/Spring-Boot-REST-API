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

				$('#200Id').text(total_200);
				$('#400Id').text(total_400);
				$('#404Id').text(total_404);
				$('#500Id').text(total_500);
				//alert('others= '+total_Others);
			}
		});

	}




$('#refreshId').click(function() {
    location.reload();
});




});