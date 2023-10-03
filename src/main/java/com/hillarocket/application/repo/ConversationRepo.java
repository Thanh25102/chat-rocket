package com.hillarocket.application.repo;

import com.hillarocket.application.domain.Conversion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ConversationRepo extends JpaRepository<Conversion, UUID> {
}
