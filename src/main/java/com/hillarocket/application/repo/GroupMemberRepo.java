package com.hillarocket.application.repo;

import com.hillarocket.application.domain.GroupMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupMemberRepo extends JpaRepository<GroupMember, GroupMember.GroupMemberKey> {
}
