package com.examportal.pariksha.user;

import com.examportal.pariksha.user.helpers.ERole;
import com.examportal.pariksha.user.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    Optional<Role> findByName(ERole name);
}
