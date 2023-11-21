package com.hillarocket.application.repo;

import com.hillarocket.application.domain.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.annotation.Nonnull;
import java.util.List;
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

    @Nonnull
    @Query("select c from Conversation c")
    List<Conversation> findAll();

    @Query("""
                SELECT c
                FROM Conversation c
                JOIN GroupMember gm ON c.id = gm.conversation.id
                WHERE gm.user.id = ?1 ORDER BY c.createDate ASC
            """)
    List<Conversation> findConversationByUserId(UUID u1);

    @Query("select c from Conversation c where c.id = ?1")
    Optional<Conversation> getConversationById(UUID id);

}
