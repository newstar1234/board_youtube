package com.example.boardback.repository;

import java.util.List;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.boardback.entity.ImageEntity;

@Repository
public interface ImageRepository extends JpaRepository<ImageEntity, Integer> {
  
  List<ImageEntity> findByBoardNumber(Integer boardNumber);

  @Transactional
  void deleteByBoardNumber (Integer boardNumber);

}
