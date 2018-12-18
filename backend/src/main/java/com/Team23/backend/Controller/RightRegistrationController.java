package com.Team23.backend.Controller;

import com.Team23.backend.Repository.*;
import com.Team23.backend.Entity.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParseException;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.stream.Collectors;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.*;
import java.util.stream.Collectors;
import java.time.format.DateTimeFormatter;
import java.time.*;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class RightRegistrationController {
    @Autowired private final RightRegistrationRepository rightRegistrationRepository;
    @Autowired private HostpitalRepository hostpitalRepository;
    @Autowired private  RightsTypeRepository rightsTypeRepository;
    @Autowired private  ProvinceRepository provinceRepository;

    public RightRegistrationController(RightRegistrationRepository rightRegistrationRepository,HostpitalRepository hostpitalRepository,RightsTypeRepository rightsTypeRepository) {
        this.rightRegistrationRepository = rightRegistrationRepository;
        this.hostpitalRepository = hostpitalRepository;
        this.rightsTypeRepository = rightsTypeRepository;
        this.provinceRepository = provinceRepository;

    }

    @GetMapping("/Rightregistration")
    public Collection<RightRegistration> RightRegistration() {
        return rightRegistrationRepository.findAll().stream().collect(Collectors.toList());
    }

    @PostMapping("/Rightregistration/{username}/{password}/{firstname}/{surname}/{tel}/{personal}/{dateregis}/{birthdate}/{provincename}/{rightstypename}/{hostpitalname}")
    public RightRegistration newnameMember(@PathVariable String username,@PathVariable String password, @PathVariable String firstname,@PathVariable String surname,@PathVariable String tel,
                                @PathVariable Long personal,@PathVariable String dateregis,@PathVariable String birthdate,
                                @PathVariable String provincename,@PathVariable String rightstypename,@PathVariable String hostpitalname
    ){

        RightRegistration newMember = new RightRegistration();
        Hostpital hostpitalid = new Hostpital();
        RightsType rightsTypeid = new RightsType();
        Province provinceid  = new Province();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd:MM:yyyy");
        LocalDate gdate = LocalDate.parse(dateregis,formatter);
        LocalDate bdate = LocalDate.parse(birthdate,formatter);

        newMember.setUsername(username);
        newMember.setPassword(password);
        newMember.setFirstname(firstname);
        newMember.setSurname(surname);
        newMember.setTel(tel);
        newMember.setPersonalcard(personal);
        newMember.setDateregis(gdate);
        newMember.setBirthday(bdate);

        provinceid = provinceRepository.findByProvinceName(provincename);
        newMember.setProvince(provinceid);

        rightsTypeid = rightsTypeRepository.findByRightsTypeName(rightstypename);
        newMember.setRightsType(rightsTypeid);

        hostpitalid = hostpitalRepository.findByHostpitalName(hostpitalname);
        newMember.setHostpital(hostpitalid);

        return rightRegistrationRepository.save(newMember);
    }


}
