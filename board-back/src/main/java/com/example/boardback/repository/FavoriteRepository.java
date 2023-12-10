package com.example.boardback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.boardback.entity.FavoriteEntity;
import com.example.boardback.entity.primaryKey.FavoritePk;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, FavoritePk> {
  
  FavoriteEntity findByBoardNumberAndUserEmail(Integer boardNumber, String userEmail);

}
