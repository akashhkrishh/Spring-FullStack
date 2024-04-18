package com.example.studentapp.controllers;

import com.example.studentapp.models.Student;
import com.example.studentapp.services.StudentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class StudentController {

    @Autowired
    private StudentServices services;

    @PostMapping("/api/create")
    public String addStudent(@RequestBody Student student){
        services.saveStudent(student);
        return "New Student Added";
    }

    @GetMapping("/api/getAll")
    public List<Student> getAllStudent(){
        return services.getAllStudents();
    }
}
