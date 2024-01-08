package com.housing.back.common;

public interface ResponseMessage {
  
  String SUCCESS = "Success";

  String VALIDATION_FAIL = "Validation failed";
  String DUPLICATION_ID = "Duplicate Id";

  String SIGN_IN_FAIL = "Login informaion mismatch";
  String CERTIFICATION_FAIL = "Certification failed";

  String DATABASE_ERROR = "Database error";

}
