package com.student.profile.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

	@GetMapping("/")
	public String studentListFrm() {
		return "student-list";
	}

	@GetMapping("/dashboard")
	public String studentDashboard() {
		return "dashboard";
	}

	@GetMapping("/graph")
	public String grapView() {
		return "graphView";
	}

	@GetMapping("/history")
	public String historyView() {
		return "history";
	}

}
