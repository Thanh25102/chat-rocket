package com.hillarocket.application.repo;

import com.hillarocket.application.domain.User;
import dev.hilla.Nonnull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepo extends JpaRepository<User, UUID> , JpaSpecificationExecutor<User> {
    @Query("""
            select u from User u where upper(u.fullName)
            like upper(concat('%',?1,'%')) and upper(u.email) like upper(concat('%',?1,'%'))
            """)
    List<User> findByFullNameOrEmail(String searchKey);


    Optional<User> findByEmail(String email);

    @Query("""
                SELECT u FROM User u INNER JOIN GroupMember g on u.id = g.user.id
                WHERE g.conversation.id = ?1
            """)
    Optional<List<@Nonnull User>> findUserByConversationId(UUID conversationId);
}
