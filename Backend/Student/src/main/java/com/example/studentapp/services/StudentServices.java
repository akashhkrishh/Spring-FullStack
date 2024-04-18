package com.example.studentapp.services;

import com.example.studentapp.models.Student;

import java.util.List;

public interface StudentServices {
    public void saveStudent(Student student);
    public List<Student> getAllStudents();
}
