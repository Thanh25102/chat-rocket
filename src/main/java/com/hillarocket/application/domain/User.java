package com.hillarocket.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.Persistable;

import java.io.Serializable;
import java.util.Set;
import java.util.UUID;


@Table(name = "users")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(value = {"newUser", "password"})
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User implements  Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    @Column(name = "fullname")
    String fullName;
    String email;
    @JsonIgnore
    String password;

    @OneToMany(mappedBy = "user")
    Set<GroupMember> groupMembers;

    @Enumerated(EnumType.STRING)
    Role role;

}