package com.Team23.backend.Controller;

import com.Team23.backend.Repository.*;
import com.Team23.backend.Entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class RightRegistrationController {
    @Autowired
    private final RightRegistrationRepository rightRegistrationRepository;

    public RightRegistrationController(RightRegistrationRepository rightRegistrationRepository) {
        this.rightRegistrationRepository = rightRegistrationRepository;
    }

    @GetMapping("/RightRegistration.java")
    public Collection<RightRegistration> RightRegistration() {
        return rightRegistrationRepository.findAll().stream().collect(Collectors.toList());
    }

}
