package com.student.profile.service;

import java.util.List;
import java.util.Optional;

import com.student.profile.help.ResponseEntity;
import com.student.profile.model.Student;


public interface StudentService {
	
	ResponseEntity saveStudent(Student student);
	
	List<Student> listOfStudent();
	
	ResponseEntity deleteStudent(Long id);
	
	Student saveStudentRest(Student student);
	
	void deleteStudentRest(Long id);
	
	Student getStudentById(long id);

}
