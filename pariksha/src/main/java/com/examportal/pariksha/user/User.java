package com.examportal.pariksha.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users",
        uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
})
@Getter @Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @Size(max = 20)
    private String username;

    @NotBlank
    @Email
    @Size(max = 50)
    private String email;

    @NotBlank
    @JsonIgnore
    private String password;

    @NotBlank
    @Size(max = 30)
    private String firstname;

    @NotBlank
    @Size(max = 30)
    private String lastname;

    @NotBlank
    @Size(min = 10, max = 10, message = "Please enter valid mobile number")
    private String mobile;

    @Min(value = 0)
    @Max(value = 1)
    private int gender;

    private String profileUrl;

    private Date createdAt = new Date();

    private Date updatedAt = new Date();

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(  name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();


    public User() {
    }

    public User(String username, String email, String password, String firstName, String lastName, String mobile, int gender) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstname = firstName;
        this.lastname = lastName;
        this.mobile = mobile;
        this.gender = gender;
    }
}
