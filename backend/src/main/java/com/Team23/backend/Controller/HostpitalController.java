package com.Team23.backend.Controller;

import com.Team23.backend.Repository.*;
import com.Team23.backend.Entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class HostpitalController {
    @Autowired
    private final HostpitalRepository hostpitalRepository;

    public HostpitalController(HostpitalRepository hostpitalRepository) {
        this.hostpitalRepository = hostpitalRepository;
    }

    @GetMapping("/Hostpital")
    public Collection<Hostpital> Hostpital() {
        return hostpitalRepository.findAll().stream().collect(Collectors.toList());
    }

}
