package com.hillarocket.application.repo;

import com.hillarocket.application.domain.GroupMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupMemberRepo extends JpaRepository<GroupMember, GroupMember.GroupMemberKey> {

}
