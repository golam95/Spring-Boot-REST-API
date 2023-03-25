package com.student.profile.service;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class LoggerService implements HealthIndicator {

	private final String LOGGING_SERVICE = "Logging Service";

	@Override
	public Health health() {
		if (isDatabaseHealthGood()) {
			return Health.up().withDetail(LOGGING_SERVICE, "Service is running").build();
		}
		return Health.down().withDetail(LOGGING_SERVICE, "Service is not available").build();
	}

	private boolean isDatabaseHealthGood() {
		return true;
	}

}
