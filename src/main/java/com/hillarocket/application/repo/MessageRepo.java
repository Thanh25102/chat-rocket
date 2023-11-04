package com.hillarocket.application.repo;

import com.hillarocket.application.domain.Message;
import dev.hilla.Nonnull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MessageRepo extends JpaRepository<Message, UUID> {

    @Query("""
                SELECT msg FROM Message msg
                WHERE msg.conversation.id = ?1
                ORDER BY msg.time DESC
                LIMIT 20
            """)
    Optional<List<@Nonnull Message>> find20NewestMessagesByConversationId(UUID conversationId);

}
