package com.student.profile.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.student.profile.model.Student;
import com.student.profile.service.StudentService;

@RequestMapping("/rest/api/")
@RestController
public class StduentRestFullController {

	@Autowired
	private StudentService studentService;

	@GetMapping("students-rs")
	public List<Student> getLoanDetails() {
		return studentService.listOfStudent();
	}

	@PostMapping("save-rs")
	public ResponseEntity<Student> saveStudent(@RequestBody Student student) {
		return new ResponseEntity<Student>(studentService.saveStudentRest(student), HttpStatus.CREATED);
	}

	@PutMapping("update-rs")
	public ResponseEntity<Student> saveUpdate(@RequestBody Student student) {
		return new ResponseEntity<Student>(studentService.saveStudentRest(student), HttpStatus.OK);
	}

	@PostMapping("delete-rs")
	public ResponseEntity<String> deleteStudent(@RequestParam Long id) {
		studentService.deleteStudentRest(id);
		return new ResponseEntity<String>("Deletedd successfully!", HttpStatus.OK);
	}

	@GetMapping("find-student-rs")
	public ResponseEntity<Student> getStudentById(@RequestParam Long id) {
		return new ResponseEntity<Student>(studentService.getStudentById(id), HttpStatus.OK);
	}

}
