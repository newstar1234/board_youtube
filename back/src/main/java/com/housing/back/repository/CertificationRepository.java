package com.housing.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.housing.back.entity.CertificationEntity;


public interface CertificationRepository extends JpaRepository<CertificationEntity, String> {
  
  CertificationEntity findByUserId(String userId);

}
