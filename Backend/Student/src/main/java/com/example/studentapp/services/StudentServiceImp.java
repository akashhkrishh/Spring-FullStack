package com.example.studentapp.services;

import com.example.studentapp.models.Student;
import com.example.studentapp.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImp implements StudentServices {

    @Autowired
    private StudentRepo studentRepo;

    @Override
    public void saveStudent(Student student) {
        studentRepo.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }
}
