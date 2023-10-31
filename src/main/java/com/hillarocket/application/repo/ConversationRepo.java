package com.hillarocket.application.repo;

import com.hillarocket.application.domain.Conversion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ConversationRepo extends JpaRepository<Conversion, UUID> {

    @Query("""
        SELECT c
        FROM Conversion c
        JOIN GroupMember gm ON c.id = gm.conversion.id
        WHERE gm.user.id IN (?1,?2) and c.type = 'SINGLE'
        GROUP BY c.id
        HAVING COUNT(DISTINCT gm.user.id) = 2
    """)
    Optional<Conversion> getSingleConversionByUserId(UUID u1, UUID u2);

}
