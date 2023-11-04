package com.hillarocket.application.repo;

import com.hillarocket.application.domain.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ConversationRepo extends JpaRepository<Conversation, UUID> {

    @Query("""
        SELECT c
        FROM Conversation c
        JOIN GroupMember gm ON c.id = gm.conversation.id
        WHERE gm.user.id IN (?1,?2) and c.type = 'SINGLE'
        GROUP BY c.id
        HAVING COUNT(DISTINCT gm.user.id) = 2
    """)
    Optional<Conversation> getSingleConversionByUserId(UUID u1, UUID u2);

}
