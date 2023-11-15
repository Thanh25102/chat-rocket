package com.hillarocket.application.dto;

import java.io.Serializable;

public record CreateSingleConversion(String user1Id, String user2Id)  implements Serializable {
}
